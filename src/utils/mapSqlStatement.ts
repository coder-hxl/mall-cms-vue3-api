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
    const likes = []
    let isFirst = true

    for (const key in likeInfo) {
      if (key !== 'offset' && key !== 'size') {
        const value = likeInfo[key]
        // 第一次无需加 AND 关键字, 后面要加
        if (isFirst) {
          likes.push(`${tablesName}.${key} LIKE '%${value}%'`)
          isFirst = false
        } else {
          likes.push(`AND ${tablesName}.${key} LIKE '%${value}%'`)
        }
      }
    }

    return likes
  }
}

export default mapSqlStatement
