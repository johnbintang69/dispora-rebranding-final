import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '../../utils/notifications';
import { getArticle, createArticle, updateArticle } from '../../services/articleService';
import { useAuth } from '../../context/AuthContext';

const ArticleFormPage = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: null,
    imagePreview: '',
    published: true,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const article = await getArticle(id);
          console.log('Fetched article data:', article);
          
          if (article) {
            setFormData({
              title: article.title || '',
              excerpt: article.excerpt || '',
              content: article.content || '',
              image: null,
              imagePreview: article.image || '',
              published: article.published || false,
            });
          } else {
            throw new Error('Article data not found');
          }
        } catch (error) {
          console.error('Error fetching article:', error);
          showError('Gagal memuat data artikel: ' + (error.message || 'Silakan coba lagi.'));
        } finally {
          setSubmitting(false);
        }
      };
      
      fetchArticle();
    } else {
      // Reset form for new article
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        image: null,
        imagePreview: '',
        published: true,
      });
      setSubmitting(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      showError('File harus berupa gambar');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      showError('Ukuran file maksimal 2MB');
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.onerror = () => {
        throw new Error('Gagal membaca file gambar');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
      showError(error.message || 'Gagal memproses gambar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Prepare article data
      const articleData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        published: formData.published,
        image: formData.image || null
      };

      // If there's an existing image URL but no new image, keep the existing one
      if (!articleData.image && formData.imagePreview && !formData.imagePreview.startsWith('data:')) {
        articleData.imageUrl = formData.imagePreview;
      }

      if (id) {
        // Update existing article
        await updateArticle(id, articleData);
        showSuccess('Artikel berhasil diperbarui');
      } else {
        // Create new article
        await createArticle(articleData);
        showSuccess('Artikel berhasil ditambahkan');
      }
      
      // Redirect to articles list
      navigate('/admin/articles');
    } catch (error) {
      console.error('Error saving article:', error);
      showError('Gagal menyimpan artikel: ' + (error.message || 'Silakan coba lagi.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru'}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => navigate('/admin/articles')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Kembali
          </button>
        </div>
      </div>

      {submitting && (
        <div className="rounded-md bg-red-50 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Menyimpan...</h3>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Informasi Artikel</h3>
              <p className="mt-1 text-sm text-gray-500">
                Isi informasi dasar artikel Anda.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Judul Artikel <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                    Ringkasan <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="excerpt"
                      name="excerpt"
                      rows={3}
                      required
                      value={formData.excerpt}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Ringkasan singkat artikel yang akan ditampilkan di halaman daftar artikel"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Ringkasan singkat yang menjelaskan isi artikel.
                  </p>
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">Gambar Utama</label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                      {formData.imagePreview ? (
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-200">
                          <svg
                            className="h-6 w-6 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </span>
                    <div className="ml-4">
                      <label
                        htmlFor="image-upload"
                        className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        disabled={isUploading}
                      >
                        {isUploading ? 'Mengunggah...' : formData.imagePreview ? 'Ganti Gambar' : 'Unggah Gambar'}
                      </label>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isUploading}
                      />
                      {formData.image && (
                        <p className="mt-1 text-xs text-gray-500">
                          {formData.image.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Format: JPG, PNG (maks. 2MB)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Konten</h3>
              <p className="mt-1 text-sm text-gray-500">
                Tulis isi lengkap artikel Anda di sini.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="mt-1">
                <textarea
                  id="content"
                  name="content"
                  rows={15}
                  required
                  value={formData.content}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Tulis isi artikel di sini..."
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Gunakan format yang sesuai untuk konten Anda. Anda bisa menggunakan HTML untuk pemformatan.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/admin/articles')}
            className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            disabled={submitting || isUploading}
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={submitting || isUploading}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${(submitting || isUploading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {submitting ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Buat Artikel')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleFormPage;
