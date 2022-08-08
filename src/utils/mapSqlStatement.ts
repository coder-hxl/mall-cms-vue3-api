interface IAnyObj {
  [key: string]: any
}

const mapSqlStatement = {
  create<T = IAnyObj>(createInfo: T) {
    const inserts = []
    const placeholders = []
    const values = Object.values(createInfo)

    for (const key in createInfo) {
      inserts.push(key)
      placeholders.push('?')
    }

    return { inserts, placeholders, values }
  },
  update<T = IAnyObj>(updateInfo: T) {
    const updates = []
    const values = Object.values(updateInfo)

    for (const key in updateInfo) {
      updates.push(`${key} = ?`)
    }

    return { updates, values }
  },
  like<T = IAnyObj>(likeInfo: T, tablesName: string) {
    const likes: string[] = []
    let isFirst = true

    function addLikes(sqlStr: string) {
      // 确保添加 AND 关键字的时机
      if (isFirst) {
        likes.push(sqlStr)
        isFirst = false
      } else {
        likes.push(`AND ${sqlStr}`)
      }
    }

    for (const key in likeInfo) {
      const TKey = `${tablesName}.${key}`
      const value: any = likeInfo[key]

      if (!value && value !== 0) {
        // 值为 0 不能跳过
        continue
      }

      if (key === 'createAt' || key === 'updateAt') {
        const sqlTime = `${TKey} >= '${value[0]}' AND ${TKey} <= '${value[1]}'`
        addLikes(sqlTime)
      } else if (key !== 'offset' && key !== 'size') {
        const sqlLike = `${TKey} LIKE '%${value}%'`
        addLikes(sqlLike)
      }
    }

    return likes
  }
}

export default mapSqlStatement
