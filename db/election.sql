# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.17)
# Database: election
# Generation Time: 2019-03-29 01:48:28 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table candidate
# ------------------------------------------------------------

DROP TABLE IF EXISTS `candidate`;

CREATE TABLE `candidate` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `election_id` int(11) DEFAULT '1' COMMENT '选举ID',
  `name` varchar(200) DEFAULT NULL COMMENT '候选人名称',
  `description` varchar(500) DEFAULT NULL COMMENT '候选人介绍',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `vote_count` int(11) DEFAULT NULL COMMENT '投票数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table election
# ------------------------------------------------------------

DROP TABLE IF EXISTS `election`;

CREATE TABLE `election` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL COMMENT '选举名称',
  `start` datetime DEFAULT NULL COMMENT '开始时间',
  `end` datetime DEFAULT NULL COMMENT '结束时间',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `election` WRITE;
/*!40000 ALTER TABLE `election` DISABLE KEYS */;

INSERT INTO `election` (`id`, `name`, `start`, `end`, `created_at`)
VALUES
	(1,'Election App Test','2019-03-29 00:00:00','2019-04-05 00:00:00','2019-03-29 01:23:13');

/*!40000 ALTER TABLE `election` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(200) DEFAULT NULL COMMENT '用户邮箱',
  `password` varchar(200) DEFAULT NULL COMMENT '密码',
  `salt` varchar(6) DEFAULT NULL COMMENT '密码salt',
  `is_valid` tinyint(1) DEFAULT '0' COMMENT '是否已进行邮箱验证',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `email`, `password`, `salt`, `is_valid`, `created_at`, `updated_at`)
VALUES
	(1,'pascal_lin@foxmail.com','8a96c29482ff2359113b545fcbdcc169','694431',1,'2019-03-29 01:20:29','2019-03-29 09:20:30');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_vote_record
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_vote_record`;

CREATE TABLE `user_vote_record` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `election_id` int(11) DEFAULT NULL COMMENT '选举ID',
  `candidates` varchar(50) DEFAULT NULL COMMENT '候选人ID(”,“分隔)',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
