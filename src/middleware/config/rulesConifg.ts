interface IRulesItem {
  required?: boolean
  pattern?: RegExp
  message?: string
}

interface ITableRules {
  [key: string]: IRulesItem | IRulesItem[]
}

interface IStore {
  users: ITableRules
  department: ITableRules
  menu: ITableRules
  role: ITableRules
  category: ITableRules
  goods: ITableRules
  moment: ITableRules
}

type rulesTableName = keyof IStore

const users: ITableRules = {
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

const department: ITableRules = {
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

const menu: ITableRules = {
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

const role: ITableRules = {
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

const category: ITableRules = {
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

const goods: ITableRules = {
  name: [
    {
      required: true,
      message: '名字是必填内容~'
    },
    {
      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9+]{1,100}$/,
      message: '名字的长度必须在1~100中~'
    }
  ],
  newPrice: [
    {
      required: true,
      message: '现价格是必填内容~'
    },
    {
      pattern: /^[0-9]{1,}$/,
      message: '价格只能是数字~'
    }
  ],
  description: [
    {
      required: true,
      message: '描述是必填内容~'
    },
    {
      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9+]{1,255}$/,
      message: '描述的长度必须在1~255中~'
    }
  ],
  enable: [
    {
      required: true,
      message: '状态是必填内容~'
    },
    {
      pattern: /^0|1$/,
      message: '请检查状态是否正确填写~'
    }
  ],
  imgUrl: [
    {
      required: true,
      message: '图片路径是必填内容~'
    },
    {
      pattern:
        /^(http|https):\/\/[\w\-_\u4E00-\u9FA5:/]+(\.[\w\-_\u4E00-\u9FA5]+)+([\u4E00-\u9FA5\w\-.,@?^=%&:/~+#]*[\u4E00-\u9FA5\w\-@?^=%&/~+#])?$/,
      message: '描述的长度必须在1~255中~'
    }
  ],
  inventoryCount: [
    {
      required: true,
      message: '库存是必填内容~'
    },
    {
      pattern: /^[0-9]{1,}$/,
      message: '库存必须是数字~'
    }
  ],
  saleCount: [
    {
      required: true,
      message: '出售是必填内容~'
    },
    {
      pattern: /^[0-9]{1,}$/,
      message: '出售必须是数字~'
    }
  ],
  favorCount: [
    {
      required: true,
      message: '收藏是必填内容~'
    },
    {
      pattern: /^[0-9]{1,}$/,
      message: '收藏必须是数字~'
    }
  ],
  address: [
    {
      required: true,
      message: '地址是必填内容~'
    },
    {
      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,255}$/,
      message: '地址的长度必须在1~255中~'
    }
  ]
}

const moment: ITableRules = {
  title: {
    required: true,
    message: '内容是必填内容~'
  },
  contentHtml: {
    required: true,
    message: '内容是必填内容~'
  },
  contentText: {
    required: true,
    message: '内容是必填内容~'
  }
}

// ------------------------------------------------------------------------

const loginRules: ITableRules = { name: users.name, password: users.password }

const createRules: IStore = {
  users,
  department,
  menu,
  role,
  category,
  goods,
  moment
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
  role,
  category,
  goods,
  moment
}

export { loginRules, createRules, updateRules }
export type { ITableRules, IRulesItem, rulesTableName }
