import React from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaCalendar, FaDownload } from 'react-icons/fa';

const informasiSetiapSaat = [
  {
    id: 1,
    judul: "Informasi Kontak Darurat",
    kategori: "Kontak",
    isi: `• Kepala Dinas: 024-1234567
• Bagian Umum: 024-1234568
• Bagian Program: 024-1234569
• Bagian Keuangan: 024-1234570
• Email: dispora@semarangkota.go.id
• WhatsApp: 0812-3456-7890`,
    updated: "2024-01-15"
  },
  {
    id: 2,
    judul: "Jam Operasional Layanan",
    kategori: "Jam Operasional",
    isi: `• Senin - Jumat: 08.00 - 16.00 WIB
• Sabtu: 08.00 - 12.00 WIB
• Minggu: Tidak melayani
• Hari Libur Nasional: Tidak melayani`,
    updated: "2024-01-15"
  },
  {
    id: 3,
    judul: "Lokasi Kantor",
    kategori: "Lokasi",
    isi: `• Alamat: Jl. Pandanaran No. 123, Semarang
• RT/RW: 001/002
• Kelurahan: Pandanaran
• Kecamatan: Pandanaran
• Kota: Semarang
• Provinsi: Jawa Tengah
• Kode Pos: 50261`,
    updated: "2024-01-15"
  },
  {
    id: 4,
    judul: "Daftar Layanan yang Disediakan",
    kategori: "Layanan",
    isi: `• Pendaftaran Atlet
• Pendaftaran Kompetisi
• Pendaftaran Pelatihan
• Pendaftaran Sertifikasi
• Informasi Program
• Informasi Kegiatan
• Informasi Prestasi`,
    updated: "2024-01-15"
  },
  {
    id: 5,
    judul: "Syarat dan Ketentuan Pendaftaran",
    kategori: "Syarat",
    isi: `• Mengisi formulir pendaftaran
• Menyerahkan fotokopi KTP
• Menyerahkan fotokopi Kartu Keluarga
• Menyerahkan surat keterangan sehat
• Menyerahkan pas foto terbaru
• Membayar biaya administrasi
• Menyerahkan surat keterangan dari organisasi (jika ada)`,
    updated: "2024-01-15"
  },
  {
    id: 6,
    judul: "Biaya Pendaftaran",
    kategori: "Biaya",
    isi: `• Pendaftaran Atlet: Rp 100.000
• Pendaftaran Kompetisi: Rp 150.000
• Pendaftaran Pelatihan: Rp 200.000
• Pendaftaran Sertifikasi: Rp 250.000
• Biaya administrasi: Rp 50.000`,
    updated: "2024-01-15"
  }
];

const InformasiPublikSetiapSaat = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold text-center text-navy mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaInfoCircle className="inline-block mr-2" />
        Informasi Publik Setiap Saat
      </motion.h1>

      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-gray-600 text-justify">
          Informasi Publik Setiap Saat adalah kumpulan informasi yang disediakan oleh DISPORA Kota Semarang yang selalu diperbarui dan dapat diakses kapan saja oleh masyarakat. Informasi ini mencakup data dan layanan yang bersifat rutin dan penting untuk publik.
        </p>
      </motion.div>

      <motion.div 
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-navy mb-4">Daftar Informasi Publik Setiap Saat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {informasiSetiapSaat.map((info) => (
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
                        {new Date(info.updated).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <FaDownload className="text-gray-400 hover:text-yellow-400 transition-colors duration-200" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{info.judul}</h3>
                  <div className="text-gray-600 text-sm whitespace-pre-wrap">{info.isi}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InformasiPublikSetiapSaat;
