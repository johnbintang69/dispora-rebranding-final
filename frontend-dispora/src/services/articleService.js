import { API_BASE_URL, API_ENDPOINTS, FIELD_MAPPINGS, DEFAULT_HEADERS } from '../config/api';

// Helper function to map fields between frontend and backend
const mapFields = (data, type) => {
  if (!data) return null;
  
  const mapping = FIELD_MAPPINGS[type];
  if (!mapping) return data;
  
  if (Array.isArray(data)) {
    return data.map(item => {
      const mapped = {};
      Object.entries(mapping).forEach(([frontendKey, backendKey]) => {
        if (item[backendKey] !== undefined) {
          mapped[frontendKey] = item[backendKey];
        }
      });
      return mapped;
    });
  } else {
    const mapped = {};
    Object.entries(mapping).forEach(([frontendKey, backendKey]) => {
      if (data[backendKey] !== undefined) {
        mapped[frontendKey] = data[backendKey];
      }
    });
    return mapped;
  }
};

const handleResponse = async (response) => {
  let data;
  try {
    data = await response.json();
  } catch (error) {
    console.error('Error parsing response:', error);
    throw new Error('Gagal memproses respons dari server');
  }
  
  if (!response.ok) {
    // Log the full error response for debugging
    console.error('API Error Response:', {
      status: response.status,
      statusText: response.statusText,
      data: data
    });
    
    // Provide more specific error messages based on status code
    if (response.status === 400) {
      const errorMessage = data.message || 'Permintaan tidak valid';
      if (data.errors) {
        // If there are validation errors, include them in the message
        const validationErrors = Object.values(data.errors).join('\n');
        throw new Error(`${errorMessage}\n${validationErrors}`);
      }
      throw new Error(errorMessage);
    } else if (response.status === 401) {
      throw new Error('Sesi telah berakhir, silakan login kembali');
    } else if (response.status === 403) {
      throw new Error('Anda tidak memiliki izin untuk melakukan aksi ini');
    } else if (response.status === 404) {
      throw new Error('Data tidak ditemukan');
    } else if (response.status >= 500) {
      throw new Error('Terjadi kesalahan pada server. Silakan coba lagi nanti.');
    } else {
      throw new Error(data.message || 'Terjadi kesalahan');
    }
  }
  return data;
};

export const getArticles = async () => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARTICLES.LIST}`, {
    credentials: 'include',
  });
  const data = await handleResponse(response);
  return mapFields(Array.isArray(data) ? data : [], 'article');
};

export const getArticle = async (id) => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARTICLES.DETAIL(id)}`, {
    credentials: 'include',
  });
  const data = await handleResponse(response);
  const mappedData = mapFields(data, 'article');
  // Add published flag based on status
  if (mappedData) {
    mappedData.published = mappedData.status === 'published';
  }
  return mappedData;
};

export const createArticle = async (articleData) => {
  const formData = new FormData();
  
  try {
    // Add required fields with backend field names
    formData.append('judul', articleData.title || '');
    formData.append('isi', articleData.content || '');
    formData.append('ringkasan', articleData.excerpt || '');
    formData.append('status', articleData.published ? 'published' : 'draft');
    
    // Add image if exists
    if (articleData.image && articleData.image instanceof File) {
      formData.append('gambar', articleData.image);
    }

    console.log('Sending form data:', {
      title: articleData.title,
      hasImage: !!articleData.image,
      isFile: articleData.image instanceof File
    });

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARTICLES.CREATE}`, {
      method: 'POST',
      credentials: 'include',
      // Let the browser set the Content-Type with boundary
      body: formData,
    });
    
    const data = await handleResponse(response);
    
    if (data && data.data) {
      return mapFields(data.data, 'article');
    }
    
    throw new Error('Invalid response format from server');
  } catch (error) {
    console.error('Error in createArticle:', error);
    throw error;
  }
};

export const updateArticle = async (id, articleData) => {
  const formData = new FormData();
  
  try {
    // Add required fields with backend field names
    formData.append('judul', articleData.title || '');
    formData.append('isi', articleData.content || '');
    formData.append('ringkasan', articleData.excerpt || '');
    formData.append('status', articleData.published ? 'published' : 'draft');
    
    // Add image if it's a new file
    if (articleData.image && articleData.image instanceof File) {
      formData.append('gambar', articleData.image);
    }

    console.log('Updating article with data:', {
      id,
      title: articleData.title,
      hasImage: !!articleData.image,
      isFile: articleData.image instanceof File
    });

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARTICLES.UPDATE(id)}`, {
      method: 'PUT',
      credentials: 'include',
      // Let the browser set the Content-Type with boundary
      body: formData,
    });
    
    const data = await handleResponse(response);
    
    if (data && data.data) {
      return mapFields(data.data, 'article');
    }
    
    throw new Error('Invalid response format from server');
  } catch (error) {
    console.error('Error in updateArticle:', error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARTICLES.DELETE(id)}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return handleResponse(response);
};

// Image upload is now handled within createArticle and updateArticle
