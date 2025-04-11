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
-- Table structure for table `help_request`
--

DROP TABLE IF EXISTS `help_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `help_request` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `done` tinyint(4) DEFAULT 0,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`request_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `help_request_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `help_request`
--

LOCK TABLES `help_request` WRITE;
/*!40000 ALTER TABLE `help_request` DISABLE KEYS */;
INSERT INTO `help_request` VALUES (1,1,'2025-04-11 00:00:00',0,'2025-04-16 00:00:00'),(2,2,'2025-04-11 00:00:00',0,'2025-04-16 00:00:00'),(3,3,'2025-04-11 00:00:00',0,'2025-04-16 00:00:00'),(4,4,'2025-04-12 00:00:00',0,'2025-04-16 00:00:00'),(5,5,'2025-04-13 00:00:00',0,'2025-04-16 00:00:00'),(6,6,'2025-04-12 00:00:00',0,'2025-04-16 00:00:00'),(7,7,'2025-04-13 00:00:00',0,'2025-04-16 00:00:00'),(8,8,'2025-04-15 00:00:00',0,'2025-04-16 00:00:00'),(9,9,'2025-04-14 00:00:00',0,'2025-04-16 00:00:00'),(10,10,'2025-04-13 00:00:00',0,'2025-04-16 00:00:00'),(11,11,'2025-04-12 00:00:00',0,'2025-04-16 00:00:00'),(12,12,'2025-04-11 00:00:00',0,'2025-04-16 00:00:00'),(13,13,'2025-04-12 00:00:00',0,'2025-04-16 00:00:00'),(14,14,'2025-04-11 00:00:00',0,'2025-04-16 00:00:00'),(15,15,'2025-04-13 00:00:00',0,'2025-04-16 00:00:00');
/*!40000 ALTER TABLE `help_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-11 15:34:55
