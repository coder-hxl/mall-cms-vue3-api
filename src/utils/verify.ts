const verifyMustInfo = (mustArr: string[], info: any) => {
  let isAllExist = true

  mustArr.forEach((item) => {
    const value = info[item]
    if (!value && value !== 0 && value !== null) {
      isAllExist = false
    }
  })

  return isAllExist
}

export { verifyMustInfo }
