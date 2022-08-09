interface IRegisterMust {
  users: string[]
  department: string[]
  menu: string[]
  role: string[]
  [key: string]: string[]
}

const registerMust: IRegisterMust = {
  users: ['name', 'realname', 'password', 'cellphone', 'enable'],
  department: ['name'],
  menu: ['name', 'type'],
  role: ['name']
}

const updateMust: IRegisterMust = {
  users: ['name', 'realname', 'cellphone', 'enable'],
  department: ['name'],
  menu: ['name', 'type'],
  role: ['name']
}

export { registerMust, updateMust }
