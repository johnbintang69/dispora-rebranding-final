import React from 'react';
import { FaUsers, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const komunitasData = [
  {
    id: 1,
    nama: "Komunitas Lari Semarang",
    jenis: "Olahraga",
    alamat: "Jl. Diponegoro No. 100, Semarang",
    telepon: "(024) 1234567",
    email: "lari@semarangkota.go.id",
    deskripsi: "Komunitas pecinta lari yang aktif menggelar berbagai kegiatan lari di Kota Semarang",
    prestasi: [
      "Juara 1 Lari 10K Tingkat Kota 2023",
      "Sertifikasi Komunitas Sehat 2022",
      "Partisipan Terbanyak dalam Semarang Marathon 2023"
    ],
    kegiatan: [
      "Lari Pagi Minggu",
      "Workshop Pelatihan Lari",
      "Kegiatan Sosial",
      "Pertandingan Internal"
    ]
  },
  {
    id: 2,
    nama: "Komunitas Basket Semarang",
    jenis: "Olahraga",
    alamat: "Jl. Menteri Supeno No. 2, Semarang",
    telepon: "(024) 1234568",
    email: "basket@semarangkota.go.id",
    deskripsi: "Komunitas basket yang berfokus pada pengembangan bakat pemain muda",
    prestasi: [
      "Juara 2 Kejuaraan Basket Tingkat Provinsi 2023",
      "Pembinaan Atlet Terbaik 2022",
      "Kolaborasi dengan Sekolah-sekolah Kota Semarang"
    ],
    kegiatan: [
      "Pertandingan Mingguan",
      "Klinik Basket",
      "Pembinaan Pemula",
      "Turnamen Komunitas"
    ]
  },
  {
    id: 3,
    nama: "Komunitas Renang Semarang",
    jenis: "Olahraga",
    alamat: "Jl. Tirtoyoso Raya No. 15, Semarang",
    telepon: "(024) 1234569",
    email: "renang@semarangkota.go.id",
    deskripsi: "Komunitas renang yang berfokus pada pengembangan atlet renang muda",
    prestasi: [
      "Juara 1 Kejuaraan Renang Tingkat Kota 2023",
      "Prestasi Terbaik di PON 2022",
      "Kolaborasi dengan Pelatih Internasional"
    ],
    kegiatan: [
      "Latihan Harian",
      "Pertandingan Internal",
      "Klinik Renang",
      "Pembinaan Pemula"
    ]
  }
];

const ProfilKomunitas = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="text-3xl md:text-4xl font-bold text-center text-navy mb-12"
        variants={titleVariants}
      >
        <FaUsers className="inline-block mr-3 mb-1" />
        Profil Komunitas Olahraga
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {komunitasData.map((komunitas) => (
          <motion.div 
            key={komunitas.id} 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            variants={cardVariants}
            custom={komunitas.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-navy">{komunitas.nama}</h2>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                {komunitas.jenis}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">{komunitas.deskripsi}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <FaMapMarkerAlt className="inline-block mr-2 text-gray-500" />
                <span className="text-sm text-gray-600">{komunitas.alamat}</span>
              </div>
              <div>
                <FaPhone className="inline-block mr-2 text-gray-500" />
                <span className="text-sm text-gray-600">{komunitas.telepon}</span>
              </div>
              <div>
                <FaEnvelope className="inline-block mr-2 text-gray-500" />
                <span className="text-sm text-gray-600">{komunitas.email}</span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Prestasi</h3>
              <ul className="space-y-1">
                {komunitas.prestasi.map((prestasi, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    <span className="text-yellow-500 mr-2">•</span>
                    {prestasi}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Kegiatan Rutin</h3>
              <ul className="space-y-1">
                {komunitas.kegiatan.map((kegiatan, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    <span className="text-gray-500 mr-2">•</span>
                    {kegiatan}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-12 text-center"
        variants={buttonVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <button className="bg-navy text-white px-8 py-3 rounded-lg hover:bg-navy/90 transition-all duration-300 hover:shadow-lg">
          Lihat Selengkapnya
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProfilKomunitas;
