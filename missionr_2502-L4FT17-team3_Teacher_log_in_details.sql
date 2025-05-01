-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: cp16.hooplahosting.co.nz    Database: missionr_2502-L4FT17-team3
-- ------------------------------------------------------
-- Server version	5.5.5-10.6.21-MariaDB-cll-lve

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
-- Table structure for table `Teacher_log_in_details`
--

DROP TABLE IF EXISTS `Teacher_log_in_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Teacher_log_in_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(25) NOT NULL,
  `Email` varchar(75) NOT NULL,
  `Password` varchar(75) NOT NULL,
  `ConfirmPassword` varchar(75) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teacher_log_in_details`
--

LOCK TABLES `Teacher_log_in_details` WRITE;
/*!40000 ALTER TABLE `Teacher_log_in_details` DISABLE KEYS */;
INSERT INTO `Teacher_log_in_details` VALUES (1,'Jasmina Salvador','jsalvador@hotmail.edu','jasminasalvador','jasminasalvador'),(2,'John Doe','john@example.com','johndoe','johndoe'),(3,'shazia','shazia@gmail','abc','abc'),(4,'paul','paulteacher@example.com','paulteacher','paulteacher'),(5,'paul','paurlteacher@example.com','paulteacher','paulteacher'),(6,'paul','paurlteacher@example.com','paulteacher','paulteacher'),(7,'paul','paurlteacher@example.com','paulteacher','paulteacher'),(8,'paul','paurlteacher@example.com','paulteacher','paulteacher'),(9,'Teacher','teacher@gmail.com','teacher','teacher');
/*!40000 ALTER TABLE `Teacher_log_in_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-01 14:32:49
