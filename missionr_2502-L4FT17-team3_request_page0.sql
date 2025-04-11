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
-- Table structure for table `request_page`
--

DROP TABLE IF EXISTS `request_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_page` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `img` varchar(100) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `checked` tinyint(4) NOT NULL,
  `date` date DEFAULT NULL,
  `time` varchar(45) NOT NULL,
  PRIMARY KEY (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_page`
--

LOCK TABLES `request_page` WRITE;
/*!40000 ALTER TABLE `request_page` DISABLE KEYS */;
INSERT INTO `request_page` VALUES (1,1,'Aiden','AidenAndrews.png','male',0,'2020-04-28','10:43 AM'),(2,2,'Rawiri','RawiriFletcher.png','male',0,'2020-04-28','9:52 AM'),(3,3,'Neveah','NeveahMachenry.png','female',0,'2020-04-27','4:59 PM'),(4,4,'Javier','JavierFuego.png','male',0,'2020-04-27','4:59 PM'),(5,5,'Tokio','TokioHan.png','female',0,'2020-04-27','11:23 AM'),(6,6,'Alice','AliceKindellan.png','female',0,'2020-04-28','11:43 AM'),(7,7,'Courtney','CourtneyBristol.png','female',0,'2020-04-28','12:43 PM'),(8,8,'Hanu','HanuNepe.png','male',0,'2020-04-28','9:43 AM'),(9,9,'Harry','HarryMcGrath.png','male',0,'2020-04-28','8:43 AM'),(10,10,'Lisa','LisaHoran.png','female',0,'2020-05-01','11:43 AM'),(11,11,'Lucia','LuciaMendez.png','female',0,'2020-04-30','9:43 AM'),(12,12,'Mark','MarkOLeary.png','male',0,'2020-04-28','12:43 PM'),(13,13,'Nagani','NaganiCortes.png','female',0,'2020-05-01','11:43 AM'),(14,14,'Shane','ShaneOMonahan.png','male',0,'2020-04-28','9:20 AM'),(15,15,'Simon','SimonLaine.png','male',0,'2020-04-28','11:00 AM');
/*!40000 ALTER TABLE `request_page` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-11 15:34:56
