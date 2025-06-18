import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL, BASE_URL, API_ENDPOINTS } from '../config/api';
import { formatDate } from '../utils/dateUtils';

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const timestamp = new Date().getTime();
        const response = await axios.get(
          `${API_BASE_URL}${API_ENDPOINTS.ARTICLES.LIST}?_limit=3&_sort=created_at:desc&_t=${timestamp}`,
          { 
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        );

        if (Array.isArray(response.data)) {
          // Ambil 3 berita terbaru
          const latestNews = response.data.slice(0, 3).map(article => ({
            id: article.id_berita,
            title: article.judul || 'Judul Berita',
            date: article.created_at ? formatDate(article.created_at) : 'Tanggal tidak tersedia',
            summary: article.ringkasan || article.isi?.substring(0, 100) + '...' || 'Tidak ada ringkasan',
            slug: article.slug || `berita-${article.id_berita}`,
            image: (() => {
              if (!article.gambar) return null;
              
              // Hapus slash di awal jika ada
              const cleanPath = article.gambar.startsWith('/') 
                ? article.gambar.substring(1) 
                : article.gambar;
              
              // Pastikan BASE_URL tidak berakhir dengan slash
              const base = BASE_URL.endsWith('/') 
                ? BASE_URL.slice(0, -1) 
                : BASE_URL;
              
              // Gabungkan dengan path uploads (jika belum ada di path)
              return cleanPath.startsWith('uploads/')
                ? `${base}/${cleanPath}`
                : `${base}/uploads/${cleanPath}`;
            })(),
            content: article.isi || ''
          }));
          setNews(latestNews);
        }
      } catch (err) {
        console.error('Error fetching latest news:', err);
        setError('Gagal memuat berita terbaru');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (loading) {
    return (
      <section id="berita" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-8">
            Berita Terkini
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-400"></div>
          </div>
        </div>
      </section>
    );
  }


  if (error) {
    return (
      <section id="berita" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-8">
            Berita Terkini
          </h2>
          <p className="text-center text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="berita" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-navy text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Berita Terkini
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {news.length > 0 ? news.map((item, idx) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-200 flex flex-col h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title}
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
                  <div className="text-gray-400 text-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Tidak ada gambar</p>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs text-gray-400 mb-2">
                  {item.date}
                </div>
                <h3 className="font-bold text-lg mb-2 text-navy line-clamp-2">
                  {item.title}
                </h3>
                <div className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                  {item.summary}
                </div>
                <Link 
                  to={`/berita/${item.id}/${item.slug}`} 
                  className="inline-block mt-2 bg-[#152a4e] text-white px-4 py-2 rounded hover:bg-yellow-400 hover:text-navy transition-colors duration-200 font-semibold text-sm text-center"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">Belum ada berita tersedia</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
