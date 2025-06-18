import React from 'react';
import { motion } from 'framer-motion';
import { FaBalanceScale } from 'react-icons/fa';

const DasarHukum = () => {
  const documents = [
    {
      id: 1,
      title: 'Peraturan Menteri Dalam Negeri Nomor 3 Tahun 2017',
      description: 'Tentang Pedoman Tata Naskah Dinas Elektronik di Lingkungan Kementerian Dalam Negeri dan Pemerintah Daerah',
      file: '/peraturan_menteri_dalam_negeri_no_3_tahun_2017.pdf'
    },
    {
      id: 2,
      title: 'Undang-Undang Nomor 14 Tahun 2008',
      description: 'Tentang Keterbukaan Informasi Publik',
      file: '/uu14-2008_keterbukaan_informasi_publik_1.pdf'
    },
    {
      id: 3,
      title: 'Peraturan Pemerintah Nomor 61 Tahun 2010',
      description: 'Tentang Pelaksanaan Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik',
      file: '/PP_61_Tahun_2010_Tentang_Pelaksanaan_UU_KIP.pdf'
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center mb-4">
            <FaBalanceScale className="text-4xl text-black mb-3" />
            <h1 className="text-3xl font-bold text-gray-900">Dasar Hukum</h1>
          </div>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Berikut adalah dokumen-dokumen hukum yang menjadi dasar dalam pelaksanaan layanan informasi publik.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{doc.title}</h3>
                <p className="text-gray-600 mb-4">{doc.description}</p>
                <div className="flex justify-end">
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Lihat Dokumen
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DasarHukum;
