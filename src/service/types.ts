type strOrNull = string | null
type numOrNull = number | null
type tableName =
  | 'users'
  | 'department'
  | 'menu'
  | 'role'
  | 'avatar'
  | 'category'
  | 'goods'
  | 'moment'

interface ITableCommon {
  id?: number
  createAt?: string
  updateAt?: string
}

interface IUser extends ITableCommon {
  name?: string
  realname?: string
  password?: string
  cellphone?: number
  enable?: number
  departmentId?: number
  roleId?: number
  avatarUrl?: string
}

interface IDepartment extends ITableCommon {
  name?: string
  parentId?: number
  leader?: string
}

interface IMenu extends ITableCommon {
  name?: string
  type?: number
  icon?: strOrNull
  parentId?: numOrNull
  url?: strOrNull
  sort?: numOrNull
  permission?: strOrNull

  children?: IMenu[]
}

interface IRole extends ITableCommon {
  name?: string
  intro?: string
  menuList?: IMenu[]
}

interface IRRoleMenu extends ITableCommon {
  roleId?: number
  menuId?: number
}

interface IAvatar extends ITableCommon {
  filename?: string
  mimetype?: string
  size?: number
  userId?: number
}

interface ICategory extends ITableCommon {
  name?: string
}

interface IGoods extends ITableCommon {
  name?: string
  oldPrice?: number
  newPrice?: number
  description?: string
  enable?: number
  imgUrl?: string
  inverntoryCount?: number
  saleCount?: number
  favorCount?: number
  address?: string
}

interface IRGoodsCategory extends ITableCommon {
  goodsId?: number
  categoryId?: number
}

interface IMoment extends ITableCommon {
  content?: string
  userId?: number
}

export {
  tableName,
  ITableCommon,
  IUser,
  IDepartment,
  IMenu,
  IRole,
  IRRoleMenu,
  IAvatar,
  ICategory,
  IGoods,
  IRGoodsCategory,
  IMoment
}
