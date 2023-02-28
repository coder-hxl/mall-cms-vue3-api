# MALL-CMS-Vue3-API

MALL-CMS-Vue3-API —— 基于 NodeJS、TS 、MySQL 等技术开发的 Mall-CMS-Vue3 后台管理系统接口。采用 REST 设计风格。

如果对您有帮助可以点个 Star 支持一下。

有任何问题可以在 [MALL-CMS-Vue3-API](https://github.com/coder-hxl/mall-cms-vue3-api/issues) 中提 Issues 。

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

