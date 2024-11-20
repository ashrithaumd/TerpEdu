-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: terpedu
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `alembic_version`
--

DROP TABLE IF EXISTS `alembic_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alembic_version`
(
    `version_num` varchar(32) NOT NULL,
    PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alembic_version`
--

LOCK
TABLES `alembic_version` WRITE;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version`
VALUES ('4832e0cc9044');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements`
(
    `id`           int  NOT NULL AUTO_INCREMENT,
    `course_id`    int  NOT NULL,
    `UserID`       int  NOT NULL,
    `announcement` text NOT NULL,
    `date_posted`  datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY            `course_id` (`course_id`),
    KEY            `UserID` (`UserID`),
    CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
    CONSTRAINT `announcements_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK
TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements`
VALUES (1, 611, 888, 'hello this is a test announcement', '2024-11-17 22:47:42'),
       (2, 611, 888, 'hello 611 class', '2024-11-19 09:16:08'),
       (3, 611, 888, 'hi', '2024-11-19 10:11:30');
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `course_instructors`
--

DROP TABLE IF EXISTS `course_instructors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_instructors`
(
    `course_id`     int NOT NULL,
    `instructor_id` int NOT NULL,
    PRIMARY KEY (`course_id`, `instructor_id`),
    KEY             `instructor_id` (`instructor_id`),
    CONSTRAINT `course_instructors_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
    CONSTRAINT `course_instructors_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_instructors`
--

LOCK
TABLES `course_instructors` WRITE;
/*!40000 ALTER TABLE `course_instructors` DISABLE KEYS */;
INSERT INTO `course_instructors`
VALUES (611, 888),
       (613, 888),
       (613, 999);
/*!40000 ALTER TABLE `course_instructors` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `course_materials`
--

DROP TABLE IF EXISTS `course_materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_materials`
(
    `course_id`     int NOT NULL,
    `material_type` varchar(255) DEFAULT NULL,
    `title`         varchar(100) DEFAULT NULL,
    `file_path`     varchar(255) DEFAULT NULL,
    `user_id`       int          DEFAULT NULL,
    KEY             `course_id` (`course_id`),
    CONSTRAINT `course_materials_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_materials`
--

LOCK
TABLES `course_materials` WRITE;
/*!40000 ALTER TABLE `course_materials` DISABLE KEYS */;
INSERT INTO `course_materials`
VALUES (1,611, '.pdf', 'course_material', 'materials\\ind_memo_3.pdf', 888),
       (2,611, '.pdf', 'medinis_material_1', 'materials\\ind_memo_3.pdf', 888),
       (3,611, '.pdf', '611_mater', 'materials\\ind_memo_3.pdf', 888),
       (4,611, '.pdf', 'abc', 'materials\\annotated-individual_memo2.pdf', 888),
       (5,611, '.pdf', '611_mat', 'materials\\ind_memo_3.pdf', 888),
       (6,613, '.pdf', '613_new_material', 'materials\\myaudit.pdf', 888),
       (7,611, '.pdf', 'new file', 'materials\\Week 11 - Detailed Design.pdf', 888),
       (8,611, '.pdf', 'bdaymaterial', 'materials\\annotated-individual_memo2.pdf', 888),
       (9,611, '.pdf', 'testing', 'materials\\ind_memo_3.pdf', 888),
       (10,611, '.pdf', 'testingtest', 'materials\\Week 11 - Detailed Design.pdf', 888),
       (11,611, '.pdf', 'blah', 'materials\\annotated-individual_memo2.pdf', 888),
       (12,611, '.pdf', 'intro session', 'materials\\Chandanacharitha_lor.pdf', 888);
/*!40000 ALTER TABLE `course_materials` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses`
(
    `course_id`           int          NOT NULL AUTO_INCREMENT,
    `course_name`         varchar(100) NOT NULL,
    `description`         text,
    `credits`             int         DEFAULT NULL,
    `department`          varchar(50) DEFAULT NULL,
    `semester`            enum('Fall','Spring','Summer') DEFAULT NULL,
    `is_currently_active` tinyint(1) DEFAULT NULL,
    PRIMARY KEY (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=697 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK
TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses`
VALUES (611, 'software engineering', 'learn about SE core course', 3, 'SOFTWARE ENGINEERING',
        'Fall', 1),
       (613, 'Requirements engineering', 'Learn about requirements and SDLC', 3,
        'SOFTWARE ENGINEERING', 'Summer', 1),
       (696, 'react', 'react with flask', 3, 'SOFTWARE ENGINEERING', 'Spring', 1);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollments`
(
    `EnrollmentID`   int NOT NULL AUTO_INCREMENT,
    `UserID`         int NOT NULL,
    `CourseID`       int NOT NULL,
    `EnrollmentDate` timestamp NULL DEFAULT NULL,
    `Status`         enum('Active','Dropped') DEFAULT NULL,
    PRIMARY KEY (`EnrollmentID`),
    KEY              `CourseID` (`CourseID`),
    KEY              `UserID` (`UserID`),
    CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `courses` (`course_id`),
    CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollments`
--

LOCK
TABLES `enrollments` WRITE;
/*!40000 ALTER TABLE `enrollments` DISABLE KEYS */;
INSERT INTO `enrollments`
VALUES (1, 222, 611, '2024-11-15 05:00:00', 'Active');
/*!40000 ALTER TABLE `enrollments` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications`
(
    `NotificationID` int NOT NULL AUTO_INCREMENT,
    `UserID`         int NOT NULL,
    `Message`        text,
    `DateSent`       timestamp NULL DEFAULT NULL,
    `course_id`      int DEFAULT NULL,
    PRIMARY KEY (`NotificationID`),
    KEY              `UserID` (`UserID`),
    KEY              `fk_course` (`course_id`),
    CONSTRAINT `fk_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
    CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK
TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications`
VALUES (1, 888, 'this is a test', '2024-11-15 05:00:00', 611);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles`
(
    `ProfileID`   int NOT NULL AUTO_INCREMENT,
    `UserID`      int NOT NULL,
    `Address`     varchar(255) DEFAULT NULL,
    `PhoneNumber` varchar(20)  DEFAULT NULL,
    PRIMARY KEY (`ProfileID`),
    KEY           `UserID` (`UserID`),
    CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK
TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles`
VALUES (1, 1112, '3409 Tulane drive Adelphi 20783', '2405051620'),
       (2, 222, '4300 knox', '2405051620'),
       (3, 222, '3409 Tulane drive Adelphi 20783', '2405051620'),
       (4, 333, '3409 tulene', '2405051620'),
       (5, 345, '3409 Tulane drive Adelphi 20783', '2405051620'),
       (6, 1112, '31-23-39/1 ROAD NUMBER 9', '2405051620'),
       (7, 1112, '3409', '1234567'),
       (10, 999, '3409', '2405051620'),
       (11, 777, '3409 Tulane drive Adelphi 20783', '2405051620'),
       (12, 333, '1128 h.j. patterson hall', '2405051620');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `stu_enrollments`
--

DROP TABLE IF EXISTS `stu_enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stu_enrollments`
(
    `StuEnroll`      int NOT NULL AUTO_INCREMENT,
    `UserID`         int NOT NULL,
    `CourseID`       int NOT NULL,
    `EnrollmentDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`StuEnroll`),
    UNIQUE KEY `UC_UserCourse` (`UserID`,`CourseID`),
    KEY              `CourseID` (`CourseID`),
    CONSTRAINT `stu_enrollments_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE,
    CONSTRAINT `stu_enrollments_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stu_enrollments`
--

LOCK
TABLES `stu_enrollments` WRITE;
/*!40000 ALTER TABLE `stu_enrollments` DISABLE KEYS */;
INSERT INTO `stu_enrollments`
VALUES (1, 222, 611, '2024-11-19 21:57:55');
/*!40000 ALTER TABLE `stu_enrollments` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users`
(
    `UserID`      int          NOT NULL AUTO_INCREMENT,
    `Name`        varchar(100) NOT NULL,
    `Email`       varchar(100) NOT NULL,
    `Password`    varchar(100) NOT NULL,
    `Role`        enum('Student','Instructor','Admin') NOT NULL,
    `DateCreated` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`UserID`),
    UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=1113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK
TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users`
VALUES (222, 'medini', 'mk@gmail.com', 'med', 'Student', '2024-11-17 20:05:14'),
       (333, 'chandu', 'chandu@gmail.com', 'chandu', 'Admin', '2024-11-18 17:38:18'),
       (345, 'raj', 'raj@gmail.com', 'vikram', 'Admin', '2024-11-18 18:18:07'),
       (777, 'chan', 'ch@gmail.com', 'cmd', 'Instructor', '2024-11-19 06:40:46'),
       (888, 'chandana', 'chandana@gmail.com', 'chandu', 'Instructor', '2024-11-15 05:00:00'),
       (999, 'kim', 'kim@gmail.com', 'kim', 'Instructor', '2024-11-19 04:54:17'),
       (1112, 'Chandana Charitha Peddinti', 'chandanacharithapeddinti@gmail.com', 'chandu',
        'Student', '2024-11-17 17:33:33');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK
TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-20  1:39:20
