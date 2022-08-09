interface IRegisterMust {
  users: string[]
  department: string[]
  menu: string[]
  role: string[]
  [key: string]: string[]
}

interface IRules {
  [key: string]: {
    required?: boolean
    pattern?: RegExp
    requiredMessage?: string
    patternMessage?: string
  }
}

interface IRuleObj {
  [key: string]: IRules
}

const users: IRules = {
  name: {
    required: true,
    pattern: /^[a-z0-9]{2,20}$/,
    requiredMessage: '账号是必填内容~',
    patternMessage: '用户名必须是2~20个字母或者数字~'
  },
  realname: {
    required: true,
    pattern: /^[a-z0-9]{1,60}$/,
    requiredMessage: '真实姓名是必填内容~',
    patternMessage: '真实姓名必须是1~60个字母或者数字~'
  },
  password: {
    pattern: /^[a-z0-9]{3,}$/,
    patternMessage: '密码必须是3位以上的字母或者数字~'
  },
  cellphone: {
    required: true,
    pattern: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,
    requiredMessage: '手机号是必填内容~',
    patternMessage: '校验手机号码: 必须以数字开头, 除数字外, 可含有“-”'
  },
  enable: {
    required: true,
    pattern: /^0|1$/,
    requiredMessage: '状态是必填内容~',
    patternMessage: '状态错误~'
  }
}

const registerRules: IRegisterMust = {
  users: ['name', 'realname', 'password', 'cellphone', 'enable'],
  department: ['name'],
  menu: ['name', 'type'],
  role: ['name']
}

const updateRules: IRuleObj = {
  users
}

export { registerRules, updateRules }
export type { IRules }
