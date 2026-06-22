-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: יוני 21, 2026 בזמן 04:36 PM
-- גרסת שרת: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timegate_db`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `attendance_records`
--

CREATE TABLE `attendance_records` (
  `id` int(11) NOT NULL,
  `employee_code` varchar(20) NOT NULL,
  `record_type` enum('ENTRY','EXIT') NOT NULL,
  `record_date` date NOT NULL,
  `record_time` time NOT NULL,
  `remarks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `employee_code` varchar(20) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `employees`
--

INSERT INTO `employees` (`id`, `employee_code`, `full_name`, `created_at`) VALUES
(1, 'EMP001', 'Ahmed Hassan', '2026-06-21 14:34:06'),
(2, 'EMP002', 'Teto Hassuna', '2026-06-21 14:34:06'),
(3, 'EMP003', 'Ali Nassar', '2026-06-21 14:34:06'),
(4, 'EMP004', 'Omar Saleh', '2026-06-21 14:34:06'),
(5, 'EMP005', 'Yousef Khalil', '2026-06-21 14:34:06');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `attendance_records`
--
ALTER TABLE `attendance_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_employee_code` (`employee_code`);

--
-- אינדקסים לטבלה `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_code` (`employee_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance_records`
--
ALTER TABLE `attendance_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `attendance_records`
--
ALTER TABLE `attendance_records`
  ADD CONSTRAINT `fk_employee_code` FOREIGN KEY (`employee_code`) REFERENCES `employees` (`employee_code`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
