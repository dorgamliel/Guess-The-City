-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: around_the_world
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `cities_played_by_players`
--

DROP TABLE IF EXISTS `cities_played_by_players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities_played_by_players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `player_name` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `iso` varchar(2) DEFAULT NULL,
  `success` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=470 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities_played_by_players`
--

LOCK TABLES `cities_played_by_players` WRITE;
/*!40000 ALTER TABLE `cities_played_by_players` DISABLE KEYS */;
INSERT INTO `cities_played_by_players` VALUES (320,'azbim','San Juan$Pueblo','HN',0),(321,'azbim','Tegucigalpa','HN',0),(322,'azbim','La Lima','HN',0),(404,'vcc','Yad Binyamin','IL',0),(405,'vcc','Nordiyya','IL',0),(406,'aa','Kiryat Tivon','IL',1),(407,'aa','Gezer','IL',1),(408,'av','Eilat','IL',1),(427,'dor','Hever','IL',1),(428,'dor','Yahel','IL',1),(429,'dor','Ibtin','IL',1),(430,'dor','Lavi','IL',1),(431,'dor','Brosh','IL',1),(432,'dor','Kfar Tavor','IL',1),(433,'dor','Hagor','IL',1),(434,'dor','Shfeyah','IL',1),(435,'dor','Yair','IL',1),(436,'dor','Rishon LeZiyyon','IL',1),(437,'dor','Or %60Aqiba','IL',1),(438,'dor','Karkur','IL',0),(439,'asdf','Saray','AZ',0),(440,'asdf','Bank','AZ',0),(441,'asdf','Binagadi','AZ',0),(467,'dfg','Dushanbe','TJ',1),(468,'margiz','Port Mathurin','MU',0),(469,'dfgh','Kajansi','UG',0);
/*!40000 ALTER TABLE `cities_played_by_players` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-29 15:49:49
