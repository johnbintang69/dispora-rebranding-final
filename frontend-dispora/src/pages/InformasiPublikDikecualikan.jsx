import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCalendar, FaDownload } from 'react-icons/fa';

const informasiDikecualikan = [
  {
    id: 1,
    judul: "Informasi Strategis dan Rahasia Negara",
    kategori: "Rahasia Negara",
    deskripsi: "Informasi yang berkaitan dengan keamanan dan pertahanan negara yang bersifat rahasia dan strategis",
    alasan: "Informasi ini dikecualikan karena berkaitan langsung dengan keamanan dan pertahanan negara yang dapat mengganggu stabilitas keamanan nasional jika diserahkan ke publik",
    updated: "2024-01-15"
  },
  {
    id: 2,
    judul: "Informasi Pengawasan Atlet Pelatda",
    kategori: "Pengawasan",
    deskripsi: "Data-data pengawasan dan evaluasi terhadap atlet pelatda yang bersifat rahasia dan sensitif",
    alasan: "Informasi ini dikecualikan karena mengandung data pribadi dan evaluasi yang dapat mempengaruhi proses pengembangan atlet",
    updated: "2024-01-15"
  },
  {
    id: 3,
    judul: "Informasi Perencanaan Strategis",
    kategori: "Perencanaan",
    deskripsi: "Rencana strategis dan taktis yang masih dalam tahap pengembangan dan evaluasi",
    alasan: "Informasi ini dikecualikan karena masih dalam tahap pengembangan dan dapat mempengaruhi proses pengambilan keputusan yang sedang berlangsung",
    updated: "2024-01-15"
  },
  {
    id: 4,
    judul: "Informasi Pengembangan Program",
    kategori: "Program",
    deskripsi: "Data-data pengembangan program yang masih dalam tahap perencanaan dan evaluasi",
    alasan: "Informasi ini dikecualikan karena masih dalam tahap pengembangan dan dapat mempengaruhi proses pengambilan keputusan yang sedang berlangsung",
    updated: "2024-01-15"
  },
  {
    id: 5,
    judul: "Informasi Evaluasi Internal",
    kategori: "Evaluasi",
    deskripsi: "Hasil evaluasi internal terhadap kinerja pegawai dan program yang bersifat rahasia dan sensitif",
    alasan: "Informasi ini dikecualikan karena mengandung data evaluasi internal yang dapat mempengaruhi proses pengembangan pegawai dan program",
    updated: "2024-01-15"
  },
  {
    id: 6,
    judul: "Informasi Keuangan Rahasia",
    kategori: "Keuangan",
    deskripsi: "Data-data keuangan yang bersifat rahasia dan sensitif",
    alasan: "Informasi ini dikecualikan karena mengandung data keuangan yang dapat mempengaruhi stabilitas keuangan institusi",
    updated: "2024-01-15"
  }
];

const InformasiPublikDikecualikan = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold text-center text-navy mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaShieldAlt className="inline-block mr-2" />
        Informasi Publik Dikecualikan
      </motion.h1>

      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-gray-600 text-justify">
          Informasi Publik Dikecualikan adalah kumpulan informasi yang disediakan oleh DISPORA Kota Semarang yang tidak dapat diakses oleh publik karena memiliki alasan tertentu sesuai dengan Undang-Undang No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik.
        </p>
      </motion.div>

      <motion.div 
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-navy mb-4">Daftar Informasi Publik Dikecualikan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {informasiDikecualikan.map((info) => (
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
                        {new Date(info.updated).toLocaleDateString('id-ID', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <FaDownload className="text-gray-400 hover:text-yellow-400 transition-colors duration-200" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{info.judul}</h3>
                  <p className="text-gray-600 text-sm mb-2">{info.deskripsi}</p>
                  <div className="border-t border-gray-200 pt-2">
                    <p className="text-sm font-medium text-gray-700">Alasan Dikecualikan:</p>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{info.alasan}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InformasiPublikDikecualikan;
