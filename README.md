# MALL-CMS-Vue3-API

Mall-CMS-Vue3 是基于 NodeJS、TypeScript 、Koa、MySQL 等技术实现的后台管理系统 API 。拥有系统总览（核心技术、商品统计）、系统管理（用户管理、部门管理、菜单管理、角色管理）、商品中心（商品分类、商品信息）、动态（动态主页、动态列表）的 API 。采用 REST 设计风格。

> 如果对您有帮助，可以给 [MALL-CMS-Vue3-API 存储库](https://github.com/coder-hxl/mall-cms-vue3-api) 点个 star 支持一下！

## API 文档

API 文档: https://documenter.getpostman.com/view/19782726/Uze1x5Af

## 如何运行

1. 没有 pnpm ？

   ```shell
   npm install pnpm -g
   ```

2. 安装依赖（运行完该命令就可以进入步骤3）

   ```shell
   pnpm add .
   ```

2. 在 MySQL 创建一个名为 mall_cms_vue3 的数据库，然后将 database/mall_cms_vue3.sql 文件导入进去

3. 配置 .env 文件

   ```shell
   APP_HOST=http://localhost # 项目运行的主机
   APP_PORT=9000  # 项目运行的端口号
   
   MYSQL_HOST=localhost # MySQL 运行的主机
   MYSQL_PORT=3306 # MySQL 运行的端口号
   MYSQL_USER=root # MySQL 用户名
   MYSQL_PASSWORD=root # MySQL 密码
   MYSQL_DATABASE=mall_cms_vue3 # MySQL 数据库名称
   ```
   
4. 启动 

   ```shell
   pnpm start
   ```

## 前端

MALL-CMS-Vue3 Github 地址: https://github.com/coder-hxl/mall-cms-vue3

MALL-CMS-Vue3 Gitee 地址: https://gitee.com/coderhxl/mall-cms-vue3

