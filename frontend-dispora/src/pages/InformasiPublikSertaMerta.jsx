import React from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaCalendar, FaDownload } from 'react-icons/fa';

const informasiSertaMerta = [
  {
    id: 1,
    judul: "Pengumuman Pemenang Lomba Olahraga Kota Semarang 2024",
    tanggal: "2024-12-15",
    kategori: "Pengumuman",
    isi: `Berikut adalah pengumuman pemenang Lomba Olahraga Kota Semarang 2024:

1. Juara 1: SMPN 1 Semarang
2. Juara 2: SMPN 2 Semarang
3. Juara 3: SMPN 3 Semarang

Selamat kepada semua pemenang dan terima kasih atas partisipasinya.`,
    file: "pengumuman-lomba-olahraga-2024.pdf"
  },
  {
    id: 2,
    judul: "Pengumuman Pendaftaran PON Jawa Tengah 2025",
    tanggal: "2024-11-30",
    kategori: "Pendaftaran",
    isi: `Dibuka pendaftaran atlet untuk PON Jawa Tengah 2025:

• Tanggal Pendaftaran: 1 Desember 2024 - 15 Desember 2024
• Syarat: Warga Jawa Tengah, berusia 17-30 tahun
• Cabang Olahraga: 40 cabang olahraga
• Formulir: Download di sini`,
    file: "formulir-pon-2025.pdf"
  },
  {
    id: 3,
    judul: "Pengumuman Pemenang Program Bina Prestasi 2024",
    tanggal: "2024-10-31",
    kategori: "Pengumuman",
    isi: `Berikut adalah pemenang Program Bina Prestasi 2024:

1. Atlet Terbaik: John Doe
2. Pelatih Terbaik: Jane Smith
3. Program Terbaik: Program Pengembangan Atlet Muda

Selamat kepada semua pemenang!`,
    file: "pengumuman-bina-prestasi-2024.pdf"
  },
  {
    id: 4,
    judul: "Pengumuman Pendaftaran Festival Olahraga Muda",
    tanggal: "2024-09-25",
    kategori: "Pendaftaran",
    isi: `Dibuka pendaftaran Festival Olahraga Muda 2024:

• Tanggal: 15 Oktober 2024
• Lokasi: GOR Semarang
• Syarat: Usia 15-25 tahun
• Cabang: Basket, Futsal, Tenis Meja
• Formulir: Download di sini`,
    file: "formulir-festival-olahraga.pdf"
  },
  {
    id: 5,
    judul: "Pengumuman Pemenang Program Pelatihan Pelatih",
    tanggal: "2024-08-20",
    kategori: "Pengumuman",
    isi: `Berikut adalah pemenang Program Pelatihan Pelatih 2024:

1. Terbaik: John Smith
2. Terbaik Kedua: Sarah Johnson
3. Terbaik Ketiga: Michael Brown

Selamat kepada semua pemenang!`,
    file: "pengumuman-pelatihan-pelatih-2024.pdf"
  },
  {
    id: 6,
    judul: "Pengumuman Pendaftaran Program Pengembangan Atlet",
    tanggal: "2024-07-15",
    kategori: "Pendaftaran",
    isi: `Dibuka pendaftaran Program Pengembangan Atlet 2024:

• Tanggal: 1 Agustus 2024
• Lokasi: Stadion Semarang
• Syarat: Usia 10-18 tahun
• Cabang: Atletik, Renang, Sepak Bola
• Formulir: Download di sini`,
    file: "formulir-pengembangan-atlet.pdf"
  }
];

const InformasiPublikSertaMerta = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold text-center text-navy mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaBell className="inline-block mr-2" />
        Informasi Publik Serta Merta
      </motion.h1>

      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-gray-600 text-justify">
          Informasi Publik Serta Merta adalah kumpulan informasi yang disediakan oleh DISPORA Kota Semarang yang bersifat mendesak dan perlu disampaikan segera kepada masyarakat. Informasi ini mencakup pengumuman-pengumuman penting dan berita terkini yang memerlukan perhatian segera.
        </p>
      </motion.div>

      <motion.div 
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-navy mb-4">Daftar Informasi Publik Serta Merta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {informasiSertaMerta.map((info) => (
              <motion.div 
                key={info.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm text-gray-500 mr-2">{info.kategori}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                        {new Date(info.tanggal).toLocaleDateString('id-ID', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <FaDownload className="text-gray-400 hover:text-yellow-400 transition-colors duration-200" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{info.judul}</h3>
                  <div className="text-gray-600 text-sm whitespace-pre-wrap mb-2">{info.isi}</div>
                  <a 
                    href={`/${info.file}`} 
                    className="inline-flex items-center text-sm text-yellow-500 hover:text-yellow-600 transition-colors duration-200"
                  >
                    <FaDownload className="mr-1" />
                    Download File
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InformasiPublikSertaMerta;
