import React from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaCalendar, FaDownload } from 'react-icons/fa';

const informasiBerkala = [
  {
    id: 1,
    judul: "Laporan Kegiatan Tahunan 2024",
    tanggal: "2024-12-31",
    kategori: "Laporan Kegiatan",
    deskripsi: "Laporan kegiatan dan program DISPORA Kota Semarang selama tahun 2024",
    file: "laporan-kegiatan-2024.pdf"
  },
  {
    id: 2,
    judul: "Rencana Kerja dan Anggaran (RKA) 2025",
    tanggal: "2024-09-30",
    kategori: "RKA",
    deskripsi: "Rencana kerja dan anggaran DISPORA Kota Semarang untuk tahun 2025",
    file: "rka-2025.pdf"
  },
  {
    id: 3,
    judul: "Laporan Keuangan Semester I 2024",
    tanggal: "2024-06-30",
    kategori: "Laporan Keuangan",
    deskripsi: "Laporan realisasi keuangan DISPORA Kota Semarang semester I tahun 2024",
    file: "laporan-keuangan-semester-i-2024.pdf"
  },
  {
    id: 4,
    judul: "Daftar Pegawai Negeri Sipil (PNS) 2024",
    tanggal: "2024-07-15",
    kategori: "Daftar Pegawai",
    deskripsi: "Daftar lengkap pegawai negeri sipil yang terdaftar di DISPORA Kota Semarang",
    file: "daftar-pns-2024.pdf"
  },
  {
    id: 5,
    judul: "Daftar Penghargaan Tahun 2024",
    tanggal: "2024-12-15",
    kategori: "Penghargaan",
    deskripsi: "Daftar penghargaan yang diterima DISPORA Kota Semarang dan atlet/atlet pelatda tahun 2024",
    file: "daftar-penghargaan-2024.pdf"
  },
  {
    id: 6,
    judul: "Laporan Tahunan Pengelolaan Aset 2024",
    tanggal: "2024-12-31",
    kategori: "Aset",
    deskripsi: "Laporan pengelolaan aset DISPORA Kota Semarang tahun 2024",
    file: "laporan-aset-2024.pdf"
  }
];

const InformasiPublikBerkala = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold text-center text-navy mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaFileAlt className="inline-block mr-2" />
        Informasi Publik Berkala
      </motion.h1>

      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-gray-600 text-justify">
          Informasi Publik Berkala adalah kumpulan informasi yang disediakan secara rutin oleh DISPORA Kota Semarang sesuai dengan Undang-Undang No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik. Informasi ini diperbarui secara berkala sesuai dengan kebijakan dan kebutuhan publik.
        </p>
      </motion.div>

      <motion.div 
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-navy mb-4">Daftar Informasi Publik Berkala</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {informasiBerkala.map((info) => (
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
                        {new Date(info.tanggal).toLocaleDateString('id-ID', { year: 'numeric' })}
                      </span>
                    </div>
                    <FaDownload className="text-gray-400 hover:text-yellow-400 transition-colors duration-200" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{info.judul}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{info.deskripsi}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InformasiPublikBerkala;
