type strOrNull = string | null
type numOrNull = number | null
type tableName = 'users' | 'department' | 'menu' | 'role' | 'avatar'

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
  avatarUrl?: string
}

interface IDepartment extends ITableCommon {
  parentId?: number
  leader?: string
}

interface IMenu extends ITableCommon {
  type?: number
  icon?: strOrNull
  parentId?: numOrNull
  url?: strOrNull
  sort?: numOrNull
  permission?: strOrNull

  children?: IMenu[]
}

interface IRole extends ITableCommon {
  intro?: string

  menuList?: IMenu[]
}

interface IRoleMenu extends ITableCommon {
  roleId?: number
  menuId?: number
}

interface IAvatar extends ITableCommon {
  filename?: string
  mimetype?: string
  size?: number
  userId?: number
}

interface ICategory extends ITableCommon

export {
  tableName,
  ITableCommon,
  IUser,
  IDepartment,
  IMenu,
  IRole,
  IRoleMenu,
  IAvatar,
  ICategory
}
