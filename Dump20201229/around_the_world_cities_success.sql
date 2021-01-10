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
-- Table structure for table `cities_success`
--

DROP TABLE IF EXISTS `cities_success`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities_success` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(45) DEFAULT NULL,
  `num_games` int DEFAULT NULL,
  `num_success` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=860 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities_success`
--

LOCK TABLES `cities_success` WRITE;
/*!40000 ALTER TABLE `cities_success` DISABLE KEYS */;
INSERT INTO `cities_success` VALUES (425,'San Juan$Pueblo',14,0),(426,'Tegucigalpa',14,0),(427,'La Lima',14,0),(431,'Chupa',1,0),(432,'Sura',1,0),(433,'Dubki',1,0),(438,'Santa Rita',1,0),(439,'Hohenau',1,0),(440,'Paraguay',1,1),(441,'Hernandarias',1,0),(445,'Granton',1,0),(446,'Mokhovaya',1,0),(447,'Bogdanov',1,0),(448,'La Serena',1,1),(449,'Caldera',1,1),(450,'El Salto$Chico',1,0),(451,'Las Lomas',1,1),(452,'La Guaira',1,1),(453,'La Escasez',1,0),(454,'Huesca',1,1),(455,'Kastel Stari',1,0),(456,'Beli Manastir',1,0),(457,'Snillfjord',1,1),(458,'Folldal',1,1),(459,'Gard',1,1),(460,'La Trinidad',1,0),(461,'Nagarote',1,1),(462,'San Juan$Del$Sur',1,0),(463,'Plescherken',1,0),(464,'Flamberg',1,0),(465,'Sichart',1,1),(466,'Parzham',2,0),(477,'Carmel',1,1),(478,'Mazkeret Batya',1,0),(479,'Ramat Yishay',1,1),(480,'Ramat Aviv',1,0),(481,'Kefar Weradim',1,1),(482,'Masua',2,1),(491,'Qiryat Motzkin',4,4),(492,'Talme El%60azar',4,4),(493,'Mashad',3,3),(494,'Dalia',3,3),(495,'Yavne',3,3),(496,'Ganne Tiqwa',3,3),(497,'Tira',4,3),(498,'Ashdod',3,0),(499,'Aba Hillel',5,5),(500,'Ramah',3,0),(501,'Nordiyya',10,3),(502,'Reshafim',3,3),(503,'Hazav',1,1),(504,'Sakhnin',1,1),(505,'Porat',1,1),(506,'Rumat Heib',1,1),(507,'Eitan',1,1),(508,'Sederot',1,1),(509,'Rishon Le$Zion',1,1),(510,'Hakirya',1,1),(511,'Hadera',1,1),(512,'Lotem',1,1),(513,'Shefer',1,1),(514,'Jaljulye',1,1),(515,'Yamin',1,1),(516,'Pardesiyya',1,1),(517,'Shahar',1,1),(518,'Ranen',1,1),(519,'Kabul',1,1),(520,'Kafar Qasem',1,1),(521,'Natanya',2,2),(522,'Tamra',1,1),(523,'Qiryat Ono',1,1),(524,'Rosh Pinna',1,1),(525,'Bet Yizhaq',1,1),(526,'Ramle',1,1),(527,'Qiryat Gat',2,0),(528,'Habonim',1,0),(567,'Hadasim',1,1),(568,'Mazor',1,0),(569,'Yad Binyamin',8,0),(598,'Kiryat Tivon',7,7),(599,'Gezer',7,7),(602,'Regavim',1,1),(603,'Revaya',1,0),(604,'Rehovot',1,0),(605,'Yafo',1,0),(620,'Eilat',8,8),(622,'Ibtin',8,8),(623,'Reine',2,2),(624,'Bareket',2,2),(625,'Mahanayim',2,2),(626,'Mefalsim',2,2),(627,'Avigdor',2,2),(628,'Holon',2,2),(629,'Herut',2,2),(630,'Salim',2,2),(631,'HaOn',2,2),(632,'Karkur',8,2),(633,'Hever',6,6),(634,'Yahel',6,6),(635,'Lavi',6,6),(636,'Brosh',6,6),(637,'Kfar Tavor',6,6),(638,'Hagor',6,6),(639,'Shfeyah',6,6),(640,'Yair',6,6),(641,'Rishon LeZiyyon',6,6),(642,'Or %60Aqiba',6,6),(643,'Saray',6,0),(644,'Bank',6,0),(645,'Binagadi',6,0),(709,'Gibraltar',3,0),(762,'Gia Lai',1,0),(763,'Xam Kho',1,0),(764,'Binh Duong',1,0),(793,'Grenada',1,0),(794,'Mount Moritz Land Settlement',1,0),(795,'Bocaue',1,0),(796,'Croix',1,1),(797,'Rwanda',1,0),(798,'Congo, The Democratic Republic of the',1,0),(799,'Palestinian Territory, Occupied',4,1),(824,'Hamilton',4,1),(855,'Weliwita',1,0),(856,'Kaduwela',1,0),(857,'Slave Island',1,1),(858,'Kotmale',1,1),(859,'Kottawa',1,0);
/*!40000 ALTER TABLE `cities_success` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-29 15:49:51
