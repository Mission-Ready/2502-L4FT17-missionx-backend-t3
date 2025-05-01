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
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `project_pic` varchar(200) DEFAULT NULL,
  `learning_objective` mediumtext DEFAULT NULL,
  `instructions` mediumtext DEFAULT NULL,
  `video` varchar(200) DEFAULT NULL,
  `activity_type` varchar(20) DEFAULT NULL CHECK (`activity_type` in ('animation','game','chatbot','augmented reality')),
  `year_level` int(11) DEFAULT NULL CHECK (`year_level` between 1 and 13),
  `course` varchar(20) DEFAULT NULL CHECK (`course` in ('Beginner','Intermediate','Advanced')),
  `subscription` varchar(20) DEFAULT 'Free' CHECK (`subscription` in ('Free','Premium')),
  `subject_matter` varchar(20) DEFAULT NULL CHECK (`subject_matter` in ('computer science','maths','language','art','music')),
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'Introduction','/images/projects/Project01.png','The learning objective for this session is <strong>conditional statements</strong> including <strong>if…then</strong>.','<h2>Step 1</h2> <p>Create a new <strong>variable</strong>. Here is a screenshot: <img src=\"https://levels.levelupworks.com/img/9845843.jpg\"></p>','https://www.youtube.com/watch?v=21j_OCNLuYg','Animation',4,'BEGINNER','Free','Computer Science','2025-04-10 01:14:08','2025-04-10 01:14:08'),(2,'My Birthday','/images/projects/Project02.png','The learning objective is to understand <strong>user interaction</strong> and events.','<h2>Step 1</h2> <p>Set up your birthday celebration scene.</p>','https://www.youtube.com/watch?v=dQw4w9WgXcQ','Animation',5,'ADVANCED','Premium','Computer Science','2025-04-10 01:14:08','2025-04-28 07:22:07'),(3,'10 Block Challenge','/images/projects/Project03.png','Learn how to create challenges using <strong>programming blocks</strong>.','<h2>Step 1</h2> <p>Start your first block challenge.</p>','https://www.youtube.com/watch?v=3JZ_D3ELwOQ','Animation',3,'INTERMEDIATE','Free','Computer Science','2025-04-10 01:14:08','2025-04-28 07:22:07'),(4,'Build a Band','/images/projects/Project04.png','Understand the basics of <strong>music composition</strong> and teamwork.','<h2>Step 1</h2> <p>Create your band members.</p>','https://www.youtube.com/watch?v=7oP5c7Yv9C4','Animation',2,'INTERMEDIATE','Free','Computer Science','2025-04-10 01:14:08','2025-04-28 07:22:07'),(5,'The Bear and the Monkey','/images/projects/Project05.png','Create a story using <strong>animation techniques</strong>.','<h2>Step 1</h2> <p>Write the script for your story.</p>','https://www.youtube.com/watch?v=0S5M5s2W5A0','Animation',1,'BEGINNER','Premium','Computer Science','2025-04-10 01:14:08','2025-04-28 07:22:07'),(6,'Debugging','/images/projects/Project06.png','Learn debugging techniques in programming.','<h2>Step 1</h2> <p>Identify and fix errors in your code.</p>','https://www.youtube.com/watch?v=2yP5y6k5D5M','Animation',6,'ADVANCED','Free','Language','2025-04-10 01:14:08','2025-04-28 07:22:07'),(7,'About Me','/images/projects/Project07.png','Create an interactive project about yourself.','<h2>Step 1</h2> <p>Gather information and images.</p>','https://www.youtube.com/watch?v=1R1O7J7A2yI','Game',4,'INTERMEDIATE','Free','Music','2025-04-10 01:14:08','2025-04-28 07:22:07'),(8,'I Am Here!','/images/projects/Project08.png','Build a project that showcases your location.','<h2>Step 1</h2> <p>Use maps and location data.</p>','https://www.youtube.com/watch?v=0t9Y8u9XnA4','Augmented Reality',5,'BEGINNER','Free','Computer Science','2025-04-10 01:14:08','2025-04-28 07:22:07'),(9,'Funny Faces','/images/projects/Project09.png','Create a fun animation using facial expressions.','<h2>Step 1</h2> <p>Design your character\'s face.</p>','https://www.youtube.com/watch?v=8E1J7Q9J5W8','Augmented Reality',7,'INTERMEDIATE','Premium','Maths','2025-04-10 01:14:08','2025-04-28 07:22:07'),(10,'It Tickles!','/images/projects/Project10.png','Explore sensations and reactions through animation.','<h2>Step 1</h2> <p>Create a scene that makes people laugh.</p>','https://www.youtube.com/watch?v=Hk8B1u6u8r0','Game',2,'BEGINNER','Free','Computer Science','2025-04-10 01:14:08','2025-04-28 07:22:07'),(11,'Penguin in a Desert','/images/projects/Project11.png','Create a story about a penguin in an unusual setting.','<h2>Step 1</h2> <p>Write your story outline.</p>','https://www.youtube.com/watch?v=UQ9CkF6IYhY','Animation',8,'INTERMEDIATE','Free','Language','2025-04-10 01:14:08','2025-04-28 07:22:07'),(12,'Time Travel','/images/projects/Project12.png','Develop a project that explores the concept of time travel.','<h2>Step 1</h2> <p>Research time travel theories.</p>','https://www.youtube.com/watch?v=0g5C8F5O9F4','Chatbot',8,'ADVANCED','Premium','Computer Science','2025-04-10 01:14:08','2025-04-28 07:22:07'),(13,'Birthday Card','/images/projects/Project13.png','Design a creative birthday card using digital tools.','<h2>Step 1</h2> <p>Gather images and messages for your card.</p>','https://www.youtube.com/watch?v=Y5J5f5E8L7g','Animation',5,'BEGINNER','Free','Art','2025-04-10 01:14:08','2025-04-28 07:22:07'),(14,'The Lion and the Mouse Part 1','/images/projects/Project14.png','Create an animated version of the classic fable.','<h2>Step 1</h2> <p>Write the script for your animation.</p>','https://www.youtube.com/watch?v=6oP5C6M2Z6g','Chatbot',4,'BEGINNER','Free','Computer Science','2025-04-10 01:14:08','2025-04-28 07:22:07'),(15,'The Lion and the Mouse Part 2','/images/projects/Project15.png','Continue the story of the lion and the mouse.','<h2>Step 1</h2> <p>Plan the continuation of the story.</p>','https://www.youtube.com/watch?v=9J7D1D5F7x0','Animation',9,'BEGINNER','Premium','Computer Science','2025-04-10 01:14:08','2025-04-28 07:22:07');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-01 14:32:50
