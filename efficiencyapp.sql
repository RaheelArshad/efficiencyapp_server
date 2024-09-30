-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 30, 2024 at 09:13 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `efficiencyapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `optionName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `optionName`) VALUES
(1, 'Not Present'),
(2, 'Rarely'),
(3, 'Some of the Time'),
(4, 'Most of the Time'),
(5, 'Always Present');

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--

CREATE TABLE `visits` (
  `id` int(11) NOT NULL,
  `visitName` varchar(255) NOT NULL,
  `idVisit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visits`
--

INSERT INTO `visits` (`id`, `visitName`, `idVisit`) VALUES
(1, 'Whispering, Whining, Moaning, Grunting, Crying', 110125),
(2, 'Smacking or Licking of Lips, Chewing, Clenching Jaw, Licking, Grimacing, Spitting', 110125),
(3, 'Rocking, Twisting, Banging of Head', 110125),
(4, 'Vocal Perseverating, Screaming, Cursing, Threatening, Wailing', 110125),
(5, 'Tapping fingers, fidgeting or wringing of hands, swinging or flailing arms', 110125),
(6, 'Teak Perseverating (e.g., opening & closing drawers, folding and unfolding clothes, picking at objects, clothes or self, pulling own hair)', 110125),
(7, 'Rocking (back & forth), bobbing (up & down), twisting, writhing of torso, rubbing or masturbating self', 110125),
(8, 'Slapping, swatting, hitting at objects or others', 110125),
(9, 'Trapping toes, clenching toes, tapping heels, extending, flexing or twisting foot', 110125),
(10, 'Shaking legs, tapping knees and things, thrusting pelvis, stomping self, pulling at own hair', 110125),
(11, 'Pacing, wandering', 110125),
(12, 'Thrashing legs, kicking at objects or others', 110125);

-- --------------------------------------------------------

--
-- Table structure for table `visit_options`
--

CREATE TABLE `visit_options` (
  `id` int(11) NOT NULL,
  `idVisit` int(11) DEFAULT NULL,
  `card_code` int(11) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `option1` int(11) DEFAULT NULL,
  `option2` int(11) DEFAULT NULL,
  `option3` int(11) DEFAULT NULL,
  `option4` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visit_options`
--

INSERT INTO `visit_options` (`id`, `idVisit`, `card_code`, `category`, `option1`, `option2`, `option3`, `option4`) VALUES
(4, 110125, 1, 'Vocalization', 1, 2, 3, 4),
(5, 110125, 2, 'Torse', 5, 4, 2, 1),
(6, 110125, 3, 'Lower', 3, 2, 5, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visits`
--
ALTER TABLE `visits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visit_options`
--
ALTER TABLE `visit_options`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `visits`
--
ALTER TABLE `visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `visit_options`
--
ALTER TABLE `visit_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
