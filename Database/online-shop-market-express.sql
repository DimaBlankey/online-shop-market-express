-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2023 at 01:29 PM
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
  `dateOfDelivery` date NOT NULL,
  `dateOfPurchase` date NOT NULL,
  `creditCardNum` int(11) NOT NULL,
  `productsAndQuantity` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`productsAndQuantity`))
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

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
(1, 1, ' Gala Apples', 'Sweet and crisp apples perfect for snacking or baking.', '1.49', 'dfe1cda6-60f4-4f7e-925e-f1691c5d60bf.jpg', '30cbe217-066d-43c9-954d-de949b6eab18.jpg', NULL, NULL, NULL, 'FP001'),
(2, 1, 'Romaine Lettuce', 'Fresh and crunchy lettuce, ideal for salads and sandwiches', '1.99', '51e3d677-b16f-426c-b8b9-2a899612a9ae.jpg', 'e448be5b-de6b-44cc-b62d-72d8adcb9ef9.jpg', NULL, NULL, NULL, 'FP002'),
(3, 1, 'Organic Baby Spinach', 'Tender and nutrient-packed baby spinach leaves, great for salads and cooking.', '3.99', '66d1d66d-b421-448f-9255-d9ea2be3d072.jpg', '3bd1243b-c7eb-44c4-b573-219c4fb205b3.jpg', NULL, NULL, NULL, 'FP003'),
(4, 1, 'Vine-Ripened Tomatoes', 'Juicy and flavorful tomatoes for salads, sandwiches, or cooking.', '2.49', '840901c7-06e5-4078-822c-820ac263de87.jpg', '9a662b4c-61fa-45e7-81eb-c2b42ed74b0e.jpg', NULL, NULL, NULL, 'FP004'),
(5, 1, 'Red Bell Peppers', 'Vibrant and sweet red bell peppers for salads, stir-fries, or roasting.', '1.79', 'e1cae703-af9e-4045-9660-858201cc8483.jpg', '88c32df8-78b0-4c1b-b8f2-e23be8147cfd.jpg', NULL, NULL, NULL, 'FP005'),
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
(25, 5, 'Orange Juice', 'Fresh and pure orange juice, made from concentrate.', '2.99', '5751c65e-caca-4e45-9b82-759079fe39f5.jpg', '8b01b003-2e05-4a7c-b733-2974aed542ae.jpg', NULL, NULL, NULL, 'SB005');

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
  `city` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `roleId` int(11) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `idCardNumber`, `city`, `address`, `roleId`, `password`) VALUES
(1, 'Dima', 'Blank', 'dimonblank@gmail.com', 305560131, 'Rehovot', 'Nave Alon, 15', 1, 'e09be89f60e7c9d6d6d03ad02fd0e181e7f9e8c12267d544d36722b0e0cd8d377cdec6e51a891afab4c6287423be6ffacff0cb633b4347f10956e7e0b6c2c2c7'),
(2, 'Alex', 'Boom', 'Alex@gmail.com', 309860634, 'Bat Yam', 'Tkumaa, 12', 2, 'da853f55c33abbf22333683dacda11e1d6c8db2ca07d0d8eb85e227a2125c5c08d0d5663dc611d217a1a11e999def4e2860883361ca50c62eb2809920c2aeeea'),
(4, 'Kima', 'Kurdation', 'kima@gmail.com', 307561554, 'Rishon Lezion', 'Herzel, 23', 2, '1fcbc69d9ca31ba010876d47009d8c11218f1d229b446235c8727d74a5d4861b42098f5ffac1cd0f370871ce7893112f655a6f91d23539e422e881bc02061a93');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart_details`
--
ALTER TABLE `cart_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  ADD CONSTRAINT `cart_details_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
