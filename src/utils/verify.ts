import type { IRules } from '@/constants/rules'

const regexRulesInfo = (rules: IRules, infos: any) => {
  const result = {
    isSucceed: true,
    message: '成功~'
  }

  for (const key in rules) {
    const rule = rules[key]
    const value = infos[key]

    if (rule.required && !value && value !== 0 && value !== null) {
      result.isSucceed = false
      result.message = rule.requiredMessage ?? '失败~'
      return result
    }

    if (rule.pattern) {
      const regex = new RegExp(rule.pattern)
      if (!regex.test(value)) {
        result.isSucceed = false
        result.message = rule.patternMessage ?? '失败~'
        return result
      }
    }
  }

  return result
}

export { regexRulesInfo }
