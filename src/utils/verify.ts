import type { IRules, IRulesItem } from '@/constants/rules'

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

export { regexRulesInfo }
