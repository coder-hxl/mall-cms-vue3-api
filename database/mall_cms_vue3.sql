/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : mall_cms_vue3

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 09/05/2023 14:15:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `size` bigint NOT NULL,
  `userId` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of avatar
-- ----------------------------
INSERT INTO `avatar` VALUES (3, 'a46eaecc31a843842c2bdf605b42ae8b', 'image/jpeg', 156750, 1, '2022-08-15 15:34:30', '2022-11-23 14:54:16');
INSERT INTO `avatar` VALUES (4, '496e3cbee3dfa73f07907df2765aed04', 'image/png', 101886, 2, '2022-08-22 18:13:40', '2022-11-23 12:05:59');
INSERT INTO `avatar` VALUES (5, 'a68cbc9ff3ed537caa517019249697b3', 'image/jpeg', 202063, 3, '2023-05-09 12:00:59', '2023-05-09 12:00:59');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '上衣', '2022-08-15 16:39:47', '2022-08-15 16:39:47');
INSERT INTO `category` VALUES (2, '裤子', '2022-08-15 16:40:05', '2022-08-15 16:40:05');
INSERT INTO `category` VALUES (3, '鞋子', '2022-08-15 17:13:42', '2022-08-27 16:14:47');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `leader` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `parentId` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE,
  INDEX `leader`(`leader`) USING BTREE,
  INDEX `parentId`(`parentId`) USING BTREE,
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`leader`) REFERENCES `users` (`name`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `department_ibfk_2` FOREIGN KEY (`parentId`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (1, '总裁办', 'coderhxl', NULL, '2022-08-14 20:40:02', '2022-08-14 20:43:26');
INSERT INTO `department` VALUES (2, '研发部', '浮幻', 1, '2022-08-14 20:48:43', '2022-08-15 13:58:54');
INSERT INTO `department` VALUES (3, '运营部', NULL, 1, '2022-08-15 13:50:37', '2022-08-15 13:58:50');
INSERT INTO `department` VALUES (4, '客服部', NULL, 1, '2022-08-15 13:52:26', '2022-08-15 14:01:13');
INSERT INTO `department` VALUES (5, '人事部', NULL, 1, '2022-08-15 13:53:04', '2022-08-15 13:54:42');
INSERT INTO `department` VALUES (7, '超级管理员', 'coderwhy', NULL, '2023-05-09 11:42:49', '2023-05-09 11:43:47');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `oldPrice` bigint NULL DEFAULT NULL,
  `newPrice` bigint NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `enable` int NOT NULL,
  `imgUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `inventoryCount` bigint NOT NULL,
  `saleCount` bigint NOT NULL,
  `favorCount` bigint NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, '吊带背心女夏', 43, 30, '吊带背心女夏2022新款内搭吊带衫短款性感修身针织打底衫上衣显瘦', 1, 'http://s11.mogucdn.com/mlcdn/17f85e/180927_5i77e04lhaalbg3dai0j4588lbahh_640x960.jpg_560x999.jpg', 6666, 200, 50, '广州', '2022-08-16 16:43:11', '2022-08-16 16:43:11');
INSERT INTO `goods` VALUES (2, '秋装女装韩版新款休闲时尚套装女', 198, 198, '秋装女装韩版新款休闲时尚套装女圆领条纹薄款上衣+高腰束脚灯笼裤两件套女潮', 1, 'http://s11.mogucdn.com/mlcdn/55cf19/180803_44ec95haiehdddjk126fgidfg52le_640x960.jpg_560x999.jpg', 1582, 1399, 13, '重庆', '2022-08-16 16:56:15', '2022-08-27 15:47:10');
INSERT INTO `goods` VALUES (3, '新款牛仔外套女韩版宽松短款针织背心高腰半身裙中长裙', 39, 27, '秋装新款牛仔外套女韩版宽松短款针织背心高腰半身裙中长裙小个子显高时尚套装裙子三件套', 1, 'http://s3.mogucdn.com/mlcdn/c45406/180731_5be6jhh7ggj68d4063gkca4egh02i_750x1000.jpg_560x999.jpg', 7012, 1432, 103, '昆明', '2022-08-16 16:57:17', '2022-08-16 17:59:00');
INSERT INTO `goods` VALUES (7, '秋装女装韩版新款休闲时尚套装女', 198, 198, '秋装女装韩版新款休闲时尚套装女圆领条纹薄款上衣+高腰束脚灯笼裤两件套女潮', 1, 'http://s11.mogucdn.com/mlcdn/55cf19/180803_44ec95haiehdddjk126fgidfg52le_640x960.jpg_560x999.jpg', 1582, 1459, 13, '重庆', '2023-05-09 11:57:37', '2023-05-09 11:57:37');
INSERT INTO `goods` VALUES (8, '秋装女装韩版新款休闲时尚套装女', 198, 198, '秋装女装韩版新款休闲时尚套装女圆领条纹薄款上衣+高腰束脚灯笼裤两件套女潮', 1, 'http://s11.mogucdn.com/mlcdn/55cf19/180803_44ec95haiehdddjk126fgidfg52le_640x960.jpg_560x999.jpg', 1582, 1459, 13, '重庆', '2023-05-09 11:57:45', '2023-05-09 11:57:45');

-- ----------------------------
-- Table structure for goods_category
-- ----------------------------
DROP TABLE IF EXISTS `goods_category`;
CREATE TABLE `goods_category`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `goodsId` int NOT NULL,
  `categoryId` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `goodsId`(`goodsId`) USING BTREE,
  INDEX `categoryId`(`categoryId`) USING BTREE,
  CONSTRAINT `goods_category_ibfk_1` FOREIGN KEY (`goodsId`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goods_category_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods_category
-- ----------------------------
INSERT INTO `goods_category` VALUES (2, 1, 1, '2022-08-16 16:43:11', '2022-08-16 16:43:11');
INSERT INTO `goods_category` VALUES (5, 2, 1, '2022-08-16 16:56:15', '2022-08-16 16:56:15');
INSERT INTO `goods_category` VALUES (6, 2, 2, '2022-08-16 16:56:15', '2022-08-16 16:56:15');
INSERT INTO `goods_category` VALUES (30, 7, 1, '2023-05-09 11:57:37', '2023-05-09 11:57:37');
INSERT INTO `goods_category` VALUES (31, 7, 2, '2023-05-09 11:57:37', '2023-05-09 11:57:37');
INSERT INTO `goods_category` VALUES (33, 8, 1, '2023-05-09 11:57:45', '2023-05-09 11:57:45');
INSERT INTO `goods_category` VALUES (34, 8, 2, '2023-05-09 11:57:45', '2023-05-09 11:57:45');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` int NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sort` int NULL DEFAULT NULL,
  `permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `parentId` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE,
  UNIQUE INDEX `url`(`url`) USING BTREE,
  INDEX `parentId`(`parentId`) USING BTREE,
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, '系统总览', 1, 'monitor', '/main/analysis', 1, NULL, NULL, '2022-08-14 19:46:08', '2022-08-14 19:46:08');
INSERT INTO `menu` VALUES (2, '核心技术', 2, NULL, '/main/analysis/overview', 2, NULL, 1, '2022-08-14 19:48:19', '2022-08-14 19:48:19');
INSERT INTO `menu` VALUES (3, '商品统计', 2, NULL, '/main/analysis/dashboard', 3, NULL, 1, '2022-08-14 19:49:15', '2022-08-14 19:49:15');
INSERT INTO `menu` VALUES (4, '系统管理', 1, 'setting', '/main/system', 4, NULL, NULL, '2022-08-14 19:50:32', '2022-08-14 19:50:32');
INSERT INTO `menu` VALUES (5, '用户管理', 2, NULL, '/main/system/user', 5, NULL, 4, '2022-08-14 19:51:41', '2022-08-14 20:45:07');
INSERT INTO `menu` VALUES (6, '创建用户', 3, NULL, NULL, 6, 'system:users:create', 5, '2022-08-14 19:53:30', '2022-08-14 20:49:34');
INSERT INTO `menu` VALUES (7, '删除用户', 3, NULL, NULL, 7, 'system:users:delete', 5, '2022-08-14 19:57:35', '2022-08-14 20:49:37');
INSERT INTO `menu` VALUES (8, '修改用户', 3, NULL, NULL, 8, 'system:users:update', 5, '2022-08-14 19:58:40', '2022-08-14 20:49:48');
INSERT INTO `menu` VALUES (9, '查询用户', 3, NULL, NULL, 9, 'system:users:query', 5, '2022-08-14 20:03:53', '2022-08-14 20:50:13');
INSERT INTO `menu` VALUES (10, '部门管理', 2, NULL, '/main/system/department', 10, NULL, 4, '2022-08-14 20:01:04', '2022-08-14 20:04:37');
INSERT INTO `menu` VALUES (11, '创建部门', 3, NULL, NULL, 11, 'system:department:create', 10, '2022-08-14 20:07:00', '2022-08-14 20:07:25');
INSERT INTO `menu` VALUES (13, '删除部门', 3, NULL, NULL, 12, 'system:department:delete', 10, '2022-08-14 20:08:05', '2022-08-14 20:08:05');
INSERT INTO `menu` VALUES (14, '修改部门', 3, NULL, NULL, 13, 'system:department:update', 10, '2022-08-14 20:08:20', '2022-08-14 20:09:27');
INSERT INTO `menu` VALUES (15, '查询部门', 3, NULL, NULL, 14, 'system:department:query', 10, '2022-08-14 20:08:41', '2022-08-14 20:10:24');
INSERT INTO `menu` VALUES (16, '菜单管理', 2, NULL, '/main/system/menu', 15, NULL, 4, '2022-08-14 20:09:55', '2022-08-14 20:09:55');
INSERT INTO `menu` VALUES (17, '创建菜单', 3, NULL, NULL, 16, 'system:menu:create', 16, '2022-08-14 20:11:19', '2022-08-14 20:13:28');
INSERT INTO `menu` VALUES (18, '删除菜单', 3, NULL, NULL, 17, 'system:menu:delete', 16, '2022-08-14 20:13:05', '2022-08-14 20:13:30');
INSERT INTO `menu` VALUES (19, '修改菜单', 3, NULL, NULL, 18, 'system:menu:update', 16, '2022-08-14 20:13:15', '2022-08-14 20:13:32');
INSERT INTO `menu` VALUES (20, '查询菜单', 3, NULL, NULL, 19, 'system:menu:query', 16, '2022-08-14 20:13:47', '2022-08-14 20:13:47');
INSERT INTO `menu` VALUES (21, '角色管理', 2, NULL, '/main/system/role', 20, NULL, 4, '2022-08-14 20:15:59', '2022-08-14 20:15:59');
INSERT INTO `menu` VALUES (22, '创建角色', 3, NULL, NULL, 21, 'system:role:create', 21, '2022-08-14 20:17:43', '2022-08-14 20:17:43');
INSERT INTO `menu` VALUES (23, '删除角色', 3, NULL, NULL, 22, 'system:role:delete', 21, '2022-08-14 20:18:06', '2022-08-14 20:18:06');
INSERT INTO `menu` VALUES (24, '修改角色', 3, NULL, NULL, 23, 'system:role:update', 21, '2022-08-14 20:18:22', '2022-08-14 20:18:22');
INSERT INTO `menu` VALUES (25, '查询角色', 3, NULL, NULL, 24, 'system:role:query', 21, '2022-08-14 20:18:32', '2022-08-14 20:18:32');
INSERT INTO `menu` VALUES (26, '商品中心', 1, 'goods', '/main/product', 25, NULL, NULL, '2022-08-14 20:19:44', '2022-08-14 20:19:44');
INSERT INTO `menu` VALUES (27, '商品类别', 2, NULL, '/main/product/category', 31, NULL, 26, '2022-08-14 20:20:18', '2022-08-15 20:07:58');
INSERT INTO `menu` VALUES (28, '创建类别', 3, NULL, NULL, 32, 'system:category:create', 27, '2022-08-14 20:20:56', '2022-08-15 20:08:01');
INSERT INTO `menu` VALUES (29, '删除类别', 3, NULL, NULL, 33, 'system:category:delete', 27, '2022-08-14 20:21:43', '2022-08-15 20:08:04');
INSERT INTO `menu` VALUES (30, '修改类别', 3, NULL, NULL, 34, 'system:category:update', 27, '2022-08-14 20:21:54', '2022-08-15 20:08:11');
INSERT INTO `menu` VALUES (31, '查询类别', 3, NULL, NULL, 30, 'system:category:query', 27, '2022-08-14 20:22:06', '2022-08-14 20:30:36');
INSERT INTO `menu` VALUES (32, '商品信息', 2, NULL, '/main/product/goods', 26, NULL, 26, '2022-08-14 20:23:14', '2022-08-15 20:07:37');
INSERT INTO `menu` VALUES (33, '创建商品', 3, NULL, NULL, 27, 'system:goods:create', 32, '2022-08-14 20:23:53', '2022-08-15 20:07:42');
INSERT INTO `menu` VALUES (34, '删除商品', 3, NULL, NULL, 28, 'system:goods:delete', 32, '2022-08-14 20:24:11', '2022-08-15 20:07:46');
INSERT INTO `menu` VALUES (35, '修改商品', 3, NULL, NULL, 29, 'system:goods:update', 32, '2022-08-14 20:24:19', '2022-08-15 20:07:49');
INSERT INTO `menu` VALUES (36, '查询商品', 3, NULL, NULL, 30, 'system:goods:query', 32, '2022-08-14 20:24:27', '2022-08-15 20:07:55');
INSERT INTO `menu` VALUES (37, '动态', 1, 'chat-line-round', '/main/moment', 36, NULL, NULL, '2022-08-14 20:27:26', '2022-08-19 13:11:11');
INSERT INTO `menu` VALUES (38, '动态主页', 2, NULL, '/main/moment/main', 37, NULL, 37, '2022-08-14 20:31:07', '2022-08-19 14:15:25');
INSERT INTO `menu` VALUES (39, '动态列表', 2, NULL, '/main/moment/list', 38, NULL, 37, '2022-08-14 20:31:49', '2022-08-19 13:11:20');
INSERT INTO `menu` VALUES (40, '删除动态', 3, NULL, NULL, 39, 'system:moment:delete', 39, '2022-08-14 20:32:30', '2022-08-19 13:12:53');
INSERT INTO `menu` VALUES (41, '修改动态', 3, NULL, NULL, 40, 'system:moment:update', 39, '2022-08-14 20:33:17', '2022-08-19 13:13:03');
INSERT INTO `menu` VALUES (42, '查询动态', 3, NULL, NULL, 41, 'system:moment:query', 39, '2022-08-14 20:33:24', '2022-08-19 13:13:11');

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `contentHtml` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contentText` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `title` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment
-- ----------------------------
INSERT INTO `moment` VALUES (1, '<p><strong>项目介绍</strong></p><p><strong>MALL-CMS-Vue3</strong>&nbsp;是基于&nbsp;Vue3、Pinia、VueRouter、Vite、ElementPlus、TypeScript、Echart5&nbsp;等技术实现的。</p><p><strong>技术栈</strong></p><ul style=\"text-indent: 0px; text-align: left;\"><li>开发工具:&nbsp;<a href=\"\" target=\"\">Visual&nbsp;Studio&nbsp;Code</a></li><li>编程语言:&nbsp;<a href=\"\" target=\"\">TypeScript&nbsp;4&nbsp;+&nbsp;JavaScript</a></li><li>构建语言:&nbsp;<a href=\"\" target=\"\">Vite&nbsp;2</a></li><li>前端框架:&nbsp;<a href=\"\" target=\"\">Vue&nbsp;3</a></li><li>路由工具:&nbsp;<a href=\"\" target=\"\">Vue&nbsp;Router&nbsp;4</a></li><li>状态管理:&nbsp;<a href=\"\" target=\"\">Pinia&nbsp;2</a></li><li>UI&nbsp;框架:&nbsp;<a href=\"\" target=\"\">Element&nbsp;Plus</a></li><li>可视化:&nbsp;<a href=\"\" target=\"\">Echart&nbsp;5</a></li><li>富文本:&nbsp;<a href=\"\" target=\"\">WangEditor</a></li><li>工具库:&nbsp;<a href=\"\" target=\"\">dayjs&nbsp;+&nbsp;countup.js</a></li><li>CSS&nbsp;预编译:&nbsp;<a href=\"\" target=\"\">Less</a></li><li>HTTP&nbsp;工具:&nbsp;<a href=\"\" target=\"\">Axios</a></li><li>Git&nbsp;Hook&nbsp;工具:&nbsp;<a href=\"\" target=\"\">husky</a></li><li>代码规范:&nbsp;<a href=\"\" target=\"\">EditorConfig&nbsp;+&nbsp;Prettier&nbsp;+&nbsp;ESLint</a></li><li>提交规范:&nbsp;<a href=\"\" target=\"\">Commitizen&nbsp;+&nbsp;Commitlint</a></li><li>自动部署:&nbsp;<a href=\"\" target=\"\">Centos&nbsp;+&nbsp;Jenkins&nbsp;+&nbsp;Nginx</a></li></ul>', '项目介绍\nMALL-CMS-Vue3 是基于 Vue3、Pinia、VueRouter、Vite、ElementPlus、TypeScript、Echart5 等技术实现的。\n\n技术栈\n开发工具: Visual Studio Code编程语言: TypeScript 4 + JavaScript构建语言: Vite 2前端框架: Vue 3路由工具: Vue Router 4状态管理: Pinia 2UI 框架: Element Plus可视化: Echart 5富文本: WangEditor工具库: dayjs + countup.jsCSS 预编译: LessHTTP 工具: AxiosGit Hook 工具: husky代码规范: EditorConfig + Prettier + ESLint提交规范: Commitizen + Commitlint自动部署: Centos + Jenkins + Nginx', 1, '2022-08-19 15:56:07', '2022-08-22 18:06:49', 'MALL-CMS-Vue3');
INSERT INTO `moment` VALUES (2, '<p><br></p><h1 style=\"text-indent: 0px; text-align: center; line-height: 1.25;\">渐进式<br>JavaScript&nbsp;框架</h1>', '渐进式\nJavaScript 框架', 1, '2022-08-19 18:34:04', '2022-08-22 18:08:11', 'Vue');
INSERT INTO `moment` VALUES (3, '<p><em>道阻且长&nbsp;行则将至</em></p>', '道阻且长 行则将至', 1, '2022-08-22 18:10:17', '2022-08-22 18:10:44', '这一路');
INSERT INTO `moment` VALUES (6, '<p>它也是中国古老文化的深奥概念，是一套用三组阴阳组成的形而上的哲学符号。其深邃的哲理解释自然、社会现象。八卦成列，象在其中矣；因而重之，爻在其中矣；刚柔相推，变在其中矣；系辞焉而命之，动在其中矣。八卦成列的基础是易象，重卦的基础则在于爻变，“爻在其中矣”便是易道周流的内在动因。八卦表示事物自身变化的阴阳系统，用“一”代表阳，用“-&nbsp;-”代表阴，用这两种符号，按照大自然的阴阳变化平行组合，组成八种不同形式，叫做八卦。八卦其实是最早的文字表述符号。</p>', '它也是中国古老文化的深奥概念，是一套用三组阴阳组成的形而上的哲学符号。其深邃的哲理解释自然、社会现象。八卦成列，象在其中矣；因而重之，爻在其中矣；刚柔相推，变在其中矣；系辞焉而命之，动在其中矣。八卦成列的基础是易象，重卦的基础则在于爻变，“爻在其中矣”便是易道周流的内在动因。八卦表示事物自身变化的阴阳系统，用“一”代表阳，用“- -”代表阴，用这两种符号，按照大自然的阴阳变化平行组合，组成八种不同形式，叫做八卦。八卦其实是最早的文字表述符号。', 2, '2022-08-22 18:19:59', '2022-08-22 18:19:59', '八卦');
INSERT INTO `moment` VALUES (8, '<p><strong>先天八卦</strong>，相传来自于河图。它是乾坤定南北，坎离定东西，是天南地北为序，上为天为乾，下为地为坤，左为东为离，右为西为坎。故先天八卦数是：乾一、兑二、离三、震四、巽五、坎六、艮七、坤八。它的中间数为0，以代表五或十。0象征着宇宙的元气。它的序数对宫相加之和为九数。先天八卦演变过程中，首先是太极，其次是两仪，接着是四象，最后是八卦，它们是宇宙形成的过程。</p>', '先天八卦，相传来自于河图。它是乾坤定南北，坎离定东西，是天南地北为序，上为天为乾，下为地为坤，左为东为离，右为西为坎。故先天八卦数是：乾一、兑二、离三、震四、巽五、坎六、艮七、坤八。它的中间数为0，以代表五或十。0象征着宇宙的元气。它的序数对宫相加之和为九数。先天八卦演变过程中，首先是太极，其次是两仪，接着是四象，最后是八卦，它们是宇宙形成的过程。', 2, '2022-08-22 18:27:43', '2022-08-22 18:27:43', '先天八卦');
INSERT INTO `moment` VALUES (9, '<p><strong>后天八卦</strong>，相传来自于洛书。它是离坎定南北，震兑定东西。故后天八卦数是：坎一、坤二、震三、巽四、中五、乾六、兑七、艮八、离九。它的中间数为五，与对宫纵横相加之和为十五数。</p>', '后天八卦，相传来自于洛书。它是离坎定南北，震兑定东西。故后天八卦数是：坎一、坤二、震三、巽四、中五、乾六、兑七、艮八、离九。它的中间数为五，与对宫纵横相加之和为十五数。', 2, '2022-08-22 18:28:08', '2022-08-22 18:28:08', '后天八卦');
INSERT INTO `moment` VALUES (10, '<p><strong>test</strong><span style=\"color: rgb(255, 236, 61);\"><strong>5265</strong></span></p>', 'test5265', 1, '2022-09-06 16:40:50', '2022-09-06 16:40:50', 'test');
INSERT INTO `moment` VALUES (11, '<p>你好啊, coderhxl</p>', '你好啊, coderhxl', 3, '2023-05-09 12:00:13', '2023-05-09 12:00:13', '介绍');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `intro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '超级管理员', '全部权限', '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role` VALUES (2, '运营', '日常事物', '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role` VALUES (3, '人事', '人事管理', '2022-08-15 13:58:11', '2022-08-15 13:58:11');

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `menuId` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `roleId`(`roleId`) USING BTREE,
  INDEX `menuId`(`menuId`) USING BTREE,
  CONSTRAINT `role_menu_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_menu_ibfk_2` FOREIGN KEY (`menuId`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 139 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES (1, 1, 1, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (2, 1, 2, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (3, 1, 3, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (4, 1, 4, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (5, 1, 5, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (6, 1, 6, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (7, 1, 7, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (8, 1, 8, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (9, 1, 9, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (10, 1, 10, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (11, 1, 11, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (12, 1, 13, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (13, 1, 14, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (14, 1, 15, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (15, 1, 16, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (16, 1, 17, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (17, 1, 18, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (18, 1, 19, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (19, 1, 20, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (20, 1, 21, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (21, 1, 22, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (22, 1, 23, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (23, 1, 24, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (24, 1, 25, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (25, 1, 26, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (26, 1, 27, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (27, 1, 28, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (28, 1, 29, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (29, 1, 30, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (30, 1, 31, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (31, 1, 32, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (32, 1, 33, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (33, 1, 34, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (34, 1, 35, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (35, 1, 36, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (36, 1, 37, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (37, 1, 38, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (38, 1, 39, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (39, 1, 40, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (40, 1, 41, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (41, 1, 42, '2022-08-14 20:42:49', '2022-08-14 20:42:49');
INSERT INTO `role_menu` VALUES (42, 2, 1, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (43, 2, 2, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (44, 2, 3, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (45, 2, 6, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (46, 2, 8, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (47, 2, 9, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (48, 2, 11, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (49, 2, 14, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (50, 2, 15, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (51, 2, 17, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (52, 2, 19, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (53, 2, 20, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (54, 2, 22, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (55, 2, 24, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (56, 2, 25, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (57, 2, 28, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (58, 2, 30, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (59, 2, 31, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (60, 2, 33, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (61, 2, 35, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (62, 2, 36, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (63, 2, 38, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (64, 2, 41, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (65, 2, 42, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (66, 2, 4, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (67, 2, 5, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (68, 2, 10, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (69, 2, 16, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (70, 2, 21, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (71, 2, 26, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (72, 2, 27, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (73, 2, 32, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (74, 2, 37, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (75, 2, 39, '2022-08-15 13:56:45', '2022-08-15 13:56:45');
INSERT INTO `role_menu` VALUES (76, 3, 1, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (77, 3, 2, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (78, 3, 3, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (79, 3, 6, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (80, 3, 8, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (81, 3, 9, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (82, 3, 15, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (83, 3, 20, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (84, 3, 25, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (85, 3, 31, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (86, 3, 36, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (87, 3, 38, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (88, 3, 42, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (89, 3, 4, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (90, 3, 5, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (91, 3, 10, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (92, 3, 16, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (93, 3, 21, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (94, 3, 26, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (95, 3, 27, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (96, 3, 32, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (97, 3, 37, '2022-08-15 13:58:11', '2022-08-15 13:58:11');
INSERT INTO `role_menu` VALUES (98, 3, 39, '2022-08-15 13:58:11', '2022-08-15 13:58:11');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `realname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cellphone` bigint NOT NULL,
  `enable` int NOT NULL,
  `departmentId` int NULL DEFAULT NULL,
  `roleId` int NULL DEFAULT NULL,
  `avatarUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE,
  INDEX `departmentId`(`departmentId`) USING BTREE,
  INDEX `roleId`(`roleId`) USING BTREE,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'coderhxl', 'hxl', '99443ffdd6664b8f42f45f926401cf74c40bc4fad6d0bfc5a47691072a27a212', 13680688888, 1, 1, 1, 'http://localhost:9000/users/1/avatar/a46eaecc31a843842c2bdf605b42ae8b', '2022-08-13 21:23:50', '2023-05-09 14:12:14');
INSERT INTO `users` VALUES (2, '浮幻', '浮幻', '99443ffdd6664b8f42f45f926401cf74c40bc4fad6d0bfc5a47691072a27a212', 13680677777, 1, 2, 1, 'http://localhost:9000/users/2/avatar/496e3cbee3dfa73f07907df2765aed04', '2022-08-14 20:54:06', '2023-05-09 14:12:27');
INSERT INTO `users` VALUES (3, 'admin', 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 13680666666, 1, 1, 1, 'http://localhost:9000/users/3/avatar/a68cbc9ff3ed537caa517019249697b3', '2022-08-15 13:51:17', '2023-05-09 14:12:38');
INSERT INTO `users` VALUES (9, 'coderwhy', 'coderwhy', 'd17f25ecfbcc7857f7bebea469308be0b2580943e96d13a3ad98a13675c4bfc2', 13680666677, 1, 1, 1, NULL, '2023-05-09 11:38:48', '2023-05-09 11:41:13');

SET FOREIGN_KEY_CHECKS = 1;
