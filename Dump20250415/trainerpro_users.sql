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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `registertype` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'gavporter14@gmail.com','$2b$12$sAtV9jFi.bAMAmjQQQgPAO38CphBIag/O1RjG2qqoFCAvqLeR6LGi','trainer'),(2,'J02299480@jwu.edu','$2b$12$P2C3mP3AOIWAIvoi6.tvyerxI2ahm18jzMZ9YdLJjHMDRIjLs5Kvq','client'),(3,'lbporter3@sbcglobal.net','$2b$12$/IeeTHNo/1lYvTbbInQN0uTwO1gvllLz5u6iigJnGmmXXlaza6fUa','client'),(4,'test@hotmail.com','$2b$12$BCQV0fQCQBBa9T1w1COGB.m0XIw/Wb4TDixC.aGdpGqBKz2QT.L/K','client'),(5,'tester@mail.com','$2b$12$H60PqjYoRAcyzx.jnzM1leRgzf87a.kbDHVhHIOJqMaqg/gVuwsv6','trainer'),(6,'newemail@gmail.com','$2b$12$xtGQ8eU303hvy5KcbpZpQ.Z.iGtKh2X5BOjffHXETGUxfh4d2rblO','trainer'),(7,'Sirrpopps@gmail.com','$2b$12$IXS9aQRgb2VZim4Md2eo2e4msz4i7Qb5fKBCyS7VsQqgGRxJyd1Wu','client'),(8,'wcwrv2@gmail.com','$2b$12$GO1xwsDJRYCsKS4xC4QKke.OfvoURDKbVfCPRCzcGHmKrfOqDsFtC','client'),(9,'trainer@gmail.com','$2b$12$0vqPP0T.0aU5JM6aiH4MnOuhzW3My47iR3W7CKOGP75PrjcCkGulW','trainer'),(10,'e@gmail.com','$2b$12$ogsXvy9jvSWPloKl/zdmd.mmxRNH/zf3Q.AzZQM.Oe2l/IuLopzMi','client'),(11,'testemail@gmail.com','$2b$12$WfssvV3XKobH/6X0yb9a0.S1rQjhFF4jrXd3bCvf5VKUyjElH5/XG','client');
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

-- Dump completed on 2025-04-15 13:58:19
