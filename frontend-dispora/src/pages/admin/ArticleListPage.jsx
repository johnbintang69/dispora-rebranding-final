import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon, PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { showConfirm, showSuccess, showError } from '../../utils/notifications';
import { getArticles, deleteArticle } from '../../services/articleService';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        // Map backend fields to frontend format
        const formattedArticles = data.map(article => {
          console.log('Article data from backend:', article); // Log raw data
          return {
            id: article.id,
            title: article.judul || article.title || 'Tanpa Judul',
            excerpt: article.ringkasan || article.excerpt || '',
            content: article.isi || article.content || '',
            image: article.gambar_url || article.image_url || article.gambar || '',
            published: article.status === 'published' || article.published || false,
            createdAt: article.created_at || article.dibuat_pada || new Date().toISOString(),
            updatedAt: article.updated_at || article.diupdate_pada || new Date().toISOString()
          };
        });
        setArticles(formattedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        showError('Gagal memuat artikel: ' + (error.message || 'Silakan coba lagi.'));
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  const navigate = useNavigate();

  const filteredArticles = articles.filter(article => {
    const title = article?.title?.toLowerCase() || '';
    const excerpt = article?.excerpt?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return title.includes(search) || excerpt.includes(search);
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    
    try {
      // Try to parse the date string
      const date = new Date(dateString);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        // If the date is invalid, try to parse it from a different format
        const parts = dateString.split(/[- :T]/);
        if (parts.length >= 3) {
          // Try different date formats (YYYY-MM-DD or DD-MM-YYYY)
          const newDate = new Date(parts[0], parts[1] - 1, parts[2].substr(0, 2));
          if (!isNaN(newDate.getTime())) {
            date = newDate;
          }
        }
      }
      
      // If we still don't have a valid date, return a placeholder
      if (isNaN(date.getTime())) {
        console.warn('Invalid date string:', dateString);
        return 'Tanggal tidak valid';
      }
      
      // Format the date in Indonesian locale
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Asia/Jakarta'
      };
      
      return date.toLocaleDateString('id-ID', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Format tanggal tidak valid';
    }
  };

  const handleDelete = async (id) => {
    const result = await showConfirm('Artikel yang dihapus tidak dapat dikembalikan. Lanjutkan?');
    
    if (result.isConfirmed) {
      try {
        await deleteArticle(id);
        setArticles(articles.filter(article => article.id !== id));
        await showSuccess('Artikel berhasil dihapus');
      } catch (error) {
        console.error('Error deleting article:', error);
        showError('Gagal menghapus artikel: ' + (error.message || 'Silakan coba lagi.'));
      }
    }
  };

  return (
    <div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Daftar Artikel</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Kelola artikel berita yang ditampilkan di website
            </p>
          </div>
          <Link
            to="/admin/articles/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Tambah Artikel
          </Link>
        </div>

        <div className="border-t border-gray-200">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat artikel...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada artikel</h3>
              <p className="mt-1 text-sm text-gray-500">Mulai dengan membuat artikel baru.</p>
              <div className="mt-6">
                <Link
                  to="/admin/articles/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Tambah Artikel
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <li key={article.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-yellow-600 truncate">
                            {article.title}
                          </p>
                          {!article.published && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Draft
                            </span>
                          )}
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <Link
                            to={`/admin/articles/${article.id}/edit`}
                            className="mr-3 text-gray-400 hover:text-yellow-600"
                          >
                            <PencilIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Edit</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Hapus</span>
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500 line-clamp-2">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>{formatDate(article.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                {filteredArticles.length === 0 && (
                  <li className="px-4 py-6 text-center text-gray-500">
                    Tidak ada artikel yang ditemukan.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleListPage;
