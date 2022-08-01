interface INewObj {
  [key: string]: string
}

const toString = (target: any) => {
  const newObj: INewObj = {}

  for (const key in target) {
    const value = target[key]
    newObj[key] = value.toString()
  }

  return newObj
}

export { toString }
