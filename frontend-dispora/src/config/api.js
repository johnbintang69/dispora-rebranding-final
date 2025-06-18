// Base URLs
export const API_BASE_URL = 'http://localhost:3000/api';
export const BASE_URL = 'http://localhost:3000'; // Untuk mengakses file statis seperti gambar

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    ME: '/check-session',
  },
  ARTICLES: {
    LIST: '/news',
    DETAIL: (id) => `/news/${id}`,
    CREATE: '/news',
    UPDATE: (id) => `/news/${id}`,
    DELETE: (id) => `/news/${id}`,
    // Note: Backend uses ID for single article access
  },
};

// Field mappings between frontend and backend
export const FIELD_MAPPINGS = {
  // Article fields
  article: {
    id: 'id_berita',
    title: 'judul',
    content: 'isi',
    excerpt: 'ringkasan',
    image: 'gambar',
    status: 'status',
    author: 'author',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    adminId: 'id_admin'
  },
  // Admin fields
  admin: {
    id: 'id',
    username: 'username',
    fullName: 'nama_lengkap'
  }
};

// Default headers for API requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};
