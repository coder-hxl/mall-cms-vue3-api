const isMustValueExist = (mustArr: string[], value: any) => {
  let isAllExist = true

  mustArr.forEach((item) => {
    if (!value[item]) {
      isAllExist = false
    }
  })

  return isAllExist
}

export { isMustValueExist }
