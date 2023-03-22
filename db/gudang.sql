/*
 Navicat Premium Data Transfer

 Source Server         : db-kelompok3
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : 13.229.43.83:3306
 Source Schema         : gudang

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 18/03/2023 14:06:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for data_barang
-- ----------------------------
DROP TABLE IF EXISTS `data_barang`;
CREATE TABLE `data_barang`  (
  `id_barang` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_kategori` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nama_barang` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `deskripsi` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `jumlah_barang` int NULL DEFAULT NULL,
  `foto_barang` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `harga_barang` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_barang`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of data_barang
-- ----------------------------
INSERT INTO `data_barang` VALUES ('1679091c5a880faf6fb5e6087eb1b2dc', 'd41d8cd98f00b204e9800998ecf8427e', 'mobil toyota avanza 2018', '', 10, 'null.jpg', '180000000', NULL, NULL);
INSERT INTO `data_barang` VALUES ('2ce7559ea91841836768e569e008c882', '8f14e45fceea167a5a36dedd4bea2543', 'faddaf', 'asdasdasda', 2312, 'null.jpg', '23131', NULL, NULL);
INSERT INTO `data_barang` VALUES ('45c48cce2e2d7fbdea1afc51c7c6ad26', '8f14e45fceea167a5a36dedd4bea2543', 'nasi goreng', '', 7, 'null.jpg', '15000', NULL, NULL);
INSERT INTO `data_barang` VALUES ('a87ff679a2f3e71d9181a67b7542122c', 'd41d8cd98f00b204e9800998ecf8427e', 'Motor honda beat 2020', '', 5, 'null.jpg', '50000000', NULL, NULL);
INSERT INTO `data_barang` VALUES ('c4ca4238a0b923820dcc509a6f75849b', 'a87ff679a2f3e71d9181a67b7542122c', 'Tv Samsung LED 32 inch', 'tv untuk ruangan pimpinan', 10, 'null.jpg', '3500000', NULL, NULL);
INSERT INTO `data_barang` VALUES ('e4da3b7fbbce2345d7772b0674a318d5', 'e4da3b7fbbce2345d7772b0674a318d5', 'Kertas hvs', '', 12, 'null.jpg', '65000', NULL, NULL);
INSERT INTO `data_barang` VALUES ('eccbc87e4b5ce2fe28308fd9f2a7baf3', 'c81e728d9d4c2f636f067f89cc14862c', 'Tepung terigu', '', 12, 'null.jpg', '25000', NULL, NULL);

-- ----------------------------
-- Table structure for histori_barang
-- ----------------------------
DROP TABLE IF EXISTS `histori_barang`;
CREATE TABLE `histori_barang`  (
  `id_transaksi` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_barang` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `type` enum('MASUK','KELUAR') CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT NULL,
  `nama` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `kuantitas` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_transaksi`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of histori_barang
-- ----------------------------
INSERT INTO `histori_barang` VALUES ('10', 'c4ca4238a0b923820dcc509a6f75849b', 'MASUK', '0000-00-00 00:00:00', 'Deli', 6);
INSERT INTO `histori_barang` VALUES ('11', 'c4ca4238a0b923820dcc509a6f75849b', 'MASUK', '0000-00-00 00:00:00', 'Deli', 5);
INSERT INTO `histori_barang` VALUES ('12', 'c4ca4238a0b923820dcc509a6f75849b', 'KELUAR', '0000-00-00 00:00:00', 'Deli', 5);
INSERT INTO `histori_barang` VALUES ('13', 'eccbc87e4b5ce2fe28308fd9f2a7baf3', 'MASUK', '0000-00-00 00:00:00', 'Deli', 5);
INSERT INTO `histori_barang` VALUES ('14', 'eccbc87e4b5ce2fe28308fd9f2a7baf3', 'MASUK', '0000-00-00 00:00:00', 'Deli', 3);
INSERT INTO `histori_barang` VALUES ('15', 'eccbc87e4b5ce2fe28308fd9f2a7baf3', 'KELUAR', '0000-00-00 00:00:00', 'Deli', 3);
INSERT INTO `histori_barang` VALUES ('16', 'eccbc87e4b5ce2fe28308fd9f2a7baf3', 'KELUAR', '0000-00-00 00:00:00', 'Deli', 3);
INSERT INTO `histori_barang` VALUES ('19', '45c48cce2e2d7fbdea1afc51c7c6ad26', 'MASUK', '0000-00-00 00:00:00', 'rizky panji', 12);
INSERT INTO `histori_barang` VALUES ('20', '45c48cce2e2d7fbdea1afc51c7c6ad26', 'KELUAR', '0000-00-00 00:00:00', 'rizky panji', 5);
INSERT INTO `histori_barang` VALUES ('21', 'a87ff679a2f3e71d9181a67b7542122c', 'MASUK', '0000-00-00 00:00:00', 'rizky panji', 2);
INSERT INTO `histori_barang` VALUES ('22', 'a87ff679a2f3e71d9181a67b7542122c', 'KELUAR', '0000-00-00 00:00:00', 'rizky panji', 2);
INSERT INTO `histori_barang` VALUES ('23', 'e4da3b7fbbce2345d7772b0674a318d5', 'MASUK', '0000-00-00 00:00:00', 'rizky panji', 12);
INSERT INTO `histori_barang` VALUES ('24', '1679091c5a880faf6fb5e6087eb1b2dc', 'MASUK', '0000-00-00 00:00:00', 'rizky panji', 3);
INSERT INTO `histori_barang` VALUES ('27', '1679091c5a880faf6fb5e6087eb1b2dc', 'MASUK', '0000-00-00 00:00:00', 'rizky panji', 5);
INSERT INTO `histori_barang` VALUES ('8', 'c4ca4238a0b923820dcc509a6f75849b', 'MASUK', '0000-00-00 00:00:00', 'Deli', 1);
INSERT INTO `histori_barang` VALUES ('9', 'c4ca4238a0b923820dcc509a6f75849b', 'MASUK', '0000-00-00 00:00:00', 'Deli', 1);

-- ----------------------------
-- Table structure for kategori_barang
-- ----------------------------
DROP TABLE IF EXISTS `kategori_barang`;
CREATE TABLE `kategori_barang`  (
  `id_kategori` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `kategori` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `deskripsi` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`id_kategori`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kategori_barang
-- ----------------------------
INSERT INTO `kategori_barang` VALUES ('8f14e45fceea167a5a36dedd4bea2543', 'makanan jadi', 'data makanan jadi misal nasi goreng');
INSERT INTO `kategori_barang` VALUES ('a87ff679a2f3e71d9181a67b7542122c', 'alat elektronik', 'data alat elektronik seperti tv, komputel, laptop dll');
INSERT INTO `kategori_barang` VALUES ('c81e728d9d4c2f636f067f89cc14862c', 'bahan makanan', 'data bahan makanan seperti tepung terigu, minyak dll');
INSERT INTO `kategori_barang` VALUES ('d41d8cd98f00b204e9800998ecf8427e', 'kendaraan', 'data kendaraan seperti mobil, motor dll');
INSERT INTO `kategori_barang` VALUES ('e4da3b7fbbce2345d7772b0674a318d5', 'alat tulis kantor', 'data alat tulis kantor seperti buku, kerta dll');
INSERT INTO `kategori_barang` VALUES ('eccbc87e4b5ce2fe28308fd9f2a7baf3', 'alat masak', 'data alat masak seperti wajan, kompor, ricecooker dll');

SET FOREIGN_KEY_CHECKS = 1;
