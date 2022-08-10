import { queryFns, queryKeys } from './config/verifyConfig'

import type { IRules, IRulesItem } from '@/middleware/config/rulesConifg'

interface ITableExistValueResult {
  isChange: boolean
  key?: string
  value?: any
}

const regexRulesInfo = (rules: IRules, infos: any) => {
  const result = {
    isSucceed: true,
    message: '成功~'
  }

  function verify(rule: IRulesItem, value: any) {
    if (rule.required && !value && value !== 0 && value !== null) {
      return false
    }

    if (rule.pattern) {
      const regex = new RegExp(rule.pattern)
      if (!regex.test(value)) {
        return false
      }
    }

    return true
  }

  for (const key in rules) {
    const rule = rules[key]
    const value = infos[key]

    if (Array.isArray(rule)) {
      for (const ruleItem of rule) {
        if (!verify(ruleItem, value)) {
          result.isSucceed = false
          result.message = ruleItem.message ?? '失败~'
          return result
        }
      }
    } else {
      if (!verify(rule, value)) {
        result.isSucceed = false
        result.message = rule.message ?? '失败~'
        return result
      }
    }
  }

  return result
}

const verifyChangeTable = async (
  table: string,
  info: any,
  type: 'default' | 'update' = 'default'
) => {
  const result: ITableExistValueResult = {
    isChange: false
  }

  const queryFn = queryFns[table]
  const queryKey = queryKeys[table]

  function changeResult(queryResult: any, key: string) {
    result.isChange = true
    result.key = key
    result.value = queryResult
    return result
  }

  for (const key of queryKey) {
    const queryResultArr = await queryFn(key, info[key] ?? '')
    const queryResult = queryResultArr[0]

    if (type === 'default') {
      if (queryResult) {
        return changeResult(queryResult, key)
      }
    } else {
      if (queryResult && queryResult[key] !== info[key]) {
        return changeResult(queryResult, key)
      }
    }
  }

  return result
}

export { regexRulesInfo, verifyChangeTable }
