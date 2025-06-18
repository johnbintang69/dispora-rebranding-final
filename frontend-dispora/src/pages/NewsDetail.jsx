import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL, BASE_URL, API_ENDPOINTS } from '../config/api';
import { formatDate } from '../utils/dateUtils';
import axios from 'axios';

// Komponen untuk menampilkan konten artikel dengan format yang rapi
const ArticleContent = ({ content }) => {
  if (!content) return null;
  
  // Memisahkan konten menjadi paragraf
  const paragraphs = content.split('\n').filter(para => para.trim() !== '');
  
  return (
    <div className="article-content">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4 leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

// Komponen untuk menampilkan gambar artikel
const ArticleImage = ({ imageUrl, alt }) => {
  const [imageError, setImageError] = useState(false);
  
  if (imageError || !imageUrl) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p>{imageError ? 'Gagal memuat gambar' : 'Tidak ada gambar'}</p>
      </div>
    );
  }
  
  return (
    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-md">
      <img 
        src={imageUrl}
        alt={alt || 'Gambar berita'}
        className="w-full h-auto max-h-[600px] object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

export default function NewsDetail() {
  const { id, slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        
        // First, get the list of articles to find the one with matching ID
        const response = await axios.get(
          `${API_BASE_URL}${API_ENDPOINTS.ARTICLES.LIST}`,
          { withCredentials: true }
        );
        
        console.log('Fetched articles:', response.data);
        
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Format data tidak valid');
        }
        
        // Find the article by ID
        const foundArticle = response.data.find(article => article.id_berita == id);
        
        if (!foundArticle) {
          throw new Error('Artikel tidak ditemukan');
        }
        
        console.log('Found article:', foundArticle);
        setArticle(foundArticle);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err.message || 'Gagal memuat artikel');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-400 mx-auto"></div>
        <p className="mt-4 text-gray-600">Memuat artikel...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error || 'Artikel tidak ditemukan'}</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-navy text-white px-4 py-2 rounded hover:bg-yellow-400 hover:text-navy transition-colors"
        >
          Kembali ke Daftar Berita
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Artikel */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {article.judul || 'Judul Artikel'}
          </h1>
          <div className="text-sm text-gray-500">
            <time dateTime={article.created_at}>
              {formatDate(article.created_at)}
            </time>
            {article.updated_at && article.updated_at !== article.created_at && (
              <span className="text-gray-400 ml-2">
                (Diperbarui: {formatDate(article.updated_at)})
              </span>
            )}
          </div>
        </header>

        {/* Gambar Utama */}
        <ArticleImage 
          imageUrl={article.gambar ? `${BASE_URL}${article.gambar}` : null} 
          alt={article.judul}
        />

        {/* Konten Artikel */}
        <article className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-12">
          <div className="prose prose-lg max-w-none text-gray-700 font-serif">
            {article.isi ? (
              <ArticleContent content={article.isi} />
            ) : (
              <p className="text-gray-500 italic">Tidak ada konten yang tersedia.</p>
            )}
          </div>
          
          {/* Tombol Kembali di Bawah Konten */}
          <div className="mt-12 pt-6 border-t border-gray-100">
            <button
              onClick={() => navigate('/berita')}
              className="inline-flex items-center text-navy hover:text-yellow-500 transition-colors font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Kembali ke Daftar Berita
            </button>
          </div>
        </article>

        {/* Tombol Kembali untuk Mobile */}
        <div className="text-center mb-12 md:hidden">
          <button
            onClick={() => navigate('/berita')}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-navy hover:bg-navy/90 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Kembali ke Daftar Berita
          </button>
        </div>
      </div>
    </div>
  );
}
