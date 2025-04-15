-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: trainerpro
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `message_text` text NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,2,2,'Hi Andrew, I am looking to work with you and lose weight through your workout plans '),(2,2,2,'Hi Andrew, I am looking to work with you and lose weight through your workout plans '),(3,2,1,'hello there!'),(4,2,2,'Hi Andrew!'),(5,2,1,'whats up dude'),(6,2,1,'Hello Gavin, I would like to train with you'),(7,10,1,'Whats up, I want to train with you for sure man '),(8,2,1,'etbwr'),(9,2,1,'werq2ef'),(10,2,1,'wefq'),(11,2,1,'wegfqef'),(12,2,1,'ijerci22'),(13,2,1,'jcich2'),(14,2,2,'Hi, Id like to work with you!'),(15,2,1,'helllo'),(16,2,1,'Hello There '),(17,2,2,'Hello'),(18,2,1,'whats up'),(19,2,1,'hello'),(20,2,1,'yo'),(21,2,2,'rn4t4'),(22,2,1,'wHATS UP'),(23,2,2,'Hey Dude'),(24,2,1,'Hey Im Interested in training with you!'),(25,3,1,'Hi, I would love to work with you.'),(26,2,1,'hi'),(27,2,1,'another test...'),(28,2,1,'Whats up Man, Looking forward to working with you'),(29,2,3,'Hi, I want to work with you. '),(30,10,1,'4fv24v34v24'),(31,1,2,'Hey man, I would love to work with you'),(32,1,3,'Hi, get back to me asap and assign me as a trainer, looking forward to hearing from you'),(33,10,1,'3f24g14gv1'),(34,10,1,'24g2g'),(35,1,3,'Any Update yet?\\');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-15 13:58:19
