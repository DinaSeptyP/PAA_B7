-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2023 at 06:59 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paa01fix`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id_customer` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id_customer`, `username`, `email`, `password`) VALUES
(1, 'kkusuma', 'lskfdal@gmail.com', '$2a$10$BkR37fRJdgfTjdU2vXRhiusxgNTneVBYwQwXCcZqkef2eY7Vx5bjq'),
(2, 'kusuma99', 'kusuma99@gmail.com', '$2a$10$JATf789ui6lbG/y3CCFc6eLPGK0hu8.8QglKWTlVR/2a1S74dIxh.'),
(3, 'kusuma', 'kusuma99@gmail.com', '$2a$10$SNrFK/SUlFQL0hVY9zez0.0I1AXmob618nYqdbBo2XrCGCoO/xYXy'),
(4, 'kusuma10', 'kusuma10@gmail.com', '$2a$10$qcs4NFMYk12L94VWmOaNV.c.lIQ.Ifl/lwbzP3.cP/tq5PJhCO3oG'),
(5, 'cust', 'cust@gmail.com', '$2a$10$whUjshurz6treOj9nZlpnOQvjxkYsPrbB/vmGK7zaAv4LnlJnj/sm'),
(6, 'customer', 'customer@gmail.com', '$2a$10$PbnRhqv2g3TzLmH5R750Peo9RHxhO3frEUoZoMju4OiffLcVuXjgu');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations`
--

CREATE TABLE `knex_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `knex_migrations`
--

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '20230405021651_create_post_table.js', 1, '2023-04-06 09:09:45'),
(2, '20230405091825_create_users_table.js', 1, '2023-04-06 09:09:45');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations_lock`
--

CREATE TABLE `knex_migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `knex_migrations_lock`
--

INSERT INTO `knex_migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `id_pesanan` int(11) NOT NULL,
  `tanggal_selesai` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 100,
  `id_produk` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `total_harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`id_pesanan`, `tanggal_selesai`, `status`, `id_produk`, `id_customer`, `total_harga`) VALUES
(48, '2023-08-04T05:26:52.442Z', 100, 20, 2, 6288),
(57, '2023-06-28T14:11:19.758Z', 100, 26, 5, 1750000),
(58, '2023-06-24T14:12:45.803Z', 100, 20, 5, 1120000),
(59, '2023-06-23T14:12:48.949Z', 100, 21, 5, 400000),
(60, '2023-06-24T14:13:02.182Z', 100, 20, 5, 1120000),
(61, '2023-06-23T14:13:04.102Z', 100, 21, 5, 400000),
(62, '2023-06-24T14:41:52.947Z', 100, 20, 6, 1120000),
(63, '2023-06-24T14:41:52.947Z', 100, 20, 6, 1120000),
(64, '2023-06-23T14:42:54.999Z', 100, 21, 6, 400000);

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id` int(10) UNSIGNED NOT NULL,
  `nama_barang` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `harga` bigint(20) DEFAULT NULL,
  `stok` int(11) DEFAULT NULL,
  `url_gambar` varchar(255) DEFAULT NULL,
  `estimasi` int(11) NOT NULL,
  `batas_tawaran` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 100
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id`, `nama_barang`, `deskripsi`, `harga`, `stok`, `url_gambar`, `estimasi`, `batas_tawaran`, `status`) VALUES
(20, 'Tumbler', 'Tumbler kaca', 56000, 20, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2020/9/9/db0e6abb-704c-40e3-b5d6-a0e8ad0fc433.jpg', 3, '2023-06-24T15:00', 500),
(21, 'Mug', 'Mug keramik', 40000, 10, 'https://xilindo.com/wp-content/uploads/bikin-Mug-Custom-Warna-Putih-xilindo-1.webp', 2, '2023-07-20T17:15', 100),
(22, 'Sepatu Custom', 'sepatu lukis sesuai kreativitas', 420000, 5, 'https://img.okezone.com/content/2019/02/08/194/2015568/tren-sepatu-custom-ini-alasan-banyak-orang-rela-bayar-mahal-cYSoLsRROx.jpg', 12, '2023-07-05T17:16', 100),
(23, 'Bantal Custom lucu', 'bantal custom sesuai gambar', 45000, 50, 'https://filebroker-cdn.lazada.co.id/kf/S37302693a54d444d9e9935a15b4038b9r.jpg', 7, '2023-06-30T17:29', 100),
(24, 'Casing iPhone', 'casing iphone bahan softcase', 60000, 12, 'https://s.omgs.in/wp-content/uploads/2020/09/Custom-Text-iPhone-Transparent-Case-500x500.jpg', 5, '2023-07-10T20:30', 100),
(25, 'Topi Custom Bordir', 'topi yang dapat di-custom', 56000, 20, 'https://elncostudio.com/wp-content/uploads/2021/05/TOPI.jpg', 3, '2023-06-28T20:31', 100),
(26, 'Kaos Sablon', 'bahan sablon berkualitas tidak mudah mengelupas', 70000, 25, 'https://lzd-img-global.slatic.net/g/p/9a18f392174dde1558c439eaacb5952c.jpg_720x720q80.jpg_.webp', 7, '2023-07-05T20:33', 100),
(27, 'Totebag Custom', 'totebag ukuran 40x30', 35000, 5, 'https://elncostudio.com/wp-content/uploads/2021/05/TOTEBAG-35x-40-CUSTOM.jpg', 3, '2023-07-03T20:35', 100);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`) VALUES
(1, 'jati@gmail.com', '$2a$10$L3Ik9AVzAxy0.N2Y19gXguIZSWqms8Vp3CuzqXLVEJO1PygO8P5Ae'),
(2, 'bima@gmail.com', '$2a$10$LAVawyGX9V6Gmqsojrz3Ge1/KZV7JqpHPWbdGTqFJxm.nXLhwgT.e'),
(3, 'fayza@mail.com', '$2a$10$/jkiMcRGrAwvnbE3ZtKR2uO4KnEdt.5XaNQTEHPXBn.z5SmRdgweS'),
(4, 'test01@gmail.com', '$2a$10$vb92Jvbuav46aVOKkyBhmuVYCxud8c7vmZ8uMegqSswWp2aLnijK2'),
(5, 'kusuma01@gmail.com', '$2a$10$hXugovPXB2Aer26W/knPWOBRB66Hd90kcqt1uG0WXAnHPATW/EKUy'),
(6, 'jati2@gmail.com', '$2a$10$NsznNpsmkESE6CcSYaWzzukGVDRuFAd0IMCkM1u8rj9GMDaiUcXDO'),
(7, 'jati03@gmail.com', '$2a$10$aDK9GsvpjMxEA62ZAQ.ImeVGckm5i9dp9wSLCrbEvLOa2Cw9i7F6y'),
(10, 'customer01@gmail.com', '$2a$10$F7EKKdogR9029lDfZdpMyuw0CrJ9YJLcstDoCz4/nMaa25ia3yw5C'),
(11, 'customer01@gmail.com', '$2a$10$ha7YJ8.nOYs6KsB5vLTlOO37mqD2UBeQEsd6xeK827vEELcnzFdOS'),
(14, 'bima@gmail.com', '$2a$10$oD2YCuxLGxICjb9A45S7.uOlZNbSYsLA8lX0frjUv/J8gk2eDt1fy'),
(15, 'jati@gmail.com', '$2a$10$NafwAK35tJSp8fWR5wvLYOcFuDxIFOKrG6AD5soihEnJl.fHwboWK'),
(16, 'admin@gmail.com', '$2a$10$5MRrmP2.clj4dFYj91Rjxe6zwJT2ZSVeTP4VQlS/7JinB/0Ekefgy'),
(17, 'admin1@gmail.com', '$2a$10$fcTHTs3sZJQNq5MxsTHVyu2Uw6ToI3.arbfVodffLeyjFfdxrm3Xi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_customer`);

--
-- Indexes for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id_pesanan`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
