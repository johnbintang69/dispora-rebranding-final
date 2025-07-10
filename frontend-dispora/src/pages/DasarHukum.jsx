import React, { useState, useMemo } from 'react';
import { FaBalanceScale, FaFilePdf, FaSearch } from 'react-icons/fa';

const DasarHukum = () => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredDocuments = useMemo(() => {
    if (!searchQuery) return documents;
    
    const query = searchQuery.toLowerCase();
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(query) || 
      doc.description.toLowerCase().includes(query)
    );
  }, [searchQuery, documents]);

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center mb-4">
            <FaBalanceScale className="text-4xl text-navy mb-3" />
            <h1 className="text-3xl font-bold text-navy">Dasar Hukum</h1>
          </div>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Dokumen-dokumen hukum yang menjadi dasar dalam pelaksanaan layanan informasi publik.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200"
              placeholder="Cari dokumen hukum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          {filteredDocuments.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
              <li key={doc.id} className="py-4 hover:bg-gray-100 px-4 rounded transition-colors">
                <a 
                  href={doc.file} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      <FaFilePdf className="text-red-500 text-xl mr-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-navy group-hover:text-gold transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {doc.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-blue-600 mt-2 group-hover:underline">
                        Lihat dokumen
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Tidak ditemukan dokumen yang sesuai dengan pencarian Anda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DasarHukum;
