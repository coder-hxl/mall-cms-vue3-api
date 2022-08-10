import userService from '@/service/user/userService'
import departmentService from '@/service/department/departmentService'
import menuService from '@/service/menu/menuService'
import roleService from '@/service/role/roleService'

const queryFns: any = {
  users: userService.getUserByAny,
  department: departmentService.getDepartmentByAny,
  menu: menuService.getMenuByAny,
  role: roleService.getRoleByAny
}

const queryKeys: any = {
  users: ['name'],
  department: ['name'],
  menu: ['name', 'url'],
  role: ['name']
}

export { queryFns, queryKeys }
