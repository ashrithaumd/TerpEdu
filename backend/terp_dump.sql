-- SQLite dump for terpedu

-- Table structure for table `alembic_version`
DROP TABLE IF EXISTS `alembic_version`;
CREATE TABLE `alembic_version` (
    `version_num` TEXT NOT NULL,
    PRIMARY KEY (`version_num`)
);

-- Dumping data for table `alembic_version`
INSERT INTO `alembic_version` VALUES ('4832e0cc9044');

-- Table structure for table `announcements`
DROP TABLE IF EXISTS `announcements`;
CREATE TABLE `announcements` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `course_id` INTEGER NOT NULL,
    `UserID` INTEGER NOT NULL,
    `announcement` TEXT NOT NULL,
    `date_posted` TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Dumping data for table `announcements`
INSERT INTO `announcements` VALUES 
    (1, 611, 888, 'hello this is a test announcement', '2024-11-17 22:47:42'),
    (2, 611, 888, 'hello 611 class', '2024-11-19 09:16:08'),
    (3, 611, 888, 'hi', '2024-11-19 10:11:30');

-- Table structure for table `course_instructors`
DROP TABLE IF EXISTS `course_instructors`;
CREATE TABLE `course_instructors` (
    `course_id` INTEGER NOT NULL,
    `instructor_id` INTEGER NOT NULL,
    PRIMARY KEY (`course_id`, `instructor_id`)
);

-- Dumping data for table `course_instructors`
INSERT INTO `course_instructors` VALUES 
    (611, 888),
    (613, 888),
    (613, 999);

-- Table structure for table `course_materials`
DROP TABLE IF EXISTS `course_materials`;
CREATE TABLE `course_materials` (
    `course_id` INTEGER NOT NULL,
    `material_type` TEXT DEFAULT NULL,
    `title` TEXT DEFAULT NULL,
    `file_path` TEXT DEFAULT NULL,
    `user_id` INTEGER DEFAULT NULL
);

-- Dumping data for table `course_materials`
INSERT INTO `course_materials` VALUES 
    (1, '.pdf', 'course_material', 'materials/ind_memo_3.pdf', 888),
    (2, '.pdf', 'medinis_material_1', 'materials/ind_memo_3.pdf', 888),
    (3, '.pdf', '611_mater', 'materials/ind_memo_3.pdf', 888);

-- Table structure for table `courses`
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
    `course_id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `course_name` TEXT NOT NULL,
    `description` TEXT,
    `credits` INTEGER DEFAULT NULL,
    `department` TEXT DEFAULT NULL,
    `semester` TEXT DEFAULT NULL,
    `is_currently_active` INTEGER DEFAULT NULL
);

-- Dumping data for table `courses`
INSERT INTO `courses` VALUES 
    (611, 'software engineering', 'learn about SE core course', 3, 'SOFTWARE ENGINEERING', 'Fall', 1),
    (613, 'Requirements engineering', 'Learn about requirements and SDLC', 3, 'SOFTWARE ENGINEERING', 'Summer', 1);

-- Table structure for table `enrollments`
DROP TABLE IF EXISTS `enrollments`;
CREATE TABLE `enrollments` (
    `EnrollmentID` INTEGER PRIMARY KEY AUTOINCREMENT,
    `UserID` INTEGER NOT NULL,
    `CourseID` INTEGER NOT NULL,
    `EnrollmentDate` TEXT DEFAULT NULL,
    `Status` TEXT DEFAULT NULL
);

-- Dumping data for table `enrollments`
INSERT INTO `enrollments` VALUES 
    (1, 222, 611, '2024-11-15 05:00:00', 'Active');

-- Table structure for table `notifications`
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
    `NotificationID` INTEGER PRIMARY KEY AUTOINCREMENT,
    `UserID` INTEGER NOT NULL,
    `Message` TEXT,
    `DateSent` TEXT DEFAULT NULL,
    `course_id` INTEGER DEFAULT NULL
);

-- Dumping data for table `notifications`
INSERT INTO `notifications` VALUES 
    (1, 888, 'this is a test', '2024-11-15 05:00:00', 611);

-- Table structure for table `profiles`
DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles` (
    `ProfileID` INTEGER PRIMARY KEY AUTOINCREMENT,
    `UserID` INTEGER NOT NULL,
    `Address` TEXT DEFAULT NULL,
    `PhoneNumber` TEXT DEFAULT NULL
);

-- Dumping data for table `profiles`
INSERT INTO `profiles` VALUES 
    (1, 1112, '3409 Tulane drive Adelphi 20783', '2405051620'),
    (2, 222, '4300 knox', '2405051620');

-- Table structure for table `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `UserID` INTEGER PRIMARY KEY AUTOINCREMENT,
    `Name` TEXT NOT NULL,
    `Email` TEXT NOT NULL,
    `Password` TEXT NOT NULL,
    `Role` TEXT NOT NULL,
    `DateCreated` TEXT DEFAULT NULL
);

-- Dumping data for table `users`
INSERT INTO `users` VALUES 
    (222, 'medini', 'mk@gmail.com', 'med', 'Student', '2024-11-17 20:05:14'),
    (333, 'chandu', 'chandu@gmail.com', 'chandu', 'Admin', '2024-11-18 17:38:18');
