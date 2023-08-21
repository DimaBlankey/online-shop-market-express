-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2023 at 05:04 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online-shop-market-express`
--
CREATE DATABASE IF NOT EXISTS `online-shop-market-express` DEFAULT CHARACTER SET utf16 COLLATE utf16_general_ci;
USE `online-shop-market-express`;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `userId`, `date`) VALUES
(4, 2, '2023-04-25'),
(97, 28, '2023-06-23'),
(104, 22, '2023-06-26'),
(106, 23, '2023-06-26'),
(107, 29, '2023-06-26'),
(108, 1, '2023-08-20'),
(110, 9, '2023-08-20'),
(111, 21, '2023-08-20'),
(112, 20, '2023-08-21');

-- --------------------------------------------------------

--
-- Table structure for table `cart_details`
--

CREATE TABLE `cart_details` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalPrice` decimal(6,2) NOT NULL,
  `cartId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `cart_details`
--

INSERT INTO `cart_details` (`id`, `productId`, `quantity`, `totalPrice`, `cartId`) VALUES
(1018, 4, 1, '1.25', 112),
(1019, 6, 1, '1.29', 112),
(1020, 8, 1, '7.99', 112);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `categoryName`) VALUES
(1, 'Fresh Produce'),
(2, 'Pantry Staples'),
(3, 'Dairy & Refrigerated'),
(4, 'Frozen Foods'),
(5, 'Snacks & Beverages');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `totalPrice` decimal(8,2) NOT NULL,
  `city` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `dateOfDelivery` date DEFAULT NULL,
  `dateOfPurchase` date NOT NULL,
  `creditCardNum` int(11) DEFAULT NULL,
  `productsAndQuantity` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userId`, `cartId`, `totalPrice`, `city`, `address`, `dateOfDelivery`, `dateOfPurchase`, `creditCardNum`, `productsAndQuantity`) VALUES
(66, 1, 75, '6.48', 'Rehovot', 'Nave Alon, 15', '2023-05-11', '2023-05-03', 1313, '[{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"}]'),
(67, 1, 76, '8.47', 'Rehovot', 'Nave Alon, 15', '2023-05-31', '2023-05-03', 5455, '[{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"},{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":2,\"name\":\"Romaine Lettuce\",\"quantity\":1,\"price\":1.99,\"salePrice\":null,\"productCode\":\"FP002\",\"image1Url\":\"http://localhost:4000/api/products/images/51e3d677-b16f-426c-b8b9-2a899612a9ae.jpg\"}]'),
(68, 1, 77, '10.47', 'Rehovot', 'Nave Alon, 15', '2023-05-10', '2023-05-03', 3213, '[{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"},{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":7,\"name\":\"Basmati Rice\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"PS002\",\"image1Url\":\"http://localhost:4000/api/products/images/a9fe1726-8ef1-4f23-9ceb-8d9b95f320ca.jpg\"}]'),
(69, 1, 78, '2.49', 'Rehovot', 'Nave Alon, 15', '2023-05-16', '2023-05-15', 4582, '[{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"}]'),
(70, 1, 79, '6.48', 'Rehovot', 'Nave Alon, 15', '2023-05-24', '2023-05-15', 850, '[{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"}]'),
(71, 1, 80, '3.49', 'Rehovot', 'Nave Alon, 15', '2023-05-31', '2023-05-20', 1548, '[{\"id\":19,\"name\":\"Vegetable Stir-Fry Mix\",\"quantity\":1,\"price\":3.49,\"salePrice\":null,\"productCode\":\"FF004\",\"image1Url\":\"http://localhost:4000/api/products/images/bf57be65-f78c-4672-9a1a-621ecacf7d67.jpg\"}]'),
(72, 1, 81, '6.48', 'Rehovot', 'Nave Alon, 15', '2023-05-25', '2023-05-20', 5312, '[{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"},{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"}]'),
(73, 1, 82, '10.47', 'Rehovot', 'Nave Alon, 14', '2023-05-31', '2023-05-20', 1231, '[{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":2,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"},{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"}]'),
(74, 9, 8, '11.34', 'Haifa', 'Herzel, 5', '2023-05-25', '2023-05-20', 2343, '[{\"id\":2,\"name\":\"Romaine Lettuce\",\"quantity\":1,\"price\":1.99,\"salePrice\":null,\"productCode\":\"FP002\",\"image1Url\":\"http://localhost:4000/api/products/images/51e3d677-b16f-426c-b8b9-2a899612a9ae.jpg\"},{\"id\":6,\"name\":\"Classic Spaghetti\",\"quantity\":2,\"price\":1.29,\"salePrice\":null,\"productCode\":\"PS001\",\"image1Url\":\"http://localhost:4000/api/products/images/8ace5deb-f9da-4494-afe4-6f6897b309e7.jpg\"},{\"id\":5,\"name\":\"Red Bell Peppers\",\"quantity\":1,\"price\":1.79,\"salePrice\":null,\"productCode\":\"FP005\",\"image1Url\":\"http://localhost:4000/api/products/images/e1cae703-af9e-4045-9660-858201cc8483.jpg\"},{\"id\":7,\"name\":\"Basmati Rice\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"PS002\",\"image1Url\":\"http://localhost:4000/api/products/images/a9fe1726-8ef1-4f23-9ceb-8d9b95f320ca.jpg\"},{\"id\":1,\"name\":\" Gala Apples\",\"quantity\":1,\"price\":1.49,\"salePrice\":0.99,\"productCode\":\"FP001\",\"image1Url\":\"http://localhost:4000/api/products/images/dfe1cda6-60f4-4f7e-925e-f1691c5d60bf.jpg\"}]'),
(75, 1, 83, '2.49', 'rishon', 'Nave Alon, 16', '2023-05-29', '2023-05-27', 7465, '[{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"}]'),
(76, 1, 85, '6.48', 'rishon', 'Nave Alon, 16', '2023-05-30', '2023-05-28', 4545, '[{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"},{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"}]'),
(77, 1, 86, '9.45', 'Rehovot', 'Nave Alon, 16', '2023-05-30', '2023-05-28', 3453, '[{\"id\":1,\"name\":\" Gala Apples\",\"quantity\":3,\"price\":1.49,\"salePrice\":0.99,\"productCode\":\"FP001\",\"image1Url\":\"http://localhost:4000/api/products/images/dfe1cda6-60f4-4f7e-925e-f1691c5d60bf.jpg\"},{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"}]'),
(78, 1, 87, '9.46', 'rishon', 'Nave Alon, 16', '2023-05-29', '2023-05-28', 5345, '[{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"},{\"id\":2,\"name\":\"Romaine Lettuce\",\"quantity\":1,\"price\":1.99,\"salePrice\":null,\"productCode\":\"FP002\",\"image1Url\":\"http://localhost:4000/api/products/images/51e3d677-b16f-426c-b8b9-2a899612a9ae.jpg\"},{\"id\":1,\"name\":\" Gala Apples\",\"quantity\":1,\"price\":1.49,\"salePrice\":0.99,\"productCode\":\"FP001\",\"image1Url\":\"http://localhost:4000/api/products/images/dfe1cda6-60f4-4f7e-925e-f1691c5d60bf.jpg\"}]'),
(79, 1, 88, '14.46', 'Rehovot', 'Nave Alon, 16', '2023-06-29', '2023-06-02', 4800, '[{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":2,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"},{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":7,\"name\":\"Basmati Rice\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"PS002\",\"image1Url\":\"http://localhost:4000/api/products/images/a9fe1726-8ef1-4f23-9ceb-8d9b95f320ca.jpg\"}]'),
(80, 1, 89, '8.47', 'Rehovot', 'Nave Alon, 16', '2023-06-21', '2023-06-09', 4687, '[{\"id\":2,\"name\":\"Romaine Lettuce\",\"quantity\":1,\"price\":1.99,\"salePrice\":null,\"productCode\":\"FP002\",\"image1Url\":\"http://localhost:4000/api/products/images/51e3d677-b16f-426c-b8b9-2a899612a9ae.jpg\"},{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"}]'),
(81, 9, 84, '5.98', 'Haifa', 'Herzel, 5', '2023-06-14', '2023-06-09', 3453, '[{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"},{\"id\":2,\"name\":\"Romaine Lettuce\",\"quantity\":1,\"price\":1.99,\"salePrice\":null,\"productCode\":\"FP002\",\"image1Url\":\"http://localhost:4000/api/products/images/51e3d677-b16f-426c-b8b9-2a899612a9ae.jpg\"}]'),
(82, 9, 91, '8.47', 'rishon', 'Herzel, 5', '2023-06-15', '2023-06-09', 6456, '[{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"},{\"id\":2,\"name\":\"Romaine Lettuce\",\"quantity\":1,\"price\":1.99,\"salePrice\":null,\"productCode\":\"FP002\",\"image1Url\":\"http://localhost:4000/api/products/images/51e3d677-b16f-426c-b8b9-2a899612a9ae.jpg\"}]'),
(83, 1, 90, '3.00', 'Rehovot', 'Nave Alon, 16', '2023-06-27', '2023-06-25', 6456, '[{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":1,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":1,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"},{\"id\":2,\"name\":\"Romaine Lettuce\",\"quantity\":1,\"price\":1.99,\"salePrice\":1,\"productCode\":\"FP002\",\"image1Url\":\"http://localhost:4000/api/products/images/51e3d677-b16f-426c-b8b9-2a899612a9ae.jpg\"}]'),
(84, 1, 98, '0.99', 'Rehovot', 'Nave Alon, 16', '2023-06-27', '2023-06-26', 2452, '[{\"id\":10,\"name\":\"Canned Black Beans\",\"quantity\":1,\"price\":0.99,\"salePrice\":null,\"productCode\":\"PS005\",\"image1Url\":\"http://localhost:4000/api/products/images/050690fa-4db7-478d-9763-ab741580f8b2.png\"}]'),
(85, 1, 99, '2.00', 'Rehovot', 'Nave Alon, 16', '2023-06-29', '2023-06-26', 4535, '[{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":1,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":1,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"}]'),
(86, 1, 101, '23.93', 'Rehovot', 'Nave Alon, 16', '2023-06-28', '2023-06-26', 4565, '[{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":1,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":61,\"name\":\"Sweet Corn\",\"quantity\":1,\"price\":0.79,\"salePrice\":null,\"productCode\":\"FP008\",\"image1Url\":\"http://localhost:4000/api/products/images/8a7c8ede-a7ac-4ae8-a032-4a17e5f42899.webp\"},{\"id\":63,\"name\":\"Organic Avocados\",\"quantity\":1,\"price\":1.69,\"salePrice\":null,\"productCode\":\"FP010\",\"image1Url\":\"http://localhost:4000/api/products/images/c145f597-b7c5-42fe-bbc9-2056eaf66a4f.jpg\"},{\"id\":65,\"name\":\"Chunky Peanut Butter\",\"quantity\":1,\"price\":2.99,\"salePrice\":null,\"productCode\":\"PS007\",\"image1Url\":\"http://localhost:4000/api/products/images/ddba4393-60df-46b4-8095-17a112985497.png\"},{\"id\":67,\"name\":\"Raw Honey\",\"quantity\":1,\"price\":6.99,\"salePrice\":null,\"productCode\":\"PS009\",\"image1Url\":\"http://localhost:4000/api/products/images/31f9bab0-2be2-47d1-ba5c-81e9d73f8722.webp\"},{\"id\":18,\"name\":\"Chicken Pot Pie\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FF003\",\"image1Url\":\"http://localhost:4000/api/products/images/91124ea0-d07d-47ca-89e7-3b1616a03029.jpg\"},{\"id\":17,\"name\":\"Mixed Vegetables\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FF002\",\"image1Url\":\"http://localhost:4000/api/products/images/c066b2a3-1c9f-4fab-bcb2-baf38c193128.jpg\"},{\"id\":69,\"name\":\"Sliced Swiss Cheese\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"DR008\",\"image1Url\":\"http://localhost:4000/api/products/images/12d46e8c-ec35-43ad-b85c-836d21ac2d40.jpg\"}]'),
(87, 20, 19, '18.06', 'Tel Aviv', 'herzel 1', '2023-06-30', '2023-06-26', 4355, '[{\"id\":8,\"name\":\"Extra Virgin Olive Oil\",\"quantity\":1,\"price\":7.99,\"salePrice\":5.59,\"productCode\":\"PS003\",\"image1Url\":\"http://localhost:4000/api/products/images/16f18010-ec40-4b38-af82-48954fbf5b0d.png\"},{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":1,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":1,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"},{\"id\":62,\"name\":\"Blueberries\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP009\",\"image1Url\":\"http://localhost:4000/api/products/images/187eead1-60ee-4356-bf8f-56790e05bd66.jpg\"},{\"id\":20,\"name\":\"Chocolate Chip Cookie Dough Ice Cream\",\"quantity\":1,\"price\":4.99,\"salePrice\":2.99,\"productCode\":\"FF005\",\"image1Url\":\"http://localhost:4000/api/products/images/5d5bedd2-3833-4266-84d4-f6d6f13555f9.jpg\"},{\"id\":24,\"name\":\"Green Tea Bags\",\"quantity\":1,\"price\":3.49,\"salePrice\":null,\"productCode\":\"SB004\",\"image1Url\":\"http://localhost:4000/api/products/images/503479f3-7cfb-4fb5-aee4-f91b9ec17c01.jpg\"}]'),
(88, 22, 39, '19.12', 'NY', 'somwhere', '2023-06-30', '2023-06-26', 5345, '[{\"id\":2,\"name\":\"Romaine Lettuce\",\"quantity\":1,\"price\":1.99,\"salePrice\":1,\"productCode\":\"FP002\",\"image1Url\":\"http://localhost:4000/api/products/images/51e3d677-b16f-426c-b8b9-2a899612a9ae.jpg\"},{\"id\":6,\"name\":\"Classic Spaghetti\",\"quantity\":2,\"price\":1.29,\"salePrice\":null,\"productCode\":\"PS001\",\"image1Url\":\"http://localhost:4000/api/products/images/8ace5deb-f9da-4494-afe4-6f6897b309e7.jpg\"},{\"id\":1,\"name\":\" Gala Apples\",\"quantity\":1,\"price\":1.49,\"salePrice\":1,\"productCode\":\"FP001\",\"image1Url\":\"http://localhost:4000/api/products/images/dfe1cda6-60f4-4f7e-925e-f1691c5d60bf.jpg\"},{\"id\":60,\"name\":\"Bananas\",\"quantity\":1,\"price\":0.59,\"salePrice\":null,\"productCode\":\"FP006\",\"image1Url\":\"http://localhost:4000/api/products/images/442b10f2-8cc8-488a-ba1d-f9a360b3be85.jpg\"},{\"id\":15,\"name\":\"Cage-Free Large Brown Eggs\",\"quantity\":1,\"price\":2.99,\"salePrice\":null,\"productCode\":\"DR005\",\"image1Url\":\"http://localhost:4000/api/products/images/c99ca8f0-d1d0-4596-a15b-6e40b7def3f0.jpg\"},{\"id\":18,\"name\":\"Chicken Pot Pie\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FF003\",\"image1Url\":\"http://localhost:4000/api/products/images/91124ea0-d07d-47ca-89e7-3b1616a03029.jpg\"},{\"id\":16,\"name\":\"Cheese Pizza\",\"quantity\":1,\"price\":5.99,\"salePrice\":null,\"productCode\":\"FF001\",\"image1Url\":\"http://localhost:4000/api/products/images/75b4229f-60e3-4630-b088-d1fbbedf56fc.png\"}]'),
(89, 21, 20, '11.96', 'London', 'beatles st', '2023-07-05', '2023-06-26', 8654, '[{\"id\":21,\"name\":\" Classic Potato Chips\",\"quantity\":1,\"price\":2.99,\"salePrice\":null,\"productCode\":\"SB001\",\"image1Url\":\"http://localhost:4000/api/products/images/1be3d5e3-553f-44b7-a900-e3e21c6eb66c.jpg\"},{\"id\":25,\"name\":\"Orange Juice\",\"quantity\":1,\"price\":2.99,\"salePrice\":1.5,\"productCode\":\"SB005\",\"image1Url\":\"http://localhost:4000/api/products/images/5751c65e-caca-4e45-9b82-759079fe39f5.jpg\"},{\"id\":19,\"name\":\"Vegetable Stir-Fry Mix\",\"quantity\":1,\"price\":3.49,\"salePrice\":null,\"productCode\":\"FF004\",\"image1Url\":\"http://localhost:4000/api/products/images/bf57be65-f78c-4672-9a1a-621ecacf7d67.jpg\"},{\"id\":13,\"name\":\"Greek Yogurt\",\"quantity\":1,\"price\":1.29,\"salePrice\":null,\"productCode\":\"DR003\",\"image1Url\":\"http://localhost:4000/api/products/images/d1379f29-5106-4007-8f5a-588977d2a00b.jpg\"},{\"id\":63,\"name\":\"Organic Avocados\",\"quantity\":1,\"price\":1.69,\"salePrice\":null,\"productCode\":\"FP010\",\"image1Url\":\"http://localhost:4000/api/products/images/c145f597-b7c5-42fe-bbc9-2056eaf66a4f.jpg\"},{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":1,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"}]'),
(90, 23, 40, '26.30', 'cairo', '1295', '2023-07-14', '2023-06-26', 3452, '[{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":1,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":61,\"name\":\"Sweet Corn\",\"quantity\":1,\"price\":0.79,\"salePrice\":null,\"productCode\":\"FP008\",\"image1Url\":\"http://localhost:4000/api/products/images/8a7c8ede-a7ac-4ae8-a032-4a17e5f42899.webp\"},{\"id\":60,\"name\":\"Bananas\",\"quantity\":1,\"price\":0.59,\"salePrice\":null,\"productCode\":\"FP006\",\"image1Url\":\"http://localhost:4000/api/products/images/442b10f2-8cc8-488a-ba1d-f9a360b3be85.jpg\"},{\"id\":5,\"name\":\"Red Bell Peppers\",\"quantity\":1,\"price\":1.79,\"salePrice\":1,\"productCode\":\"FP005\",\"image1Url\":\"http://localhost:4000/api/products/images/e1cae703-af9e-4045-9660-858201cc8483.jpg\"},{\"id\":62,\"name\":\"Blueberries\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP009\",\"image1Url\":\"http://localhost:4000/api/products/images/187eead1-60ee-4356-bf8f-56790e05bd66.jpg\"},{\"id\":10,\"name\":\"Canned Black Beans\",\"quantity\":1,\"price\":0.99,\"salePrice\":null,\"productCode\":\"PS005\",\"image1Url\":\"http://localhost:4000/api/products/images/050690fa-4db7-478d-9763-ab741580f8b2.png\"},{\"id\":64,\"name\":\"Rolled Oats\",\"quantity\":1,\"price\":2.99,\"salePrice\":null,\"productCode\":\"PS006\",\"image1Url\":\"http://localhost:4000/api/products/images/3bfbf512-5593-4596-95d2-da3bed69c542.jpg\"},{\"id\":25,\"name\":\"Orange Juice\",\"quantity\":1,\"price\":2.99,\"salePrice\":1.5,\"productCode\":\"SB005\",\"image1Url\":\"http://localhost:4000/api/products/images/5751c65e-caca-4e45-9b82-759079fe39f5.jpg\"},{\"id\":24,\"name\":\"Green Tea Bags\",\"quantity\":1,\"price\":3.49,\"salePrice\":null,\"productCode\":\"SB004\",\"image1Url\":\"http://localhost:4000/api/products/images/503479f3-7cfb-4fb5-aee4-f91b9ec17c01.jpg\"},{\"id\":23,\"name\":\"Sparkling Water\",\"quantity\":1,\"price\":0.99,\"salePrice\":null,\"productCode\":\"SB003\",\"image1Url\":\"http://localhost:4000/api/products/images/78cf3434-9e9b-4ae5-8097-036f12706c49.jpg\"},{\"id\":22,\"name\":\"Dark Chocolate Almonds\",\"quantity\":1,\"price\":4.99,\"salePrice\":null,\"productCode\":\"SB002\",\"image1Url\":\"http://localhost:4000/api/products/images/356acaf2-6973-46dd-bc11-0c102e28a717.jpg\"},{\"id\":9,\"name\":\"All-Purpose Flour\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"PS004\",\"image1Url\":\"http://localhost:4000/api/products/images/8f6107fe-5f5b-4fe3-9379-473304233937.png\"}]'),
(91, 29, 100, '7.76', 'NY', '1st Ave', '2023-06-29', '2023-06-26', 6345, '[{\"id\":6,\"name\":\"Classic Spaghetti\",\"quantity\":1,\"price\":1.29,\"salePrice\":null,\"productCode\":\"PS001\",\"image1Url\":\"http://localhost:4000/api/products/images/8ace5deb-f9da-4494-afe4-6f6897b309e7.jpg\"},{\"id\":66,\"name\":\"Canned Tuna\",\"quantity\":1,\"price\":1.49,\"salePrice\":null,\"productCode\":\"PS008\",\"image1Url\":\"http://localhost:4000/api/products/images/e12895c3-96e0-481d-9687-6180238457d5.jpg\"},{\"id\":69,\"name\":\"Sliced Swiss Cheese\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"DR008\",\"image1Url\":\"http://localhost:4000/api/products/images/12d46e8c-ec35-43ad-b85c-836d21ac2d40.jpg\"},{\"id\":23,\"name\":\"Sparkling Water\",\"quantity\":1,\"price\":0.99,\"salePrice\":null,\"productCode\":\"SB003\",\"image1Url\":\"http://localhost:4000/api/products/images/78cf3434-9e9b-4ae5-8097-036f12706c49.jpg\"}]'),
(92, 1, 102, '5.48', 'Rehovot', 'Nave Alon, 16', '2023-08-20', '2023-08-20', 8676, '[{\"id\":3,\"name\":\"Organic Baby Spinach\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP003\",\"image1Url\":\"http://localhost:4000/api/products/images/66d1d66d-b421-448f-9255-d9ea2be3d072.jpg\"},{\"id\":1,\"name\":\" Gala Apples\",\"quantity\":1,\"price\":1.49,\"salePrice\":null,\"productCode\":\"FP001\",\"image1Url\":\"http://localhost:4000/api/products/images/dfe1cda6-60f4-4f7e-925e-f1691c5d60bf.jpg\"}]'),
(93, 20, 103, '47.09', 'Tel Aviv', 'herzel 1', '2023-08-22', '2023-08-20', 5486, '[{\"id\":25,\"name\":\"Orange Juice\",\"quantity\":1,\"price\":2.99,\"salePrice\":null,\"productCode\":\"SB005\",\"image1Url\":\"http://localhost:4000/api/products/images/5751c65e-caca-4e45-9b82-759079fe39f5.jpg\"},{\"id\":24,\"name\":\"Green Tea Bags\",\"quantity\":1,\"price\":3.49,\"salePrice\":null,\"productCode\":\"SB004\",\"image1Url\":\"http://localhost:4000/api/products/images/503479f3-7cfb-4fb5-aee4-f91b9ec17c01.jpg\"},{\"id\":20,\"name\":\"Chocolate Chip Cookie Dough Ice Cream\",\"quantity\":1,\"price\":4.99,\"salePrice\":null,\"productCode\":\"FF005\",\"image1Url\":\"http://localhost:4000/api/products/images/5d5bedd2-3833-4266-84d4-f6d6f13555f9.jpg\"},{\"id\":19,\"name\":\"Vegetable Stir-Fry Mix\",\"quantity\":1,\"price\":3.49,\"salePrice\":null,\"productCode\":\"FF004\",\"image1Url\":\"http://localhost:4000/api/products/images/bf57be65-f78c-4672-9a1a-621ecacf7d67.jpg\"},{\"id\":63,\"name\":\"Organic Avocados\",\"quantity\":1,\"price\":1.69,\"salePrice\":null,\"productCode\":\"FP010\",\"image1Url\":\"http://localhost:4000/api/products/images/c145f597-b7c5-42fe-bbc9-2056eaf66a4f.jpg\"},{\"id\":8,\"name\":\"Extra Virgin Olive Oil\",\"quantity\":1,\"price\":7.99,\"salePrice\":null,\"productCode\":\"PS003\",\"image1Url\":\"http://localhost:4000/api/products/images/16f18010-ec40-4b38-af82-48954fbf5b0d.png\"},{\"id\":66,\"name\":\"Canned Tuna\",\"quantity\":1,\"price\":1.49,\"salePrice\":null,\"productCode\":\"PS008\",\"image1Url\":\"http://localhost:4000/api/products/images/e12895c3-96e0-481d-9687-6180238457d5.jpg\"},{\"id\":67,\"name\":\"Raw Honey\",\"quantity\":1,\"price\":6.99,\"salePrice\":null,\"productCode\":\"PS009\",\"image1Url\":\"http://localhost:4000/api/products/images/31f9bab0-2be2-47d1-ba5c-81e9d73f8722.webp\"},{\"id\":12,\"name\":\"Sharp Cheddar Cheese\",\"quantity\":1,\"price\":4.49,\"salePrice\":null,\"productCode\":\"DR002\",\"image1Url\":\"http://localhost:4000/api/products/images/cabfe9be-f815-4f60-bc3c-93f6af8b11be.jpg\"},{\"id\":14,\"name\":\"Unsalted Butter\",\"quantity\":1,\"price\":3.49,\"salePrice\":null,\"productCode\":\"DR004\",\"image1Url\":\"http://localhost:4000/api/products/images/b8be6052-8ed9-489f-a045-ce193acdf50e.jpg\"},{\"id\":16,\"name\":\"Cheese Pizza\",\"quantity\":1,\"price\":5.99,\"salePrice\":null,\"productCode\":\"FF001\",\"image1Url\":\"http://localhost:4000/api/products/images/75b4229f-60e3-4630-b088-d1fbbedf56fc.png\"}]'),
(94, 9, 92, '18.92', 'Haifa', 'Herzel, 5', '2023-08-29', '2023-08-20', 1534, '[{\"id\":65,\"name\":\"Chunky Peanut Butter\",\"quantity\":1,\"price\":2.99,\"salePrice\":null,\"productCode\":\"PS007\",\"image1Url\":\"http://localhost:4000/api/products/images/ddba4393-60df-46b4-8095-17a112985497.png\"},{\"id\":66,\"name\":\"Canned Tuna\",\"quantity\":1,\"price\":1.49,\"salePrice\":null,\"productCode\":\"PS008\",\"image1Url\":\"http://localhost:4000/api/products/images/e12895c3-96e0-481d-9687-6180238457d5.jpg\"},{\"id\":10,\"name\":\"Canned Black Beans\",\"quantity\":3,\"price\":0.99,\"salePrice\":null,\"productCode\":\"PS005\",\"image1Url\":\"http://localhost:4000/api/products/images/050690fa-4db7-478d-9763-ab741580f8b2.png\"},{\"id\":67,\"name\":\"Raw Honey\",\"quantity\":1,\"price\":6.99,\"salePrice\":null,\"productCode\":\"PS009\",\"image1Url\":\"http://localhost:4000/api/products/images/31f9bab0-2be2-47d1-ba5c-81e9d73f8722.webp\"},{\"id\":23,\"name\":\"Sparkling Water\",\"quantity\":1,\"price\":0.99,\"salePrice\":null,\"productCode\":\"SB003\",\"image1Url\":\"http://localhost:4000/api/products/images/78cf3434-9e9b-4ae5-8097-036f12706c49.jpg\"},{\"id\":24,\"name\":\"Green Tea Bags\",\"quantity\":1,\"price\":3.49,\"salePrice\":null,\"productCode\":\"SB004\",\"image1Url\":\"http://localhost:4000/api/products/images/503479f3-7cfb-4fb5-aee4-f91b9ec17c01.jpg\"}]'),
(95, 21, 105, '14.85', 'London', 'beatles st', '2023-08-22', '2023-08-20', 1231, '[{\"id\":62,\"name\":\"Blueberries\",\"quantity\":1,\"price\":3.99,\"salePrice\":null,\"productCode\":\"FP009\",\"image1Url\":\"http://localhost:4000/api/products/images/187eead1-60ee-4356-bf8f-56790e05bd66.jpg\"},{\"id\":61,\"name\":\"Sweet Corn\",\"quantity\":1,\"price\":0.79,\"salePrice\":null,\"productCode\":\"FP008\",\"image1Url\":\"http://localhost:4000/api/products/images/8a7c8ede-a7ac-4ae8-a032-4a17e5f42899.webp\"},{\"id\":60,\"name\":\"Bananas\",\"quantity\":1,\"price\":0.59,\"salePrice\":null,\"productCode\":\"FP006\",\"image1Url\":\"http://localhost:4000/api/products/images/442b10f2-8cc8-488a-ba1d-f9a360b3be85.jpg\"},{\"id\":17,\"name\":\"Mixed Vegetables\",\"quantity\":1,\"price\":2.49,\"salePrice\":null,\"productCode\":\"FF002\",\"image1Url\":\"http://localhost:4000/api/products/images/c066b2a3-1c9f-4fab-bcb2-baf38c193128.jpg\"},{\"id\":67,\"name\":\"Raw Honey\",\"quantity\":1,\"price\":6.99,\"salePrice\":null,\"productCode\":\"PS009\",\"image1Url\":\"http://localhost:4000/api/products/images/31f9bab0-2be2-47d1-ba5c-81e9d73f8722.webp\"}]'),
(96, 20, 109, '4.25', 'Tel Aviv', 'herzel 2', '2023-08-21', '2023-08-21', 6456, '[{\"id\":4,\"name\":\"Vine-Ripened Tomatoes\",\"quantity\":1,\"price\":2.49,\"salePrice\":1.25,\"productCode\":\"FP004\",\"image1Url\":\"http://localhost:4000/api/products/images/840901c7-06e5-4078-822c-820ac263de87.jpg\"},{\"id\":2,\"name\":\"Romaine Lettuce\",\"quantity\":3,\"price\":1.99,\"salePrice\":1,\"productCode\":\"FP002\",\"image1Url\":\"http://localhost:4000/api/products/images/51e3d677-b16f-426c-b8b9-2a899612a9ae.jpg\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `image1` varchar(250) NOT NULL,
  `image2` varchar(250) DEFAULT NULL,
  `salePrice` decimal(6,2) DEFAULT NULL,
  `saleStartDate` date DEFAULT NULL,
  `saleEndDate` date DEFAULT NULL,
  `productCode` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `categoryId`, `name`, `description`, `price`, `image1`, `image2`, `salePrice`, `saleStartDate`, `saleEndDate`, `productCode`) VALUES
(1, 1, ' Gala Apples', 'Sweet and crisp apples perfect for snacking or baking.', '1.49', 'dfe1cda6-60f4-4f7e-925e-f1691c5d60bf.jpg', '30cbe217-066d-43c9-954d-de949b6eab18.jpg', '0.75', '2023-08-20', '2023-08-31', 'FP001'),
(2, 1, 'Romaine Lettuce', 'Fresh and crunchy lettuce, ideal for salads and sandwiches', '1.99', '51e3d677-b16f-426c-b8b9-2a899612a9ae.jpg', 'e448be5b-de6b-44cc-b62d-72d8adcb9ef9.jpg', '1.00', '2023-08-20', '2023-08-31', 'FP002'),
(3, 1, 'Organic Baby Spinach', 'Tender and nutrient-packed baby spinach leaves, great for salads and cooking.', '3.99', '66d1d66d-b421-448f-9255-d9ea2be3d072.jpg', '3bd1243b-c7eb-44c4-b573-219c4fb205b3.jpg', '2.00', '2023-08-20', '2023-08-31', 'FP003'),
(4, 1, 'Vine-Ripened Tomatoes', 'Juicy and flavorful tomatoes for salads, sandwiches, or cooking.', '2.49', '840901c7-06e5-4078-822c-820ac263de87.jpg', '9a662b4c-61fa-45e7-81eb-c2b42ed74b0e.jpg', '1.25', '2023-08-20', '2023-08-31', 'FP004'),
(5, 1, 'Red Bell Peppers', 'Vibrant and sweet red bell peppers for salads, stir-fries, or roasting.', '1.79', 'e1cae703-af9e-4045-9660-858201cc8483.jpg', '88c32df8-78b0-4c1b-b8f2-e23be8147cfd.jpg', '0.90', '2023-08-20', '2023-08-31', 'FP005'),
(6, 2, 'Classic Spaghetti', 'Traditional Italian spaghetti made from durum wheat.', '1.29', '8ace5deb-f9da-4494-afe4-6f6897b309e7.jpg', '5fe30326-466a-417d-a5e0-9b7369053f30.jpg', NULL, NULL, NULL, 'PS001'),
(7, 2, 'Basmati Rice', 'Aromatic long-grain rice ideal for Indian and Middle Eastern dishes.', '3.99', 'a9fe1726-8ef1-4f23-9ceb-8d9b95f320ca.jpg', 'c37f3fd2-1509-47b3-be6d-2494a5780e4b.jpg', NULL, NULL, NULL, 'PS002'),
(8, 2, 'Extra Virgin Olive Oil', 'Cold-pressed olive oil with a rich and fruity flavor.', '7.99', '16f18010-ec40-4b38-af82-48954fbf5b0d.png', '792da38f-a806-46f7-8e23-5f95a35a74d5.jpeg', NULL, NULL, NULL, 'PS003'),
(9, 2, 'All-Purpose Flour', 'Versatile unbleached flour for all your baking needs.', '2.49', '8f6107fe-5f5b-4fe3-9379-473304233937.png', '05337bc8-68f9-4ce2-8ab4-e877d8111a25.jpg', NULL, NULL, NULL, 'PS004'),
(10, 2, 'Canned Black Beans', 'Ready-to-eat black beans perfect for salads, soups, and stews.', '0.99', '050690fa-4db7-478d-9763-ab741580f8b2.png', 'c69a3a46-73c4-4035-a975-dcc8d7cca28e.jpg', NULL, NULL, NULL, 'PS005'),
(11, 3, 'Whole Milk', 'Fresh and creamy whole milk from local dairies', '2.99', 'ac545ad1-7a8c-41f2-a455-08cae9c037d1.jpg', '78e6e2b6-6683-452b-bf51-f08f758b7c42.jpg', NULL, NULL, NULL, 'DR001'),
(12, 3, 'Sharp Cheddar Cheese', 'Aged cheddar with a bold and tangy flavor, perfect for sandwiches or snacking.', '4.49', 'cabfe9be-f815-4f60-bc3c-93f6af8b11be.jpg', 'cda1327a-76f6-490f-af84-e70b0d2d95f4.jpg', NULL, NULL, NULL, 'DR002'),
(13, 3, 'Greek Yogurt', 'Thick and creamy yogurt, great for breakfast or smoothies.', '1.29', 'd1379f29-5106-4007-8f5a-588977d2a00b.jpg', '2c058680-d0e0-406a-8d3c-8d9f9300b20e.jpg', NULL, NULL, NULL, 'DR003'),
(14, 3, 'Unsalted Butter', 'Creamy and versatile butter for baking and cooking.', '3.49', 'b8be6052-8ed9-489f-a045-ce193acdf50e.jpg', 'aa4b316b-644b-49f8-beb6-da85bb78dc29.jpg', NULL, NULL, NULL, 'DR004'),
(15, 3, 'Cage-Free Large Brown Eggs', 'Nutritious and flavorful eggs from cage-free hens.', '2.99', 'c99ca8f0-d1d0-4596-a15b-6e40b7def3f0.jpg', '76c82cbf-fbb6-4388-9f0a-e65e5ad833e9.jpg', NULL, NULL, NULL, 'DR005'),
(16, 4, 'Cheese Pizza', 'Classic frozen cheese pizza with a crispy crust and savory tomato sauce.', '5.99', '75b4229f-60e3-4630-b088-d1fbbedf56fc.png', '248c032b-0c27-4541-ad71-b0053e90ef44.jpg', NULL, NULL, NULL, 'FF001'),
(17, 4, 'Mixed Vegetables', 'A colorful blend of corn, peas, carrots, and green beans.', '2.49', 'c066b2a3-1c9f-4fab-bcb2-baf38c193128.jpg', '7c3462c5-dace-4ed0-a946-b347f64ef7b1.jpg', NULL, NULL, NULL, 'FF002'),
(18, 4, 'Chicken Pot Pie', 'A comforting and hearty pot pie with tender chicken, vegetables, and a flaky crust.', '3.99', '91124ea0-d07d-47ca-89e7-3b1616a03029.jpg', '1bf65a21-2542-4599-abc3-d42539899ae3.jpg', NULL, NULL, NULL, 'FF003'),
(19, 4, 'Vegetable Stir-Fry Mix', 'A blend of Asian vegetables for quick and easy stir-fries.', '3.49', 'bf57be65-f78c-4672-9a1a-621ecacf7d67.jpg', '91850d1f-228b-40f5-a97f-49c6e3abfb82.jpg', NULL, NULL, NULL, 'FF004'),
(20, 4, 'Chocolate Chip Cookie Dough Ice Cream', 'Creamy vanilla ice cream with chunks of chocolate chip cookie dough.', '4.99', '5d5bedd2-3833-4266-84d4-f6d6f13555f9.jpg', '080acc1c-4cf7-473d-9b95-a1cc1e14c8d6.jpg', NULL, NULL, NULL, 'FF005'),
(21, 5, ' Classic Potato Chips', 'Crispy and lightly salted potato chips, perfect for snacking.', '2.99', '1be3d5e3-553f-44b7-a900-e3e21c6eb66c.jpg', 'b3851ba2-217c-40ed-a0cf-06f4d494c661.jpg', NULL, NULL, NULL, 'SB001'),
(22, 5, 'Dark Chocolate Almonds', 'Roasted almonds covered in rich dark chocolate.', '4.99', '356acaf2-6973-46dd-bc11-0c102e28a717.jpg', '2167b5ee-63a3-4b9f-9b16-cd7f8d7c0862.jpg', NULL, NULL, NULL, 'SB002'),
(23, 5, 'Sparkling Water', 'Refreshing and lightly carbonated water, free from added sugars or artificial flavors.', '0.99', '78cf3434-9e9b-4ae5-8097-036f12706c49.jpg', 'f9a9e35c-f1e8-4899-8a91-a9e5f227478d.jpg', NULL, NULL, NULL, 'SB003'),
(24, 5, 'Green Tea Bags', 'Aromatic green tea bags, rich in antioxidants and natural flavor.', '3.49', '503479f3-7cfb-4fb5-aee4-f91b9ec17c01.jpg', '111d2525-28c7-4bb7-a661-4c099c00b42d.jpg', NULL, NULL, NULL, 'SB004'),
(25, 5, 'Orange Juice', 'Fresh and pure orange juice, made from concentrate.', '2.99', '5751c65e-caca-4e45-9b82-759079fe39f5.jpg', '8b01b003-2e05-4a7c-b733-2974aed542ae.jpg', NULL, NULL, NULL, 'SB005'),
(60, 1, 'Bananas', 'Sweet and potassium-rich bananas for a healthy snack\r\n', '0.59', '442b10f2-8cc8-488a-ba1d-f9a360b3be85.jpg', '57f032d5-2f14-45ce-878e-6935421481e3.jpg', '0.30', '2023-08-20', '2023-08-31', 'FP006'),
(61, 1, 'Sweet Corn', 'Fresh and sweet corn on the cob, perfect for grilling or boiling', '0.79', '8a7c8ede-a7ac-4ae8-a032-4a17e5f42899.webp', NULL, '0.40', '2023-08-20', '2023-08-31', 'FP008'),
(62, 1, 'Blueberries', 'Fresh and antioxidant-rich blueberries, great for snacking or baking', '3.99', '187eead1-60ee-4356-bf8f-56790e05bd66.jpg', '78581a51-538d-4713-afab-b70794a124fd.jpg', '2.00', '2023-08-20', '2023-08-31', 'FP009'),
(63, 1, 'Organic Avocados', 'Creamy and heart-healthy avocados, great for salads or making guacamole', '1.69', 'c145f597-b7c5-42fe-bbc9-2056eaf66a4f.jpg', NULL, '0.85', '2023-08-20', '2023-08-31', 'FP010'),
(64, 2, 'Rolled Oats', 'Nutritious and versatile oats for breakfast or baking', '2.99', '3bfbf512-5593-4596-95d2-da3bed69c542.jpg', 'fa93424a-fea7-442c-84e2-1f1091429346.jpg', NULL, NULL, NULL, 'PS006'),
(65, 2, 'Chunky Peanut Butter', 'Protein-rich peanut butter with chunks of peanuts for texture', '2.99', 'ddba4393-60df-46b4-8095-17a112985497.png', 'dbaeda0e-1a8e-406a-bb5b-e8ec25c29158.webp', NULL, NULL, NULL, 'PS007'),
(66, 2, 'Canned Tuna', 'Ready-to-eat light tuna in water, perfect for sandwiches or salads', '1.49', 'e12895c3-96e0-481d-9687-6180238457d5.jpg', '9452f306-8959-41de-9dcf-351a0da39180.jpg', NULL, NULL, NULL, 'PS008'),
(67, 2, 'Raw Honey', 'Pure and unfiltered honey, great as a sweetener or for baking', '6.99', '31f9bab0-2be2-47d1-ba5c-81e9d73f8722.webp', '6a03ab42-ea0d-4f5b-b2d8-963428ec280a.jpg', NULL, NULL, NULL, 'PS009'),
(68, 3, 'Half and Half', 'Creamy and versatile half and half for coffee or cooking', '2.49', '1dad79e0-4088-4b2c-85ed-d4f1f8a6f77e.webp', '8a8214c1-a687-4eed-ba13-bc8878cefe6f.jpg', NULL, NULL, NULL, 'DR006'),
(69, 3, 'Sliced Swiss Cheese', 'Nutty and mild Swiss cheese slices, perfect for sandwiches', '3.99', '12d46e8c-ec35-43ad-b85c-836d21ac2d40.jpg', NULL, NULL, NULL, NULL, 'DR008');

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `percentageDiscount` int(11) DEFAULT NULL,
  `amountDiscount` int(11) DEFAULT NULL,
  `finalPriceDiscount` decimal(6,2) DEFAULT NULL,
  `products` longtext NOT NULL,
  `isActive` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `promotions`
--

INSERT INTO `promotions` (`id`, `name`, `startDate`, `endDate`, `percentageDiscount`, `amountDiscount`, `finalPriceDiscount`, `products`, `isActive`) VALUES
(68, 'June - orange juice 50% off', '2023-06-23', '2023-06-30', 50, NULL, NULL, '[\"SB005\"]', 0),
(76, '50% off on veggic', '2023-08-20', '2023-08-31', 50, NULL, NULL, '[\"FP001\",\"FP002\",\"FP003\",\"FP004\",\"FP005\",\"FP006\",\"FP008\",\"FP009\",\"FP010\"]', 1),
(77, '30% off', '2023-08-22', '2023-08-31', 30, 0, '0.00', '[\"FP006\"]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `review` varchar(250) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `productId`, `rating`, `review`, `userId`, `date`) VALUES
(1, 2, 4, 'very lovley lettuce!', 1, '2023-05-20'),
(2, 3, 5, 'the best spinach in the world!!', 1, '2023-05-31'),
(3, 6, 5, 'cool spaghetti! i love it!!!', 1, '2023-05-25'),
(19, 3, 4, 'it was very fresh and tasty!', 9, '2023-05-26'),
(21, 2, 5, 'absolutely fabulous!', 9, '2023-05-26'),
(43, 19, 1, 'bad very bad', 1, '2023-06-23'),
(44, 65, 5, 'i love it!!', 1, '2023-06-26'),
(45, 62, 3, 'tasty and healthy! bus small package...', 20, '2023-06-26'),
(46, 24, 5, 'the best green tea :)', 20, '2023-06-26'),
(47, 8, 4, 'tried and true!', 20, '2023-06-26'),
(48, 5, 4, 'lovley peppers. fresh and clean', 9, '2023-06-26'),
(49, 1, 3, 'sweet ans fresh, but need a goode wash.', 22, '2023-06-26'),
(50, 15, 5, 'perfect eggs! love it!', 22, '2023-06-26'),
(51, 2, 4, 'came clean and fresh.', 22, '2023-06-26'),
(52, 63, 4, 'good avocados. a bit hard.', 21, '2023-06-26'),
(53, 4, 5, 'big red and juicy!', 21, '2023-06-26'),
(54, 21, 5, 'goes good with a cold beer!', 21, '2023-06-26'),
(55, 5, 5, 'beautiful red peppers ', 23, '2023-06-26'),
(56, 25, 5, 'as if they were squeezed today', 23, '2023-06-26'),
(57, 10, 2, 'didnt care for it much', 23, '2023-06-26'),
(58, 24, 4, 'good aroma and nice flavor.', 23, '2023-06-26'),
(59, 9, 5, 'great for baking cakes', 23, '2023-06-26'),
(60, 6, 5, 'very nice texture', 29, '2023-06-26'),
(61, 3, 5, 'very good!', 20, '2023-08-21');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `idCardNumber` int(9) NOT NULL,
  `city` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `roleId` int(11) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `idCardNumber`, `city`, `address`, `roleId`, `password`) VALUES
(1, 'Dima', 'Blank', 'dimonblank@gmail.com', 305560131, 'Rehovot', 'Nave Alon, 16', 1, 'e09be89f60e7c9d6d6d03ad02fd0e181e7f9e8c12267d544d36722b0e0cd8d377cdec6e51a891afab4c6287423be6ffacff0cb633b4347f10956e7e0b6c2c2c7'),
(2, 'Alex', 'Boom', 'Alex@gmail.com', 309860634, 'Bat Yam', 'Tkumaa, 12', 2, 'da853f55c33abbf22333683dacda11e1d6c8db2ca07d0d8eb85e227a2125c5c08d0d5663dc611d217a1a11e999def4e2860883361ca50c62eb2809920c2aeeea'),
(4, 'Kima', 'Kurdation', 'kima@gmail.com', 307561554, 'Rishon Lezion', 'Herzel, 23', 2, '1fcbc69d9ca31ba010876d47009d8c11218f1d229b446235c8727d74a5d4861b42098f5ffac1cd0f370871ce7893112f655a6f91d23539e422e881bc02061a93'),
(9, 'Yulia', 'Blank', 'Yulia@gmail.com', 53418486, 'Haifa', 'Herzel, 5', 2, '0672723ba0c1397d8123fc92fbaa74f704b7abb1caf3721ad3b853c0d5a89eda27cdfba9d97bd82675dbae14b45a2b7594de4a34c856012390a65c9009f71e37'),
(20, 'emma', 'blank', 'emma@gmail.com', 306676131, 'Tel Aviv', 'herzel 2', 2, '351bcac34268789f6224098f40cb35465013f2b8a067888cf9e53bc9014aeb4ff35321f678283095247da5e08c49267cf356fd759361b3e8447786810a206419'),
(21, 'jeck', 'sparrow', 'jeck@gmail.com', 306676888, 'London', 'beatles st', 2, '779908d3f1e9e66aa41e1c69849b01ed7134d89b1b1674db0c0469e9dac070ad6d343f6a802c1fbff86a2c9b2f74b0fd67cade33551b9f2fbc179b1a3e989c92'),
(22, 'carmel', 'secr', 'carmel@gmail.com', 306676222, NULL, NULL, 2, 'a4e4f660a7ff89a252269ba9920192527c2827097791dddf9b9bf97d0abb7c1d060935dafca912f17d0c716dbc3b87a8942514e05e9ab49dced0ca4b707ac5d9'),
(23, 'james', 'bond', 'jamesbond@gmail.com', 123456789, NULL, NULL, 2, '8b0062aa990714786a643325f81b444e0022aedd14218c79e7875f2c0a94c04c4975c79182d683a3ee9c3e1085281a0e72e481c9c7d1f5eeacd4b16c80e1588a'),
(28, 'Jeck', 'Sparrow', 'sparrow@gmail.com', 446676455, 'Bat Yam', 'Tkumaa, 12', 2, '524856dec23963f38c0100c3605f009f4ee513e74286bbc255ad7438f128e7f901eaf070d101f2ee54d67489c64655bc85b9e0a8f702d716fc9661855e62f073'),
(29, 'lock', 'stock', 'lock@gmail.com', 897845634, 'NY', '1st Ave', 2, '07dd1b6987e899e4d71744c295a7849e66bae97912383a1246095ad3cfa074062a4e801c48a24c5e241a7ffe87ed27991df6b22327c06be3e28340228954018f');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `cart_details`
--
ALTER TABLE `cart_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index` (`productId`),
  ADD KEY `cartId` (`cartId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index` (`userId`),
  ADD KEY `cartId` (`cartId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index` (`categoryId`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleId` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `cart_details`
--
ALTER TABLE `cart_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1021;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `cart_details`
--
ALTER TABLE `cart_details`
  ADD CONSTRAINT `cart_details_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_details_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
