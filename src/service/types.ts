interface ITableCommon {
  id?: number
  name?: string
  createAt?: string
  updateAt?: string
}

interface IUser extends ITableCommon {
  id?: number
  realname?: string
  password?: string
  cellphone?: number
  enable?: number
  departmentId?: number
  roleId?: number
}

interface IDepartment extends ITableCommon {
  id?: number
  parentId?: number
  leader?: string
}

export { ITableCommon, IUser, IDepartment }
