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

const getRegisterMustInfo = (pathname: string) => {
  const name = pathname.replace('/', '')
  return registerMust[name]
}

export default getRegisterMustInfo
