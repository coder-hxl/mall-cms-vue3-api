import { queryFns, queryKeys } from './config/verifyConfig'

import type {
  ITableRules,
  IRulesItem,
  rulesTableName
} from '@/middleware/config/rulesConifg'

interface IHasCUPremiseResult {
  isHas: boolean
  key?: string
  value?: any
}

const regexRulesInfo = (rules: ITableRules, infos: any) => {
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

const hasCUPremise = async (
  table: rulesTableName,
  info: any,
  type: 'default' | 'update' = 'default'
) => {
  const result: IHasCUPremiseResult = {
    isHas: true
  }

  function changeResult(queryResult: any, key: string) {
    result.isHas = false
    result.key = key
    result.value = queryResult
    return result
  }

  const queryFn = queryFns[table]
  const queryKey = queryKeys[table]

  if (queryFn && queryKey) {
    for (const key of queryKey) {
      const queryResultArr = await queryFn(key, info[key] ?? '')
      const queryResult: any = queryResultArr[0]

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
  }

  return result
}

export { regexRulesInfo, hasCUPremise }
