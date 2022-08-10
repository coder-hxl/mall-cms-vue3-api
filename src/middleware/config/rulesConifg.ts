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
      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,30}$/,
      message: '账号的长度必须在1~30中~'
    }
  ],
  realname: [
    {
      required: true,
      message: '真实姓名是必填内容~'
    },
    {
      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,20}$/,
      message: '真实姓名的长度必须在1~20中~'
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
      message: '必须以数字开头, 除数字外, 可含有“-”'
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

const department: IRules = {
  name: [
    {
      required: true,
      message: '名字是必填内容~'
    },
    {
      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,20}$/,
      message: '名字的长度必须在1~20中~'
    }
  ]
}

const menu: IRules = {
  name: [
    {
      required: true,
      message: '名字是必填内容~'
    },
    {
      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,6}$/,
      message: '名字的长度必须在1~6中~'
    }
  ],
  type: [
    {
      required: true,
      message: '类型是必填内容~'
    },
    {
      pattern: /^[1|2|3]{1}$/,
      message: '类型只能是1, 2, 3其中一个~'
    }
  ]
}

const role: IRules = {
  name: [
    {
      required: true,
      message: '名字是必填内容~'
    },
    {
      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,20}$/,
      message: '名字的长度必须在1~20中~'
    }
  ]
}

// ------------------------------------------------------------------------

const loginRules: IRules = {
  name: [
    {
      required: true,
      message: '账号是必填内容~'
    },
    {
      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,30}$/,
      message: '账号的长度必须在1~30中~'
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
  ]
}

const createRules: IStore = {
  users,
  department,
  menu,
  role
}

const updateRules: IStore = {
  users: {
    ...users,
    password: {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或者数字~'
    }
  },
  department,
  menu,
  role
}

export { loginRules, createRules, updateRules }
export type { IRules, IRulesItem }
