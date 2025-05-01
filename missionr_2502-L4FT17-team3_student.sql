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
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `school` varchar(100) DEFAULT NULL,
  `profile_pic` varchar(200) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `course` varchar(20) DEFAULT NULL CHECK (`course` in ('Beginner','Intermediate','Advanced')),
  `gender` enum('Male','Female') NOT NULL,
  PRIMARY KEY (`student_id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,34,'Aiden Andrews','aiden@ranuiprimary.school.nz','123','Ranui Primary School','/images/students/AidenAndrews.png','2010-12-31','09-234-5678','BEGINNER','Male'),(2,34,'Alice Kindellan','alice@ranuiprimary.school.nz','456','Ranui Primary School','/images/students/AliceKindellan.png','2011-05-14','09-123-4567','INTERMEDIATE','Female'),(3,34,'Courtney Bristol','courtney@ranuiprimary.school.nz','789','Ranui Primary School','/images/students/CourtneyBristol.png','2012-03-22','09-234-5678','BEGINNER','Female'),(4,34,'Hanu Nepe','hanu@ranuiprimary.school.nz','987','Ranui Primary School','/images/students/HanuNepe.png','2010-11-30','09-345-6789','INTERMEDIATE','Male'),(5,34,'Harry Mcgrath','harry@ranuiprimary.school.nz','876','Ranui Primary School','/images/students/HarryMcGrath.png','2011-08-19','09-456-7890','ADVANCED','Male'),(6,34,'Javier Fuego','javier@ranuiprimary.school.nz','765','Ranui Primary School','/images/students/JavierFuego.png','2012-01-11','09-567-8901','ADVANCED','Male'),(7,34,'Lisa Horan','lisa@ranuiprimary.school.nz','654','Ranui Primary School','/images/students/LisaHoran.png','2010-06-15','09-678-9012','INTERMEDIATE','Female'),(8,34,'Lucia Mendez','lucia@ranuiprimary.school.nz','543','Ranui Primary School','/images/students/LuciaMendez.png','2011-09-05','09-789-0123','INTERMEDIATE','Female'),(9,34,'Mark O\'Leary','mark@ranuiprimary.school.nz','432','Ranui Primary School','/images/students/MarkOLeary.png','2010-07-23','09-890-1234','ADVANCED','Male'),(10,34,'Nagani Cortes','nagani@ranuiprimary.school.nz','321','Ranui Primary School','/images/students/NaganiCortes.png','2011-02-18','09-901-2345','BEGINNER','Female'),(11,34,'Neveah Machenry','neveah@ranuiprimary.school.nz','210','Ranui Primary School','/images/students/NeveahMachenry.png','2011-12-12','09-012-3456','ADVANCED','Female'),(12,34,'Rawiri Fletcher','fletchy.r@gmail.com','012','Homai School','/images/students/RawiriFletcher.png','2010-06-25','022-524-6399','BEGINNER','Male'),(13,34,'Shane O\'Monahan','shane@ranuiprimary.school.nz','013','Ranui Primary School','/images/students/ShaneOMonahan.png','2010-10-10','09-234-5671','INTERMEDIATE','Male'),(14,34,'Simon Laine','simon@ranuiprimary.school.nz','014','Ranui Primary School','/images/students/SimonLaine.png','2011-03-30','09-345-6782','ADVANCED','Male'),(15,34,'Tokio Han','tokio@ranuiprimary.school.nz','015','Ranui Primary School','/images/students/TokioHan.png','2010-09-09','09-456-7893','ADVANCED','Female'),(16,34,'Aiden Andrews','aiden@ranuiprimary.school.nz','123','Ranui Primary School','/images/students/AidenAndrews.png','2010-12-31','09-234-5678','BEGINNER','Male'),(17,34,'Alice Kindellan','alice@ranuiprimary.school.nz','456','Ranui Primary School','/images/students/AliceKindellan.png','2011-05-14','09-123-4567','INTERMEDIATE','Female'),(18,34,'Courtney Bristol','courtney@ranuiprimary.school.nz','789','Ranui Primary School','/images/students/CourtneyBristol.png','2012-03-22','09-234-5678','BEGINNER','Female'),(19,34,'Hanu Nepe','hanu@ranuiprimary.school.nz','987','Ranui Primary School','/images/students/HanuNepe.png','2010-11-30','09-345-6789','INTERMEDIATE','Male'),(20,34,'Harry Mcgrath','harry@ranuiprimary.school.nz','876','Ranui Primary School','/images/students/HarryMcGrath.png','2011-08-19','09-456-7890','ADVANCED','Male'),(21,34,'Javier Fuego','javier@ranuiprimary.school.nz','765','Ranui Primary School','/images/students/JavierFuego.png','2012-01-11','09-567-8901','ADVANCED','Male'),(22,34,'Lisa Horan','lisa@ranuiprimary.school.nz','654','Ranui Primary School','/images/students/LisaHoran.png','2010-06-15','09-678-9012','INTERMEDIATE','Female'),(23,34,'Lucia Mendez','lucia@ranuiprimary.school.nz','543','Ranui Primary School','/images/students/LuciaMendez.png','2011-09-05','09-789-0123','INTERMEDIATE','Female'),(24,34,'Mark O\'Leary','mark@ranuiprimary.school.nz','432','Ranui Primary School','/images/students/MarkOLeary.png','2010-07-23','09-890-1234','ADVANCED','Male'),(25,34,'Nagani Cortes','nagani@ranuiprimary.school.nz','321','Ranui Primary School','/images/students/NaganiCortes.png','2011-02-18','09-901-2345','BEGINNER','Female'),(26,34,'Neveah Machenry','neveah@ranuiprimary.school.nz','210','Ranui Primary School','/images/students/NeveahMachenry.png','2011-12-12','09-012-3456','ADVANCED','Female'),(27,34,'Rawiri Fletcher','fletchy.r@gmail.com','012','Homai School','/images/students/RawiriFletcher.png','2010-06-25','022-524-6399','BEGINNER','Male'),(28,34,'Shane O\'Monahan','shane@ranuiprimary.school.nz','013','Ranui Primary School','/images/students/ShaneOMonahan.png','2010-10-10','09-234-5671','INTERMEDIATE','Male'),(29,34,'Simon Laine','simon@ranuiprimary.school.nz','014','Ranui Primary School','/images/students/SimonLaine.png','2011-03-30','09-345-6782','ADVANCED','Male'),(30,34,'Tokio Han','tokio@ranuiprimary.school.nz','015','Ranui Primary School','/images/students/TokioHan.png','2010-09-09','09-456-7893','ADVANCED','Female'),(31,34,'Aiden Andrews','aiden@ranuiprimary.school.nz','123','Ranui Primary School','/images/students/AidenAndrews.png','2010-12-31','09-234-5678','BEGINNER','Male'),(32,34,'Alice Kindellan','alice@ranuiprimary.school.nz','456','Ranui Primary School','/images/students/AliceKindellan.png','2011-05-14','09-123-4567','INTERMEDIATE','Female'),(33,34,'Courtney Bristol','courtney@ranuiprimary.school.nz','789','Ranui Primary School','/images/students/CourtneyBristol.png','2012-03-22','09-234-5678','BEGINNER','Female'),(34,34,'Hanu Nepe','hanu@ranuiprimary.school.nz','987','Ranui Primary School','/images/students/HanuNepe.png','2010-11-30','09-345-6789','INTERMEDIATE','Male'),(35,34,'Harry Mcgrath','harry@ranuiprimary.school.nz','876','Ranui Primary School','/images/students/HarryMcGrath.png','2011-08-19','09-456-7890','ADVANCED','Male'),(36,34,'Javier Fuego','javier@ranuiprimary.school.nz','765','Ranui Primary School','/images/students/JavierFuego.png','2012-01-11','09-567-8901','ADVANCED','Male'),(37,34,'Lisa Horan','lisa@ranuiprimary.school.nz','654','Ranui Primary School','/images/students/LisaHoran.png','2010-06-15','09-678-9012','INTERMEDIATE','Female'),(38,34,'Lucia Mendez','lucia@ranuiprimary.school.nz','543','Ranui Primary School','/images/students/LuciaMendez.png','2011-09-05','09-789-0123','INTERMEDIATE','Female'),(39,34,'Mark O\'Leary','mark@ranuiprimary.school.nz','432','Ranui Primary School','/images/students/MarkOLeary.png','2010-07-23','09-890-1234','ADVANCED','Male'),(40,34,'Nagani Cortes','nagani@ranuiprimary.school.nz','321','Ranui Primary School','/images/students/NaganiCortes.png','2011-02-18','09-901-2345','BEGINNER','Female'),(41,34,'Neveah Machenry','neveah@ranuiprimary.school.nz','210','Ranui Primary School','/images/students/NeveahMachenry.png','2011-12-12','09-012-3456','ADVANCED','Female'),(42,34,'Rawiri Fletcher','fletchy.r@gmail.com','012','Homai School','/images/students/RawiriFletcher.png','2010-06-25','022-524-6399','BEGINNER','Male'),(43,34,'Shane O\'Monahan','shane@ranuiprimary.school.nz','013','Ranui Primary School','/images/students/ShaneOMonahan.png','2010-10-10','09-234-5671','INTERMEDIATE','Male'),(44,34,'Simon Laine','simon@ranuiprimary.school.nz','014','Ranui Primary School','/images/students/SimonLaine.png','2011-03-30','09-345-6782','ADVANCED','Male'),(45,34,'Tokio Han','tokio@ranuiprimary.school.nz','015','Ranui Primary School','/images/students/TokioHan.png','2010-09-09','09-456-7893','ADVANCED','Female'),(46,34,'Neveah Machenry','neveah@ranuiprimary.school.nz','210','Ranui Primary School','/images/students/NeveahMachenry.png','2011-12-12','09-012-3456','ADVANCED','Female'),(47,34,'Neveah Machenry','neveah@ranuiprimary.school.nz','210','Ranui Primary School','/images/students/NeveahMachenry.png','2011-12-12','09-012-3456','ADVANCED','Female'),(48,NULL,'test','test@test.com','test123',NULL,NULL,NULL,NULL,NULL,'Male'),(49,NULL,'','','',NULL,NULL,NULL,NULL,NULL,'Male');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-01 14:32:52
