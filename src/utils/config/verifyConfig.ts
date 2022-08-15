import userService from '@/service/user/userService'
import departmentService from '@/service/department/departmentService'
import menuService from '@/service/menu/menuService'
import roleService from '@/service/role/roleService'
import categoryService from '@/service/product/category/categoryService'

import { IUser, IDepartment, IMenu, IRole } from '@/service/types'

interface IQueryFns {
  users: (key: string, value: string) => Promise<IUser[]>
  department: (key: string, value: string) => Promise<IDepartment[]>
  menu: (key: string, value: string) => Promise<IMenu[]>
  role: (key: string, value: string) => Promise<IRole[]>
  category: (key: string, value: string) => Promise<IRole[]>
}

interface IQueryKeys {
  users: string[]
  department: string[]
  menu: string[]
  role: string[]
  category: string[]
}

const queryFns: IQueryFns = {
  users: userService.getUserByAny,
  department: departmentService.getDepartmentByAny,
  menu: menuService.getMenuByAny,
  role: roleService.getRoleByAny,
  category: categoryService.getCategorByAny
}

const queryKeys: IQueryKeys = {
  users: ['name'],
  department: ['name'],
  menu: ['name', 'url'],
  role: ['name'],
  category: ['name']
}

export { queryFns, queryKeys }
