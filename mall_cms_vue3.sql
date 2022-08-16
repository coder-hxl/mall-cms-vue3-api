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

 Date: 16/08/2022 19:47:16
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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of avatar
-- ----------------------------
INSERT INTO `avatar` VALUES (3, 'ed41ecfe5cedb43c621294c2c21f5e40', 'image/jpeg', 105570, 1, '2022-08-15 15:34:30', '2022-08-15 16:06:42');

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
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '上衣', '2022-08-15 16:39:47', '2022-08-15 16:39:47');
INSERT INTO `category` VALUES (2, '裤子', '2022-08-15 16:40:05', '2022-08-15 16:40:05');
INSERT INTO `category` VALUES (5, '袜子', '2022-08-15 16:40:21', '2022-08-15 17:07:38');
INSERT INTO `category` VALUES (11, '鞋子', '2022-08-15 17:13:42', '2022-08-15 17:13:42');
INSERT INTO `category` VALUES (12, '女装', '2022-08-16 15:17:59', '2022-08-16 15:17:59');
INSERT INTO `category` VALUES (13, '背心', '2022-08-16 15:18:11', '2022-08-16 15:18:11');
INSERT INTO `category` VALUES (14, '衣服套装', '2022-08-16 16:53:34', '2022-08-16 16:54:03');
INSERT INTO `category` VALUES (15, '牛仔衣服', '2022-08-16 17:16:31', '2022-08-16 17:16:31');
INSERT INTO `category` VALUES (16, '裙子', '2022-08-16 17:16:57', '2022-08-16 17:16:57');

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
INSERT INTO `department` VALUES (3, '运营部', 'lili', 1, '2022-08-15 13:50:37', '2022-08-15 13:58:50');
INSERT INTO `department` VALUES (4, '客服部', NULL, 1, '2022-08-15 13:52:26', '2022-08-15 14:01:13');
INSERT INTO `department` VALUES (5, '人事部', 'lihub', 1, '2022-08-15 13:53:04', '2022-08-15 13:54:42');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `oldPrice` bigint NULL DEFAULT NULL,
  `newPrice` bigint NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `enable` int NOT NULL,
  `imgUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `inventoryCount` bigint NULL DEFAULT NULL,
  `saleCount` bigint NULL DEFAULT NULL,
  `favorCount` bigint NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, '吊带背心女夏', 43, 30, '吊带背心女夏2022新款内搭吊带衫短款性感修身针织打底衫上衣显瘦', 1, 'http://s11.mogucdn.com/mlcdn/17f85e/180927_5i77e04lhaalbg3dai0j4588lbahh_640x960.jpg_560x999.jpg', 6666, 200, 50, '广州', '2022-08-16 16:43:11', '2022-08-16 16:43:11');
INSERT INTO `goods` VALUES (2, '秋装女装韩版新款休闲时尚套装女', 198, 198, '秋装女装韩版新款休闲时尚套装女圆领条纹薄款上衣+高腰束脚灯笼裤两件套女潮', 1, 'http://s11.mogucdn.com/mlcdn/55cf19/180803_44ec95haiehdddjk126fgidfg52le_640x960.jpg_560x999.jpg', 1582, 1459, 13, '重庆', '2022-08-16 16:56:15', '2022-08-16 16:56:15');
INSERT INTO `goods` VALUES (3, '新款牛仔外套女韩版宽松短款针织背心高腰半身裙中长裙', 39, 27, '秋装新款牛仔外套女韩版宽松短款针织背心高腰半身裙中长裙小个子显高时尚套装裙子三件套', 1, 'http://s3.mogucdn.com/mlcdn/c45406/180731_5be6jhh7ggj68d4063gkca4egh02i_750x1000.jpg_560x999.jpg', 7012, 1432, 103, '昆明', '2022-08-16 16:57:17', '2022-08-16 17:59:00');

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods_category
-- ----------------------------
INSERT INTO `goods_category` VALUES (2, 1, 1, '2022-08-16 16:43:11', '2022-08-16 16:43:11');
INSERT INTO `goods_category` VALUES (3, 1, 12, '2022-08-16 16:43:11', '2022-08-16 16:43:11');
INSERT INTO `goods_category` VALUES (4, 1, 13, '2022-08-16 16:43:11', '2022-08-16 16:43:11');
INSERT INTO `goods_category` VALUES (5, 2, 1, '2022-08-16 16:56:15', '2022-08-16 16:56:15');
INSERT INTO `goods_category` VALUES (6, 2, 2, '2022-08-16 16:56:15', '2022-08-16 16:56:15');
INSERT INTO `goods_category` VALUES (7, 2, 12, '2022-08-16 16:56:15', '2022-08-16 16:56:15');
INSERT INTO `goods_category` VALUES (8, 2, 14, '2022-08-16 16:56:15', '2022-08-16 16:56:15');
INSERT INTO `goods_category` VALUES (17, 3, 13, '2022-08-16 18:01:48', '2022-08-16 18:01:48');
INSERT INTO `goods_category` VALUES (18, 3, 15, '2022-08-16 18:01:48', '2022-08-16 18:01:48');
INSERT INTO `goods_category` VALUES (19, 3, 16, '2022-08-16 18:01:48', '2022-08-16 18:01:48');

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
INSERT INTO `menu` VALUES (37, '随便聊聊', 1, 'chat-line-round', '/main/story', 36, NULL, NULL, '2022-08-14 20:27:26', '2022-08-14 20:31:21');
INSERT INTO `menu` VALUES (38, '你的故事', 2, NULL, '/main/story/chat', 37, NULL, 37, '2022-08-14 20:31:07', '2022-08-14 20:31:07');
INSERT INTO `menu` VALUES (39, '故事列表', 2, NULL, '/main/story/list', 38, NULL, 37, '2022-08-14 20:31:49', '2022-08-14 20:31:49');
INSERT INTO `menu` VALUES (40, '删除故事', 3, NULL, NULL, 39, 'system:story:delete', 39, '2022-08-14 20:32:30', '2022-08-14 20:32:30');
INSERT INTO `menu` VALUES (41, '修改故事', 3, NULL, NULL, 40, 'system:story:update', 39, '2022-08-14 20:33:17', '2022-08-14 20:33:17');
INSERT INTO `menu` VALUES (42, '查询故事', 3, NULL, NULL, 41, 'system:story:query', 39, '2022-08-14 20:33:24', '2022-08-15 20:03:41');

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 99 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'coderhxl', 'hxl', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 13680688888, 1, 1, 1, 'http://localhost:9000/users/1/avatar', '2022-08-13 21:23:50', '2022-08-14 20:47:15');
INSERT INTO `users` VALUES (2, '浮幻', '浮幻', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 13680677777, 1, 2, 1, 'http://localhost:9000/users/2/avatar', '2022-08-14 20:54:06', '2022-08-14 21:01:25');
INSERT INTO `users` VALUES (3, 'admin', 'admin', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 13680666666, 1, 1, 1, NULL, '2022-08-15 13:51:17', '2022-08-15 13:51:17');
INSERT INTO `users` VALUES (4, 'lili', '莉莉', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 13680655555, 1, 4, 2, NULL, '2022-08-15 13:51:53', '2022-08-15 14:01:58');
INSERT INTO `users` VALUES (5, 'lihub', '李华', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 136806444444, 1, 5, 3, NULL, '2022-08-15 13:53:39', '2022-08-15 14:01:52');

SET FOREIGN_KEY_CHECKS = 1;
