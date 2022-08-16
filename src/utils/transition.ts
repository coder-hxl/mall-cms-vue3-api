interface IInfoObj {
  [key: string]: any
}

interface IRetainObj {
  [key: string]: any
}

interface IAbandonObj {
  [key: string]: any
}

const toString = (value: any) => {
  return value || value === 0 ? value.toString() : value
}

const splitObj = (
  info: IInfoObj,
  abandonKey: string[]
): [IRetainObj, IAbandonObj] => {
  const retain: IRetainObj = {}
  const abandon: IAbandonObj = {}

  for (const key in info) {
    if (abandonKey.includes(key)) {
      abandon[key] = info[key]
    } else {
      retain[key] = info[key]
    }
  }

  return [retain, abandon]
}

export { toString, splitObj }
