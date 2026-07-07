CREATE DATABASE  IF NOT EXISTS `raden` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `raden`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: raden
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `ID_Funcionario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cargo` varchar(30) NOT NULL,
  `telefone` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_Funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'Natalia','Gestor','(31) 91234-5678','nataliagestor@raden.com.br','123456'),(2,'David','Colaborador','(31) 98765-4321','davidcolaborador@raden.com.br','123456');
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historico_alteracoes`
--

DROP TABLE IF EXISTS `historico_alteracoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historico_alteracoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `acao` varchar(50) NOT NULL,
  `tag` varchar(50) NOT NULL,
  `detalhes` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historico_alteracoes`
--

LOCK TABLES `historico_alteracoes` WRITE;
/*!40000 ALTER TABLE `historico_alteracoes` DISABLE KEYS */;
INSERT INTO `historico_alteracoes` VALUES (1,'2026-07-06 12:12:05','ARQUIVAMENTO','1','O equipamento \"Pistão\" foi enviado para a lista de arquivados.'),(2,'2026-07-06 12:12:11','DESARQUIVAMENTO','1','O equipamento \"Pistão\" foi restaurado para os ativos.'),(3,'2026-07-06 12:14:09','ARQUIVAMENTO','2','O equipamento \"a\" foi enviado para a lista de arquivados.'),(4,'2026-07-06 12:22:22','ARQUIVAMENTO','2','O equipamento \"a\" foi enviado para a lista de arquivados.'),(5,'2026-07-06 12:45:57','CADASTRO','3','O equipamento \"a\" foi cadastrado.'),(6,'2026-07-06 12:53:39','CADASTRO','4','O equipamento \"B\" foi cadastrado.'),(7,'2026-07-06 13:00:04','CADASTRO','5','O equipamento \"Pis\" foi cadastrado.'),(8,'2026-07-06 13:00:09','ARQUIVAMENTO','5','O equipamento \"Pis\" foi enviado para a lista de arquivados.'),(9,'2026-07-06 13:00:10','ARQUIVAMENTO','3','O equipamento \"a\" foi enviado para a lista de arquivados.'),(10,'2026-07-06 13:00:12','ARQUIVAMENTO','4','O equipamento \"B\" foi enviado para a lista de arquivados.');
/*!40000 ALTER TABLE `historico_alteracoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itens`
--

DROP TABLE IF EXISTS `itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens` (
  `tag` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `setor` varchar(30) NOT NULL,
  `observacao` varchar(300) DEFAULT NULL,
  `criticidade` varchar(10) NOT NULL,
  `etapa` varchar(15) NOT NULL,
  PRIMARY KEY (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itens`
--

LOCK TABLES `itens` WRITE;
/*!40000 ALTER TABLE `itens` DISABLE KEYS */;
INSERT INTO `itens` VALUES (1,'Pistão','Mineração','Identificado desgaste excessivo na saia do pistão do cilindro nº 3, acompanhado de severos riscos verticais (sinais de engripamento) e carbonização excessiva nas canaletas dos anéis. Necessária a retífica do bloco e a substituição do kit de pistão e anéis.','MEDIA','PERITAGEM');
/*!40000 ALTER TABLE `itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itens_arquivados`
--

DROP TABLE IF EXISTS `itens_arquivados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens_arquivados` (
  `ID_Itens_Arquivados` int NOT NULL AUTO_INCREMENT,
  `tag` int DEFAULT NULL,
  `nome` varchar(50) NOT NULL,
  `setor` varchar(30) NOT NULL,
  `observacao` varchar(300) DEFAULT NULL,
  `criticidade` varchar(10) NOT NULL,
  `etapa` varchar(15) NOT NULL,
  PRIMARY KEY (`ID_Itens_Arquivados`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itens_arquivados`
--

LOCK TABLES `itens_arquivados` WRITE;
/*!40000 ALTER TABLE `itens_arquivados` DISABLE KEYS */;
INSERT INTO `itens_arquivados` VALUES (1,2,'a','','','baixa','envio'),(2,5,'Pis','','','baixa','envio'),(3,3,'a','','','baixa','envio'),(4,4,'B','','','alta','envio');
/*!40000 ALTER TABLE `itens_arquivados` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-06 10:49:05
