interface IRulesItem {
  required?: boolean
  pattern?: RegExp
  message?: string
}

interface IRules {
  [key: string]: IRulesItem | IRulesItem[]
}

interface IStore {
  users: IRules
  [key: string]: IRules
}

const users: IRules = {
  name: [
    {
      required: true,
      message: '账号是必填内容~'
    },
    {
      pattern: /^[a-z0-9]{2,20}$/,
      message: '用户名必须是2~20个字母或者数字~'
    }
  ],
  realname: [
    {
      required: true,
      message: '真实姓名是必填内容~'
    },
    {
      pattern: /^[a-z0-9]{1,60}$/,
      message: '真实姓名必须是1~60个字母或者数字~'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必填内容~'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或者数字~'
    }
  ],
  cellphone: [
    {
      required: true,
      message: '手机号是必填内容~'
    },
    {
      pattern: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,
      message: '校验手机号码: 必须以数字开头, 除数字外, 可含有“-”'
    }
  ],
  enable: [
    {
      required: true,
      message: '状态是必填内容~'
    },
    {
      pattern: /^0|1$/,
      message: '状态错误~'
    }
  ]
}

// const registerRules: IRegisterMust = {
//   users: ['name', 'realname', 'password', 'cellphone', 'enable'],
//   department: ['name'],
//   menu: ['name', 'type'],
//   role: ['name']
// }

const createRules: IStore = {
  users
}

const updateRules: IStore = {
  users: {
    ...users,
    password: {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或者数字~'
    }
  }
}

export { createRules, updateRules }
export type { IRules, IRulesItem }
