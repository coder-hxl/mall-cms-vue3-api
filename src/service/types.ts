type strOrNull = string | null
type numOrNull = number | null

interface ITableCommon {
  id?: number
  name?: string
  createAt?: string
  updateAt?: string
}

interface IUser extends ITableCommon {
  realname?: string
  password?: string
  cellphone?: number
  enable?: number
  departmentId?: number
  roleId?: number
}

interface IDepartment extends ITableCommon {
  parentId?: number
  leader?: string
}

interface IMenu extends ITableCommon {
  type?: number
  icon?: strOrNull
  parendId?: numOrNull
  url?: strOrNull
  sort?: numOrNull
  permission?: strOrNull
}

interface IRole extends ITableCommon {
  intro?: string
}

interface IRoleMenu extends ITableCommon {
  roleId?: number
  menuId?: number
}

export { ITableCommon, IUser, IDepartment, IMenu, IRole, IRoleMenu }
