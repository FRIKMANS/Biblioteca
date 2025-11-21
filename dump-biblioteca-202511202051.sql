-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: huitzilapps.com    Database: biblioteca
-- ------------------------------------------------------
-- Server version	8.0.44-0ubuntu0.24.04.1

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
-- Table structure for table `certificados`
--

DROP TABLE IF EXISTS `certificados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificados` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DonacionID` int NOT NULL,
  `GeneradoPor` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `FechaGenerado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `DonacionID` (`DonacionID`),
  CONSTRAINT `certificados_ibfk_1` FOREIGN KEY (`DonacionID`) REFERENCES `donaciones` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificados`
--

LOCK TABLES `certificados` WRITE;
/*!40000 ALTER TABLE `certificados` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donaciones`
--

DROP TABLE IF EXISTS `donaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donaciones` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DonanteNombre` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `DonanteEmail` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tipo` enum('Libro','Pelicula') COLLATE utf8mb4_general_ci NOT NULL,
  `Titulo` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `AutorDirector` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Cantidad` int NOT NULL DEFAULT '1',
  `CreadoPor` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donaciones`
--

LOCK TABLES `donaciones` WRITE;
/*!40000 ALTER TABLE `donaciones` DISABLE KEYS */;
INSERT INTO `donaciones` VALUES (1,'Diego Reyes','diego@example.com','Pelicula','El laberinto del fauno','Guillermo del Toro',2,'Sistema','2025-10-28 01:11:58'),(2,'TingLing','tingling@tingling.com','Libro','Las aventuras de TingLing 3','TingLing',10,'Sistema','2025-10-28 01:16:37'),(3,'TingLing','tingling@tingling.com','Libro','Las aventuras de TingLing 3','TingLing',10,'Sistema','2025-10-28 01:16:54'),(4,'Diego Reyes','diego@example.com','Libro','Cien años de soledad','Gabriel García Márquez',2,'Sistema','2025-10-28 01:27:50'),(6,'Diego Reyes','diego@example.com','Libro','El Principito','Antoine de Saint-Exupéry',3,'sistema','2025-10-28 01:41:22'),(7,'Diego Reyes','diego@example.com','Libro','El Principito','Antoine de Saint-Exupéry',3,'sistema','2025-10-28 01:46:18'),(8,'Diego','diego@correo.com','Libro','1984','Orwell',1,'sistema','2025-10-28 01:54:24'),(9,'TingLing','tingling@tingling.com','Libro','Las aventuras de TingLing 3','TingLing',10,'sistema','2025-10-28 02:08:38'),(10,'TingLing','','Pelicula','Las aventuras de TingLing 2','TingLing',1,'sistema','2025-10-28 18:25:22');
/*!40000 ALTER TABLE `donaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rol` enum('admin','empleado','consulta') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'empleado',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `refresh_token_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refresh_token_expiry` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (1,'admin','Administrador','$2y$10$t.1c8C1phhLglDpTCCvJSe8D3QurQSCrj7a47G1l62AvBG6wxloLS','admin','2025-10-22 16:49:07','$2y$10$LLkgKNEozdn5SXqRPjbzHuADRxi2BvnSw37nU.ITZYcGv28ISjP5K','2025-10-30 22:04:44'),(2,'Diego','Administrador','$2y$10$7EHUdR7MhuM3VAT4oP2lQe./0/HNV8uhN6aKkB1yz9W0ZjZ8XIqFm','admin','2025-10-23 14:38:47','$2y$10$G4t7cVcwbmq7zwWwB.oqmOK0EbvP9h42bb2Lu8TorIesAAowI.WM2','2025-11-28 01:08:00'),(3,'Pepe','Pepe Pepin Pepito','$2y$10$nX8QWUodhypzZYdw0Qr9tOT6deqCSip6SeerMXKtYNSFhIuAz.uIa','empleado','2025-10-30 08:52:47',NULL,NULL);
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libros`
--

DROP TABLE IF EXISTS `libros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libros` (
  `ISBN` bigint NOT NULL,
  `Nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Autor` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'Anónimo',
  `Editorial` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Edicion` varchar(50) COLLATE utf8mb4_general_ci DEFAULT 'Primera',
  `Num_Pags` int DEFAULT NULL,
  `Fecha_publicacion` datetime DEFAULT NULL,
  `Disponible` tinyint(1) DEFAULT '1',
  `Categoria` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros`
--

LOCK TABLES `libros` WRITE;
/*!40000 ALTER TABLE `libros` DISABLE KEYS */;
INSERT INTO `libros` VALUES (1303692788,'Las aventuras de TingLing 3','TingLing','Adventure','1ra',351,'2025-11-01 00:00:00',10,'Aventura'),(3285257121,'Las aventuras de TingLing 3','TingLing','Adventure','1ra',351,'2025-11-01 00:00:00',10,'Aventura'),(4769891848,'Las aventuras de TingLing','TingLing','Adventure','1ra',358,'2025-01-01 00:00:00',10,'Aventura'),(5271440583,'Las aventuras de TingLing 3','TingLing','Adventure','1ra',351,'2025-11-01 00:00:00',10,'Aventura'),(5383697932,'Las aventuras de TingLing 3','TingLing','Adventure','1ra',156,NULL,10,'Aventura'),(8293163381,'Las aventuras de TingLing 3','TingLing','Adventure','1ra',351,'2025-11-01 00:00:00',10,'Aventura'),(9654853848,'Las aventuras de TingLing 3','TingLing','Adventure','1ra',351,'2025-11-01 00:00:00',10,'Aventura'),(9665451774,'Las aventuras de TingLing 3','TingLing','Adventure','1ra',156,NULL,10,'Aventura'),(9780096592,'Las aventuras de TingLing 3','TingLing','Adventure','1ra',158,'2025-10-01 00:00:00',10,'Aventura'),(1234567890123,'Diseño emocional','Ana López','UXPress','Tercera',180,'2020-08-15 00:00:00',0,'Diseño'),(2131918752565,'Las aventuras de TingLing 2','TingLing','Adventure','1ra',456,'2025-07-01 00:00:00',10,'Aventura'),(9780000000001,'El libro de los errores','Anónimo','Editorial Sur','Primera',180,'2018-06-06 00:00:00',0,'Ficción'),(9780000000002,'Diseño sin límites','Lucía Herrera','ArteVivo','Segunda',260,'2020-01-01 00:00:00',1,'Diseño'),(9780000000003,'CSS avanzado','Reyes','CodeLab','Cuarta',400,'2022-07-07 00:00:00',1,'Frontend'),(9780000000004,'Historias cortas','Anónimo','Editorial Norte','Primera',120,'2017-12-12 00:00:00',1,'Narrativa'),(9780000000005,'React Hooks','Reyes','DevBooks','Primera',350,'2023-05-05 00:00:00',1,'Programación'),(9780000000006,'Diseño de interfaces','Reyes','UXPress','Segunda',280,'2021-09-09 00:00:00',1,'Diseño UX'),(9780000000007,'La paleta perfecta','Anónimo','ArteVivo','Primera',170,'2020-02-02 00:00:00',1,'Arte'),(9780000000008,'Frontend moderno','Reyes','WebStyle','Tercera',410,'2022-11-11 00:00:00',1,'Frontend'),(9780000000009,'El código limpio','Juan Pérez','TechBooks','Primera',330,'2021-06-06 00:00:00',1,'Programación'),(9780000000010,'Diseño accesible','Anónimo','UXPress','Segunda',240,'2020-04-04 00:00:00',1,'Diseño UX'),(9780000000011,'Historias de color','Reyes','ArteVivo','Primera',190,'2023-08-08 00:00:00',1,'Arte'),(9780000000012,'CSS Grid y Flexbox','Reyes','WebStyle','Cuarta',360,'2022-10-10 00:00:00',1,'Frontend'),(9780000000013,'Narrativa visual','Anónimo','Editorial Norte','Primera',210,'2019-03-03 00:00:00',0,'Narrativa'),(9780000000014,'React y Redux','Reyes','CodeLab','Segunda',470,'2023-01-01 00:00:00',1,'Programación'),(9780000000015,'Diseño iterativo','Reyes','UXPress','Primera',230,'2021-07-07 00:00:00',1,'Diseño UX'),(9780000000016,'El arte de animar','Reyes','ArteVivo','Segunda',200,'2020-05-05 00:00:00',1,'Arte'),(9780000000017,'Frontend elegante','Reyes','WebStyle','Tercera',390,'2022-09-09 00:00:00',1,'Frontend'),(9780000000018,'Código y poesía','Anónimo','Editorial Sur','Primera',160,'2018-08-08 00:00:00',0,'Ficción'),(9780000000019,'Diseño emocional','Reyes','UXPress','Cuarta',310,'2021-03-03 00:00:00',1,'Diseño UX'),(9780000000020,'CSS para artistas','Reyes','ArteVivo','Primera',180,'2020-06-06 00:00:00',1,'Arte'),(9780000000021,'React dinámico','Reyes','CodeLab','Segunda',420,'2023-04-04 00:00:00',1,'Programación'),(9780000000022,'Diseño y color','Reyes','UXPress','Primera',250,'2021-10-10 00:00:00',1,'Diseño UX'),(9780000000023,'Frontend fluido','Reyes','WebStyle','Cuarta',370,'2022-12-12 00:00:00',1,'Frontend'),(9780000000024,'Narrativa digital','Anónimo','Editorial Norte','Primera',200,'2019-05-05 00:00:00',0,'Narrativa'),(9780000000025,'React y animaciones','Reyes','CodeLab','Segunda',460,'2023-06-06 00:00:00',1,'Programación'),(9780000000026,'Diseño con propósito','Reyes','UXPress','Primera',270,'2021-11-11 00:00:00',1,'Diseño UX'),(9781111111111,'CSS Zen Garden','Sofía Vargas','WebStyle','Cuarta',150,'2018-03-12 00:00:00',1,'Diseño Web'),(9781234567890,'El arte del código','Luis Ramírez','TechBooks','Primera',320,'2021-05-10 00:00:00',1,'Tecnología'),(9782222222222,'Historias del viento','Anónimo','Editorial Norte','Primera',200,'2017-07-30 00:00:00',0,'Narrativa'),(9783333333333,'La mente creativa','Jorge Castillo','IdeasLibros','Segunda',275,'2021-02-18 00:00:00',1,'Psicología'),(9784444444444,'JavaScript profundo','Elena Ríos','DevBooks','Primera',500,'2023-06-01 00:00:00',1,'Programación'),(9785555555555,'Colores que hablan','Anónimo','ArteVivo','Primera',160,'2020-09-09 00:00:00',1,'Arte'),(9786666666666,'UX para humanos','Miguel Ángel','UXPress','Segunda',190,'2022-12-12 00:00:00',1,'Diseño UX'),(9787777777777,'El algoritmo perdido','Laura Jiménez','TechBooks','Primera',300,'2021-04-04 00:00:00',0,'Thriller'),(9788888888888,'Mapas mentales','Fernando Ruiz','IdeasLibros','Tercera',220,'2019-10-10 00:00:00',1,'Educación'),(9789876543210,'Caminos invisibles','María Torres','Editorial Sur','Segunda',210,'2019-11-23 00:00:00',1,'Ficción'),(9789999999999,'Animaciones con CSS','Reyes','WebStyle','Primera',140,'2023-03-03 00:00:00',1,'Frontend'),(9876543210987,'React en acción','Carlos Méndez','CodeLab','Primera',450,'2022-01-05 00:00:00',1,'Programación');
/*!40000 ALTER TABLE `libros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculas`
--

DROP TABLE IF EXISTS `peliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peliculas` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Director` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'Desconocido',
  `Productora` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Genero` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Clasificacion` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Duracion` int DEFAULT NULL,
  `Fecha_estreno` datetime DEFAULT NULL,
  `Disponible` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculas`
--

LOCK TABLES `peliculas` WRITE;
/*!40000 ALTER TABLE `peliculas` DISABLE KEYS */;
INSERT INTO `peliculas` VALUES (1,'Inception','Christopher Nolan','Warner Bros.','Ciencia ficción','PG-13',148,'2010-07-16 00:00:00',1),(2,'Parasite','Bong Joon-ho','CJ Entertainment','Thriller','R',132,'2019-05-30 00:00:00',1),(3,'The Godfather','Francis Ford Coppola','Paramount Pictures','Drama','R',175,'1972-03-24 00:00:00',1),(4,'Spirited Away','Hayao Miyazaki','Studio Ghibli','Animación','PG',125,'2001-07-20 00:00:00',1),(5,'Titanic','James Cameron','20th Century Fox','Romance','PG-13',195,'1997-12-19 00:00:00',0),(6,'The Matrix','Lana Wachowski, Lilly Wachowski','Warner Bros.','Acción','R',136,'1999-03-31 00:00:00',1),(7,'Amélie','Jean-Pierre Jeunet','UGC Fox Distribution','Comedia romántica','R',122,'2001-04-25 00:00:00',1),(8,'Coco','Lee Unkrich','Pixar Animation Studios','Animación','PG',105,'2017-10-27 00:00:00',1),(9,'Pulp Fiction','Quentin Tarantino','Miramax Films','Crimen','R',154,'1994-10-14 00:00:00',1),(10,'The Lion King','Roger Allers, Rob Minkoff','Walt Disney Pictures','Animación','G',88,'1994-06-15 00:00:00',1),(11,'Interstellar','Christopher Nolan','Paramount Pictures','Ciencia ficción','PG-13',169,'2014-11-07 00:00:00',1),(12,'Roma','Alfonso Cuarón','Netflix','Drama','R',135,'2018-08-30 00:00:00',1),(13,'The Grand Budapest Hotel','Wes Anderson','Fox Searchlight Pictures','Comedia','R',99,'2014-03-28 00:00:00',1),(14,'Black Panther','Ryan Coogler','Marvel Studios','Acción','PG-13',134,'2018-02-16 00:00:00',1),(15,'Toy Story','John Lasseter','Pixar Animation Studios','Animación','G',81,'1995-11-22 00:00:00',1),(16,'Joker','Todd Phillips','Warner Bros.','Drama','R',122,'2019-10-04 00:00:00',1),(17,'La La Land','Damien Chazelle','Summit Entertainment','Musical','PG-13',128,'2016-12-09 00:00:00',1),(18,'Pan’s Labyrinth','Guillermo del Toro','Warner Bros.','Fantasía','R',118,'2006-10-11 00:00:00',1),(19,'Avengers: Endgame','Anthony Russo, Joe Russo','Marvel Studios','Acción','PG-13',181,'2019-04-26 00:00:00',1),(20,'The Shawshank Redemption','Frank Darabont','Columbia Pictures','Drama','R',142,'1994-09-23 00:00:00',1),(21,'Roma','Alfonso Cuarón','Netflix','Drama','B15',135,'2018-08-30 00:00:00',3),(25,'Las aventuras de TingLing','TingLing','Adventure','Aventura','AA',180,'2025-02-01 00:00:00',10),(26,'Las aventuras de TingLing 2','TingLing','Adventure','Aventura','AA',150,'2025-10-09 00:00:00',1);
/*!40000 ALTER TABLE `peliculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamos`
--

DROP TABLE IF EXISTS `prestamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestamos` (
  `ID_Prestamo` int NOT NULL AUTO_INCREMENT,
  `Tipo_Material` enum('libro','pelicula') COLLATE utf8mb4_general_ci NOT NULL,
  `ID_Material` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `ID_Usuario` int NOT NULL,
  `Nombre_Usuario` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Fecha_Prestamo` date NOT NULL,
  `Fecha_Devolucion` date NOT NULL,
  `Fecha_Devolucion_Real` date DEFAULT NULL,
  `Estado` enum('prestado','devuelto','atrasado') COLLATE utf8mb4_general_ci DEFAULT 'prestado',
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_Prestamo`),
  KEY `ID_Usuario` (`ID_Usuario`),
  CONSTRAINT `prestamos_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamos`
--

LOCK TABLES `prestamos` WRITE;
/*!40000 ALTER TABLE `prestamos` DISABLE KEYS */;
INSERT INTO `prestamos` VALUES (1,'pelicula','1',2,'Diego','2025-10-28','2025-12-02','2025-12-01','devuelto','2025-10-29 01:19:25'),(2,'pelicula','1',2,'Diego','2025-10-29','2025-11-04','2025-11-04','devuelto','2025-10-29 01:25:18');
/*!40000 ALTER TABLE `prestamos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `ID_Usuario` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Correo` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Telefono` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Fecha_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_Usuario`),
  UNIQUE KEY `Correo` (`Correo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'José Ramirez','joselitoram@hotmail.com','5512345678','2025-10-28 11:38:42'),(2,'Diego','diegorg646@gmail.com','5577953347','2025-10-28 13:08:53'),(3,'Joselín','Jeselin@gmail.com','1234567890','2025-10-28 14:02:25'),(4,'Pepito Pica Papas','pepitoeldelaspapas@gmail.com',NULL,'2025-10-28 17:57:38');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'biblioteca'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-20 20:51:33
