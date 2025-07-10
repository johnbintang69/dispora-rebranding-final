-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2025 at 05:38 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `disporasemarang_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','editor') DEFAULT 'editor',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `username`, `password`, `nama_lengkap`, `email`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin@example.com', 'admin', '2025-06-18 04:45:17', '2025-06-18 04:45:17');

-- --------------------------------------------------------

--
-- Table structure for table `berita`
--

CREATE TABLE `berita` (
  `id_berita` int(11) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `ringkasan` text DEFAULT NULL,
  `isi` longtext NOT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `berita`
--

INSERT INTO `berita` (`id_berita`, `id_admin`, `judul`, `slug`, `ringkasan`, `isi`, `gambar`, `status`, `tanggal`, `created_at`, `updated_at`) VALUES
(12, 1, 'MAHASISWA DITEMUKAN TERKAPAR KARENA DIKEJAR DEADLINE!', 'mahasiswa-ditemukan-terkapar-karena-dikejar-deadline', 'Mahasiswa ditemukan terkapar di kamar kos', 'Semarang, 18 Juni 2025 — Seorang mahasiswa berinisial R, dari jurusan Teknik Menunda Pekerjaan, ditemukan dalam kondisi setengah sadar dan penuh kecemasan setelah dikejar oleh makhluk mengerikan bernama Deadline.\r\n\r\nMenurut saksi mata di kos-kosan Blok F, korban terlihat sedang menulis skripsi sambil menangis, tertawa, lalu terdiam selama 4 jam menatap kursor berkedip. Ia hanya makan mi instan mentah dan menyeruput kopi yang entah sudah sedingin apa.\r\n\r\n\"Awalnya kami kira dia meditasi,\" kata Dani, teman kosnya. \"Tapi pas kami dekati, dia justru bisik-bisik \'BAB 4... BAB 4... revisi...\' berulang-ulang.\"\r\n\r\n🔍 Penyelidikan Awal: Teror Bernama Tenggat Waktu\r\nTim investigasi menemukan berbagai jejak kengerian: catatan penuh coretan, sticky notes yang isinya cuma kata \"OTW Bu\", serta riwayat chat dengan dosen pembimbing yang belum dibalas sejak zaman kolonial akademik.\r\n\r\nKorban sendiri, saat siuman, hanya mampu berucap:\r\n\r\n\"Kenapa 24 jam cuma segini rasanya...\"\r\n\"Baru tidur 15 menit tapi udah subuh...\"\r\n\"Plagiat tuh dosa nggak sih?\"\r\n\r\n🚑 Penanganan dan Rehabilitasi\r\nR saat ini dirawat di Unit Gawat Waktu dan diberikan terapi intensif berupa tidur siang tanpa alarm, makan bergizi tanpa mi instan, dan dipeluk oleh kucing kampus.\r\n\r\nPihak kampus menghimbau mahasiswa lain agar tidak menyepelekan makhluk bernama Deadline.\r\n\"Kami tahu dia tak terlihat, tapi dia nyata. Dan dia berlari lebih cepat dari niat,\" kata pihak kampus sambil membagikan brosur berjudul \'Kenali Gejala Akut Deadlineitus\'.\r\n\r\n📣 Tips Selamat dari Kejaran Deadline\r\nJangan tunggu inspirasi. Tunggu dosen nge-chat marah.\r\n\r\nKerjakan tugas sedikit demi sedikit (meski tetap akan dikerjakan H-1).\r\n\r\nSelalu sedia kopi, charger, dan aplikasi pendeteksi plagiat.\r\n\r\nJangan percaya kalimat “Masih bisa nanti malem.”\r\n\r\n', '/uploads/gambar-1750241579338-654791898.jpg', 'published', '2025-06-18 10:12:59', '2025-06-18 10:12:59', '2025-06-18 10:14:01'),
(13, 1, 'MAHASISWA AJAK DUEL DOSEN KARENA TUGAS YANG TIDAK MASUK AKAL', 'mahasiswa-ajak-duel-dosen-karena-tugas-yang-tidak-masuk-akal', 'Seorang dosen di sebuah universitas ternama dilaporkan hampir diajak duel oleh mahasiswanya sendiri usai memberikan tugas yang dianggap \"tidak manusiawi, tidak akademis, dan kemungkinan ditulis saat beliau sedang lapar.\"', 'Semarang, 18 Juni 2025 – Seorang dosen di sebuah universitas ternama dilaporkan hampir diajak duel oleh mahasiswanya sendiri usai memberikan tugas yang dianggap \"tidak manusiawi, tidak akademis, dan kemungkinan ditulis saat beliau sedang lapar.\"\r\n\r\nMahasiswa berinisial ZK (20), tampak frustrasi setelah menerima instruksi tugas sepanjang 3 halaman, dengan deadline 2 hari, dan catatan kecil bertuliskan:\r\n\r\n“Jawaban minimal 20 halaman, diketik tangan, tulis latin, dikumpulkan sebelum matahari terbit.”\r\n\r\nZK yang semula hanya ingin lulus tepat waktu, berubah menjadi seorang filsuf jalanan.\r\n\r\n“Saya ingin bertanya: apakah tugas ini untuk mendidik, atau untuk menyiksa? Jika saya ingin menderita, saya tidak perlu kuliah. Cinta saja cukup,” ujarnya sambil memeluk printer.\r\n\r\n🔥 Ajakan Duel Terjadi di Grup WhatsApp Kelas\r\nMenurut saksi mata (admin grup), insiden dimulai saat ZK mengirim pesan bercanda:\r\n\r\n“Pak, kalau berani kasih tugas segila ini, berani juga dong duel logika sama saya. Arena parkiran, jam 7 pagi.”\r\n\r\nTak disangka, sang dosen membalas dengan stiker \"SIAP!\" lalu mengirim file PDF tambahan berjudul “Referensi Tambahan (120 halaman, Bahasa Belanda).”\r\n\r\n😱 Reaksi Kelas\r\nGrup WhatsApp langsung memanas. Beberapa mahasiswa langsung ganti nama menjadi \"Korban Sistem\", \"Pejuang SKS\", dan satu orang hanya kirim emoji lilin.\r\n\r\nSalah satu mahasiswa, TY, mengaku sudah memesan minuman isotonik dan balsem untuk menghadapi minggu ini.\r\n\r\n“Ini bukan minggu UTS. Ini minggu ujian iman,” katanya.\r\n\r\n🧑‍🏫 Klarifikasi Dosen\r\nSaat dikonfirmasi, dosen yang bersangkutan mengaku tidak bermaksud menyiksa mahasiswa.\r\n\r\n“Saya hanya ingin menguji daya tahan mental mereka, siapa tahu nanti lulus jadi menteri pendidikan,” katanya sambil menata koleksi tugas mahasiswa yang belum pernah dibaca.\r\n\r\n✅ Update Terakhir\r\nZK akhirnya tidak benar-benar mengajak duel fisik, tetapi mengajak dosen untuk “berpikir bersama tentang esensi pendidikan.”\r\nDosen menyetujui, lalu memberikan tugas baru: Tuliskan esensi pendidikan dalam 10.000 kata, referensi minimal 30 jurnal internasional, dikumpulkan hari Minggu jam 05.00 pagi.\r\n\r\nZK saat ini sedang mengisi formulir cuti akademik.\r\n\r\n', '/uploads/gambar-1750242904434-688911148.jpg', 'published', '2025-06-18 10:35:04', '2025-06-18 10:35:04', '2025-06-18 18:26:03'),
(14, 1, ' MU DIHAJAR NEWCASTLE: TAWA ONANA LIHAT PENAMPILAN BAYINDIR', 'mu-dihajar-newcastle-tawa-onana-lihat-penampilan-bayindir', 'Manchester United dihajar Newcastle United 1-4, dengan Ruben Amorim memainkan Altay Bayindir. Meme menggambarkan Andre Onana cuma bisa tersenyum.', 'Manchester, 18 Juni 2025 – Kekalahan telak Manchester United dari Newcastle dengan skor 4-0 tidak hanya membuat fans geram, tapi juga menimbulkan fenomena baru di bangku cadangan: Andre Onana terlihat tertawa kecil sambil meminum air minumnya sendiri ketika Altay Bayındır kebobolan gol keempat.\r\n\r\nMomen ini terekam kamera dan segera viral di media sosial dengan caption seperti:\r\n\r\n“Onana tertawa bukan karena senang, tapi karena akhirnya dia bukan satu-satunya yang dikritik.”\r\n“Welcome to my world, bro.”\r\n\r\n🧤 DEBUT MENEGANGKAN UNTUK BAYINDIR\r\nAltay Bayındır, yang dipercaya mengawal gawang MU karena Onana cedera ringan (atau pura-pura lupa sarung tangan), justru tampil seperti sedang main tebak-tebakan arah bola.\r\n\r\n“Saya pikir bola itu hanya lewat, tidak niat masuk,” kata Bayındır dengan logat tenangnya.\r\n“Lawan terlalu cepat. Saya masih login saat gol kedua.”\r\n\r\n📹 REAKSI ONANA: CAMPUR ADUK TAPI KAYAKNYA SENENG\r\nMenurut analisa lip reader (pembaca bibir), Onana diduga berkata:\r\n\r\n“Rasain tuh! Susah kan! Bukan salah saya mulu sekarang!”\r\nSambil menyeruput botol minumnya seperti villain Marvel.\r\n\r\nBeberapa fans menyebut ekspresi Onana mirip seperti “senior yang akhirnya lihat junior kena marah dosen juga.”\r\n\r\n🧠 KOMENTAR LEGENDA: “SEMUA KIPER MU SEKARANG COCOKNYA JADI MC NIKAH”\r\nGary Neville dalam komentarnya mengatakan,\r\n\r\n“Saya tidak yakin siapa yang pantas jadi kiper utama MU sekarang. Yang satu terlalu percaya diri, yang satu terlalu tenang, dan gawangnya terlalu besar.”\r\n\r\n📝 SOLUSI TERAKHIR: KIPER BOT DARI FIFA 23\r\nFans di Twitter menyarankan agar MU memakai AI Goalkeeper dari FIFA 23 karena lebih bisa diandalkan daripada manusia. Bahkan akun parody MU sempat bikin polling:\r\n\r\n“Siapa yang harus jaga gawang minggu depan?”\r\nPilihan:\r\n\r\n-Onana 😬\r\n\r\n-Bayındır 😓\r\n\r\n-De Gea (dalam mimpi)\r\n\r\n-Bapak RT yang jaga pos ronda\r\n\r\n', '/uploads/gambar-1750262365781-731463397.png', 'published', '2025-06-18 15:59:26', '2025-06-18 15:59:26', '2025-06-18 15:59:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `berita`
--
ALTER TABLE `berita`
  ADD PRIMARY KEY (`id_berita`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `id_admin` (`id_admin`),
  ADD KEY `idx_berita_judul` (`judul`),
  ADD KEY `idx_berita_status` (`status`),
  ADD KEY `idx_berita_tanggal` (`tanggal`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `berita`
--
ALTER TABLE `berita`
  MODIFY `id_berita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `berita`
--
ALTER TABLE `berita`
  ADD CONSTRAINT `berita_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
