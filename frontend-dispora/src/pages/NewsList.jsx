import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, BASE_URL, API_ENDPOINTS } from '../config/api';
import { formatDate } from '../utils/dateUtils';
import { motion } from 'framer-motion';

const PAGE_SIZE = 9;

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Tambahkan timestamp untuk menghindari cache
      const timestamp = new Date().getTime();
      const response = await axios.get(
        `${API_BASE_URL}${API_ENDPOINTS.ARTICLES.LIST}?_t=${timestamp}`,
        { 
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
      
      console.log('API Response:', response.data);
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Format data tidak valid');
      }
      
      // Urutkan data berdasarkan tanggal terbaru
      const sortedArticles = [...response.data].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      // Format data untuk tampilan
      const formattedArticles = sortedArticles.map(article => {
        // Generate slug from judul
        const slug = article.judul
          ? article.judul
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/--+/g, '-')
          : `berita-${article.id_berita}`;
        
        // Konstruksi URL gambar
        let imageUrl = null;
        if (article.gambar) {
          // Hapus slash di awal jika ada
          const cleanPath = article.gambar.startsWith('/') 
            ? article.gambar.substring(1) 
            : article.gambar;
          
          // Pastikan BASE_URL tidak berakhir dengan slash
          const base = BASE_URL.endsWith('/') 
            ? BASE_URL.slice(0, -1) 
            : BASE_URL;
          
          // Gabungkan dengan path uploads (jika belum ada di path)
          imageUrl = cleanPath.startsWith('uploads/')
            ? `${base}/${cleanPath}`
            : `${base}/uploads/${cleanPath}`;
            
          console.log('Constructed image URL:', imageUrl);
        }
        
        // Debug log untuk artikel
        console.log('Article data:', {
          id: article.id_berita,
          judul: article.judul,
          gambar: article.gambar,
          fullImageUrl: imageUrl,
          rawImagePath: article.gambar
        });
        
        return {
          id: article.id_berita,
          title: article.judul || 'Tanpa Judul',
          excerpt: article.ringkasan || '',
          content: article.isi || '',
          image: imageUrl,
          published_at: article.created_at || new Date().toISOString(),
          slug: slug,
          rawData: article // Simpan data mentah untuk debugging
        };
      });
      
      // Pagination logic
      const startIndex = (page - 1) * PAGE_SIZE;
      const paginatedArticles = formattedArticles.slice(startIndex, startIndex + PAGE_SIZE);
      
      setNews(paginatedArticles);
      setTotalPages(Math.ceil(formattedArticles.length / PAGE_SIZE));
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Gagal memuat artikel. ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    // Reset ke halaman 1 saat komponen pertama kali dimuat
    setPage(1);
    fetchArticles();
  }, []); // Hanya jalankan sekali saat komponen pertama kali dimuat

  // Tambahkan useEffect untuk menangani perubahan halaman
  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      fetchArticles();
    }
  }, [page]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 py-8 min-h-[70vh]">
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-6 text-center">Daftar Berita</h1>
        {error && <div className="text-center text-red-600 mb-4 text-sm">{error}</div>}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-400 mb-4"></div>
            <div className="text-navy font-semibold">Memuat...</div>
          </div>
        ) : !Array.isArray(news) || news.length === 0 ? (
          <div className="text-center py-10 text-gray-500">Belum ada berita.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" key="news-grid">
              {Array.isArray(news) && news.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200 flex flex-col">
                  <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                    {item.image ? (
                      <img 
                        src={item.image || ''} 
                        alt={item.title || 'Gambar berita'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const parent = e.target.parentElement;
                          if (parent) {
                            parent.classList.add('bg-gray-100');
                            parent.innerHTML = `
                              <div class="text-gray-400 text-center p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p class="text-sm">Gambar tidak tersedia</p>
                              </div>
                            `;
                          }
                          e.target.onerror = null;
                          e.target.src = '';
                        }}
                      />
                    ) : (
                      <div className="text-gray-400 text-center p-4 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">Tidak ada gambar</p>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs text-gray-400 mb-2">
                      {formatDate(item.published_at)}
                    </div>
                    <h2 className="font-bold text-lg mb-2 text-navy line-clamp-2">
                      {item.title}
                    </h2>
                    <div className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                      {item.excerpt || item.content.slice(0, 150)}{!item.excerpt && item.content.length > 150 && '...'}
                    </div>
                    <Link 
                      to={`/berita/${item.id}/${item.slug}`} 
                      className="inline-block mt-2 bg-[#152a4e] text-white px-4 py-2 rounded hover:bg-yellow-400 hover:text-navy transition-colors duration-200 font-semibold text-sm text-center"
                    >
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-navy font-bold disabled:opacity-50"
                  onClick={() => setPage(page-1)}
                  disabled={page === 1}
                >Sebelumnya</button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded font-bold ${page === i+1 ? 'bg-yellow-400 text-navy' : 'bg-gray-100 text-navy hover:bg-gray-200'}`}
                    onClick={() => setPage(i+1)}
                  >{i+1}</button>
                ))}
                <button
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-navy font-bold disabled:opacity-50"
                  onClick={() => setPage(page+1)}
                  disabled={page === totalPages}
                >Berikutnya</button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}