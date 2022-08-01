interface ITestObj {
  [key: string]: any
}

const objMustValNotNull = (
  mustKeyArr: string[],
  testObj: ITestObj
): boolean => {
  let isAllExist = true

  mustKeyArr.forEach((item) => {
    if (!testObj[item]) {
      isAllExist = false
    }
  })

  return isAllExist
}

export { objMustValNotNull }
