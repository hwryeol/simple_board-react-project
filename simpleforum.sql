-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: simpleforum
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_no` int NOT NULL,
  `contents` text NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_uuid` varchar(36) NOT NULL,
  `recommended` int DEFAULT '0',
  `non_recommended` int DEFAULT '0',
  `seq` int NOT NULL DEFAULT '0',
  `lvl` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `post_no` (`post_no`),
  KEY `user_uuid` (`user_uuid`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (133,200059,'굿','2022-04-04 09:02:27','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,1,0),(134,200059,'굿\n','2022-04-04 09:02:42','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,1,1),(135,200060,'ㄱㅁㄱㅁ','2022-04-06 11:34:10','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,1,0),(136,200060,'ㄱㅈㄱㅁㅈ','2022-04-06 11:34:22','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,1,1),(137,200060,'fsfsfs','2022-04-06 14:51:38','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,2,0),(138,200060,'tstststs','2022-04-06 14:51:42','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,2,1),(139,200060,'fsfsfs','2022-04-06 15:22:57','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,1,1),(140,200060,'zzzzzzzzzzz','2022-04-06 15:23:00','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,2,1),(141,200060,'ffffsfz','2022-04-06 15:23:03','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,3,0),(142,200061,'ㄹㄹ','2022-04-06 16:42:00','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,1,0),(143,200061,'ㄹㄹㄹㄶㄴ','2022-04-06 16:42:01','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,2,0),(144,200061,'ㄹㄹㄹㄶㄴㅈㅅㅈㅅㅈ','2022-04-06 16:42:03','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,3,0),(145,200061,'ㄱㅈㅁㄱㅁㅈ','2022-04-06 16:42:05','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,3,1),(146,200066,'ㅁㄴㅇㄻㄴㄻ','2022-04-08 10:37:51','d231cf50-b727-11ec-bd9d-f5788c8acbd2',0,0,1,0),(147,200066,'굿\n','2022-04-08 10:41:03','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,1,1),(148,200066,'굿굿','2022-04-08 10:41:08','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,2,0);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forums`
--

DROP TABLE IF EXISTS `forums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forums` (
  `no` int NOT NULL AUTO_INCREMENT,
  `title` varchar(60) NOT NULL,
  `contents` text NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_uuid` char(36) NOT NULL,
  `recommended` int DEFAULT '0',
  `non_recommended` int DEFAULT '0',
  `view_count` int DEFAULT '0',
  PRIMARY KEY (`no`),
  KEY `user_uuid` (`user_uuid`),
  CONSTRAINT `forums_ibfk_4` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`uuid`) ON DELETE CASCADE,
  CONSTRAINT `forums_ibfk_5` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`uuid`) ON DELETE CASCADE,
  CONSTRAINT `forums_ibfk_6` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=200067 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forums`
--

LOCK TABLES `forums` WRITE;
/*!40000 ALTER TABLE `forums` DISABLE KEYS */;
INSERT INTO `forums` VALUES (200063,'이벤트리스너의 콜백함수는 한번만 초기화된다.','<blockquote><p>이벤트리스너의 콜백함수는 한번만 초기화된다.&nbsp;</p><p><a href=\"https://stackoverflow.com/questions/60540985/react-usestate-doesnt-update-in-window-events\">https://stackoverflow.com/questions/60540985/react-usestate-doesnt-update-in-window-events</a></p></blockquote><p>즉, 처음 등록할때 상태 그대로 값이 유지된다.</p><p>이러한 문제를 느낄 수 있는 대표적인 예시가 바로 useState값을 콜백함수에서 사용할때이다.</p><p>&nbsp;아무리 외부에서 수정을 해도 콜백함수에 있는 값은 변하지 않는다.</p><p>이러한 문제를 해결하긴 위해서는 등록한 이벤트리스너를 지우고 새로 만들어서 초기화 시켜줘야한다.</p><p>보통 useEffect를 활용해서 useState값이 변경될때마다 기존에 있던 이벤트리스너를 제거하고 다시 만드는 과정 수행한다.</p><p>&nbsp;</p>','2022-04-07 17:24:08','57508b71-a910-11ec-8e11-5bc6647eb7d5',0,0,17);
/*!40000 ALTER TABLE `forums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uuid` char(36) NOT NULL,
  `password` char(64) NOT NULL,
  `nickname` varchar(24) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` varchar(24) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('57508b71-a910-11ec-8e11-5bc6647eb7d5','ee94523d2d9c5d69412bf8f82dac37bbf4080d1d6aaeea1af4bc4269744af20d','관리자','2022-03-21 12:13:39','mehr3194@gmail.com'),('60505920-b69a-11ec-950f-eb0a58cbaeec','7a3e23323c50cba1bce07a4b006b01456de46eabe755da7301fd41a9d4c6c30b','rwarrr','2022-04-07 17:44:29','rwrwa'),('7f7e9971-b333-11ec-931c-d9cab4e139d9','260e1951c2db73c3235f7746b086646c48bac98cd388c2a0b4dbd48441ec14f8','한원렬','2022-04-03 09:50:30','hwryeol@gmail.com'),('d1462750-b699-11ec-950f-eb0a58cbaeec','7694384c2d409f6b82f9f72ac822edbeb7e37630cc14f6c14e1aa722f2fcb047','rwarawr','2022-04-07 17:40:29','rwarawr'),('d231cf50-b727-11ec-bd9d-f5788c8acbd2','8f68456fc68d0b335dd2a6235d8d6f405ed594142229b0695df5e6592b813988','opopop','2022-04-08 10:36:59','opopopop'),('e0661240-b699-11ec-950f-eb0a58cbaeec','4a4206147e96320e8aedbf5adb5e8ad7a448b7414c5995ac749956b407d54e3a','555342','2022-04-07 17:40:55','4214'),('ecdc7d80-b698-11ec-a4e9-47760046906b','03dac05c1b5569eabb242b70e59c46c3d25d08004444cc06d534a98999d19cda','25252','2022-04-07 17:34:06','5151533'),('f1cae160-a9e6-11ec-a0a4-bd131f800f06','3e9965ccba20971ff57c014749afcf8b56ea01abeb1235f912aeeec8053bb928','qw0728','2022-03-22 13:49:50','qw0728'),('fd467c70-a9e6-11ec-a0a4-bd131f800f06','3e9965ccba20971ff57c014749afcf8b56ea01abeb1235f912aeeec8053bb928','mehr','2022-03-22 13:50:09','mehr0728');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-09  3:55:01
