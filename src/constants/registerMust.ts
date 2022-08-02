interface IRegisterMust {
  users: string[]
  department: string[]
  [key: string]: string[]
}

const registerMust: IRegisterMust = {
  users: [
    'name',
    'realname',
    'password',
    'cellphone',
    'enable',
    'departmentId',
    'roleId'
  ],
  department: ['name', 'leader']
}

export default registerMust
