import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../../services/articleService';
import { formatDate } from '../../utils/dateUtils';

const DashboardPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        console.log('=== RAW DATA FROM API ===');
        console.log(JSON.stringify(data, null, 2));
        
        // Process each article to find date fields
        const articlesWithDates = data.map(article => {
          console.log(`\n=== ARTICLE ID: ${article.id} ===`);
          console.log('All fields:', Object.keys(article));
          
          // Find any date-like fields
          const dateFields = {};
          Object.entries(article).forEach(([key, value]) => {
            if (typeof value === 'string' && value.match(/\d{4}-\d{2}-\d{2}/)) {
              dateFields[key] = value;
            }
          });
          console.log('Date-like fields:', dateFields);
          
          // Add a formatted date field for display
          const dateField = Object.keys(dateFields).find(f => f.includes('date') || f.includes('created') || f.includes('tanggal') || f.includes('pada'));
          const displayDate = dateField ? dateFields[dateField] : 'No date field found';
          
          return {
            ...article,
            _debug_date: {
              fields: dateFields,
              selectedField: dateField,
              displayDate: displayDate
            },
            displayDate: displayDate
          };
        });
        
        // Sort by date (newest first) and take first 5
        const sortedArticles = [...articlesWithDates]
          .sort((a, b) => {
            const dateA = a.displayDate === 'No date field found' ? 0 : new Date(a.displayDate);
            const dateB = b.displayDate === 'No date field found' ? 0 : new Date(b.displayDate);
            return dateB - dateA;
          })
          .slice(0, 5);
          
        console.log('=== PROCESSED ARTICLES ===');
        console.log(JSON.stringify(sortedArticles, null, 2));
        setArticles(sortedArticles);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Gagal memuat data artikel');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }
  return (
    <div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Dashboard Admin
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Selamat datang di panel admin Dispora
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total Artikel</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900 sm:mt-0 sm:col-span-2">
                {articles.length}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Artikel Terbaru</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {articles.length > 0 ? (
                  <ul className="space-y-2">
                    {articles.map((article) => (
                      <li key={article.id} className="flex justify-between">
                        <Link 
                          to={`/admin/articles/${article.id}/edit`}
                          className="text-blue-600 hover:text-blue-800 hover:underline truncate max-w-xs"
                          title={article.judul || article.title}
                        >
                          {article.judul || article.title || 'Tanpa Judul'}
                        </Link>
                        <span className="text-gray-500 text-xs whitespace-nowrap ml-2" title={`Field: ${article._debug_date?.selectedField || 'unknown'}`}>
                          {article.displayDate === 'No date field found' 
                            ? 'Tidak ada tanggal' 
                            : formatDate(article.displayDate)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500">Belum ada artikel</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Aksi Cepat</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/admin/articles/new"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Buat Artikel Baru
                  </dt>
                  <dd className="flex items-baseline">
                    <p className="text-lg font-semibold text-gray-900">
                      Tambah berita terbaru
                    </p>
                  </dd>
                </div>
              </div>
            </div>
          </Link>
          
          <Link
            to="/admin/articles"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Kelola Artikel
                  </dt>
                  <dd className="flex items-baseline">
                    <p className="text-lg font-semibold text-gray-900">
                      Lihat semua artikel
                    </p>
                  </dd>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
