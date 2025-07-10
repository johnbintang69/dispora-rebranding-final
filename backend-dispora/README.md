# Backend API Dispora Kota Semarang

Backend API untuk website Dinas Pemuda dan Olahraga (Dispora) Kota Semarang yang menangani manajemen konten, autentikasi, dan manajemen data.

## 🚀 Panduan Instalasi

### Prasyarat
- Node.js (versi 16.0.0 atau lebih baru)
- npm (versi 7.0.0 atau lebih baru) atau Yarn
- MySQL (versi 8.0 atau lebih baru)

### Langkah-langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/dispora-rebranding.git
   cd backend-dispora
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Konfigurasi Database**
   - Buat database MySQL baru
   - Salin file `.env.example` menjadi `.env`
   - Sesuaikan konfigurasi di file `.env`:
     ```env
     DB_HOST=localhost
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_NAME=dispora_db
     JWT_SECRET=your_jwt_secret
     UPLOAD_PATH=./uploads
     ```

4. **Menjalankan Server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```
   Server akan berjalan di http://localhost:5000

### Dependensi Utama
- `express` - Framework Node.js
- `mysql2` - Driver MySQL
- `sequelize` - ORM untuk database
- `jsonwebtoken` - Autentikasi JWT
- `bcryptjs` - Enkripsi password
- `multer` - Upload file
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables
- `morgan` - HTTP request logger

### Dependensi Pengembangan
- `nodemon` - Auto-reload server
- `sequelize-cli` - CLI untuk Sequelize
- `eslint` - Linter kode
- `prettier` - Formatter kode

### Struktur Direktori
```
backend-dispora/
├── config/           # Konfigurasi database
├── controllers/      # Logic controller
├── middleware/       # Custom middleware
├── migrations/       # Migrasi database
├── models/           # Model Sequelize
├── routes/           # Route definitions
├── uploads/          # File uploads
├── utils/            # Utility functions
├── .env              # Environment variables
├── .env.example      # Contoh environment variables
├── app.js            # Aplikasi utama
└── server.js         # Entry point server
```

## 🚀 Fitur Utama

- **Autentikasi Admin**
  - Login/Logout
  - Manajemen sesi
  - Keamanan dengan bcrypt

- **Manajemen Berita**
  - CRUD (Create, Read, Update, Delete) berita
  - Kategori berita
  - Upload dan manajemen gambar
  - Pencarian dan filter

- **Manajemen Galeri**
  - Upload dan hapus foto
  - Kategori galeri
  - Deskripsi foto

- **Keamanan**
  - Validasi input
  - Proteksi route
  - Rate limiting
  - CORS policy

- **Lainnya**
  - API documentation
  - Error handling
  - Logging aktivitas

## 🛠️ Persyaratan Sistem

- Node.js v16+
- MySQL v8.0+
- NPM 8+
- Git

## 🚀 Instalasi dan Konfigurasi

1. **Clone Repository**
   ```bash
   git clone [repo-url]
   cd backend-dispora
   ```

2. **Install Dependensi**
   ```bash
   npm install
   ```

3. **Setup Database**
   - Buat database MySQL baru
   - Import skema dari `database.sql`
   ```bash
   mysql -u [username] -p [database_name] < database.sql
   ```

4. **Konfigurasi**
   - Salin `.env.example` menjadi `.env`
   - Sesuaikan konfigurasi di file `.env`:
     ```env
     DB_HOST=localhost
     DB_USER=your_username
     DB_PASS=your_password
     DB_NAME=dispora_db
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

5. **Jalankan Aplikasi**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

6. **Testing**
   ```bash
   npm test
   ```

## 📚 Dokumentasi API

Dokumentasi lengkap API dapat diakses melalui:
- **Development**: `http://localhost:5000/api-docs`
- **Production**: `https://api.disporasmg.com/api-docs`

### 🔐 Autentikasi

#### Login Admin
```http
POST /api/auth/login
```

**Request Body**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response Sukses (200)**
```json
{
  "status": "success",
  "message": "Login berhasil",
  "data": {
    "id": 1,
    "username": "admin",
    "name": "Administrator",
    "token": "jwt.token.here"
  }
}
```

### 📰 Manajemen Berita

#### Daftar Berita
```http
GET /api/berita
```

**Query Parameters**
- `page` - Halaman (default: 1)
- `limit` - Jumlah data per halaman (default: 10)
- `search` - Pencarian judul berita
- `kategori` - Filter berdasarkan kategori

### 🖼️ Manajemen Galeri

#### Upload Gambar
```http
POST /api/galeri/upload
Content-Type: multipart/form-data
```

**Form Data**
- `image` - File gambar (required)
- `kategori` - Kategori galeri
- `deskripsi` - Deskripsi gambar

## 🛡️ Keamanan

- Semua endpoint kecuali login membutuhkan token JWT
- Rate limiting: 100 request per 15 menit per IP
- Validasi input menggunakan express-validator
- Sanitasi input untuk mencegah XSS

## 📦 Struktur Proyek

```
backend-dispora/
├── config/           # Konfigurasi aplikasi
├── controllers/      # Logic controller
├── middleware/       # Custom middleware
├── models/           # Model database
├── routes/           # Definisi route
├── uploads/          # File upload
├── utils/            # Utility functions
├── .env.example      # Contoh environment variable
├── app.js            # Aplikasi utama
└── package.json
```

## 👥 Kontribusi

1. Fork repository ini
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## 📝 Lisensi

[MIT](LICENSE) - Hak Cipta © 2025 Dispora Kota Semarang
      "id": 1,
      "username": "admin",
      "nama_lengkap": "Administrator"
    }
  }
  ```

#### 2. Logout Admin
- **Endpoint**: `POST /api/logout`
- **Headers**:
  - `Cookie`: `connect.sid=<session_id>` (didapat dari response login)
- **Response Sukses (200)**:
  ```json
  {
    "message": "Logout berhasil"
  }
  ```

#### 3. Cek Sesi
- **Endpoint**: `GET /api/check-session`
- **Headers**:
  - `Cookie`: `connect.sid=<session_id>`
- **Response Sukses (200)**:
  ```json
  {
    "loggedIn": true,
    "admin": {
      "id": 1,
      "username": "admin",
      "nama_lengkap": "Administrator"
    }
  }
  ```

### Berita

#### 1. Dapatkan Semua Berita
- **Endpoint**: `GET /api/news`
- **Response Sukses (200)**:
  ```json
  [
    {
      "id_berita": 1,
      "judul": "Judul Berita",
      "isi": "Isi berita lengkap...",
      "gambar": "/uploads/gambar-1234567890.jpg",
      "status": "published",
      "id_admin": 1,
      "created_at": "2025-06-18T03:30:00.000Z",
      "updated_at": "2025-06-18T03:30:00.000Z",
      "author": "Administrator"
    }
  ]
  ```

#### 2. Dapatkan Detail Berita
- **Endpoint**: `GET /api/news/1`
- **Response Sukses (200)**:
  ```json
  {
    "id_berita": 1,
    "judul": "Judul Berita",
    "isi": "Isi berita lengkap...",
    "gambar": "/uploads/gambar-1234567890.jpg",
    "status": "published",
    "id_admin": 1,
    "created_at": "2025-06-18T03:30:00.000Z",
    "updated_at": "2025-06-18T03:30:00.000Z",
    "author": "Administrator"
  }
  ```

#### 3. Buat Berita Baru (Admin)
- **Endpoint**: `POST /api/news`
- **Headers**:
  - `Content-Type`: `multipart/form-data`
  - `Cookie`: `connect.sid=<session_id>`
- **Body (form-data)**:
  - `judul`: `Judul Berita Baru` (text)
  - `isi`: `Ini adalah isi berita baru...` (text)
  - `status`: `published` (text)
  - `gambar`: `[file]` (pilih file gambar)
- **Response Sukses (201)**:
  ```json
  {
    "message": "Berita berhasil ditambahkan",
    "data": {
      "id_berita": 2,
      "judul": "Judul Berita Baru",
      "isi": "Ini adalah isi berita baru...",
      "gambar": "/uploads/gambar-9876543210.jpg",
      "status": "published",
      "id_admin": 1,
      "created_at": "2025-06-18T04:00:00.000Z",
      "updated_at": "2025-06-18T04:00:00.000Z"
    }
  }
  ```

#### 4. Update Berita (Admin)
- **Endpoint**: `PUT /api/news/2`
- **Headers**:
  - `Content-Type`: `multipart/form-data`
  - `Cookie`: `connect.sid=<session_id>`
- **Body (form-data)**:
  - `judul`: `Judul Berita Diperbarui` (text)
  - `isi`: `Ini adalah isi berita yang diperbarui...` (text)
  - `status`: `published` (text)
  - `gambar`: `[file]` (opsional, pilih file gambar baru)
- **Response Sukses (200)**:
  ```json
  {
    "message": "Berita berhasil diperbarui",
    "data": {
      "id_berita": 2,
      "judul": "Judul Berita Diperbarui",
      "isi": "Ini adalah isi berita yang diperbarui...",
      "gambar": "/uploads/gambar-5555555555.jpg",
      "status": "published",
      "id_admin": 1,
      "created_at": "2025-06-18T04:00:00.000Z",
      "updated_at": "2025-06-18T04:15:00.000Z"
    }
  }
  ```

#### 5. Hapus Berita (Admin)
- **Endpoint**: `DELETE /api/news/2`
- **Headers**:
  - `Cookie`: `connect.sid=<session_id>`
- **Response Sukses (200)**:
  ```json
  {
    "message": "Berita berhasil dihapus"
  }
  ```

## Testing dengan Postman

### Persiapan
1. Pastikan server berjalan di `http://localhost:3000`
2. Import kumpulan endpoint Postman:
   - Buka Postman
   - Klik "Import"
   - Pilih tab "Raw text"
   - Salin dan tempel kode JSON berikut:
   ```json
   {
     "info": {
       "name": "Dispora Semarang API",
       "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
     },
     "item": [
       {
         "name": "Login Admin",
         "request": {
           "method": "POST",
           "header": [
             {
               "key": "Content-Type",
               "value": "application/json"
             }
           ],
           "body": {
             "mode": "raw",
             "raw": "{\"username\":\"admin\",\"password\":\"admin123\"}",
             "options": {
               "raw": {
                 "language": "json"
               }
             }
           },
           "url": {
             "raw": "http://localhost:3000/api/login",
             "protocol": "http",
             "host": ["localhost"],
             "port": "3000",
             "path": ["api", "login"]
           }
         }
       },
       {
         "name": "Get All News",
         "request": {
           "method": "GET",
           "header": [],
           "url": {
             "raw": "http://localhost:3000/api/news",
             "protocol": "http",
             "host": ["localhost"],
             "port": "3000",
             "path": ["api", "news"]
           }
         }
       },
       {
         "name": "Create News",
         "request": {
           "method": "POST",
           "header": [
             {
               "key": "Cookie",
               "value": "connect.sid={{session_id}}"
             }
           ],
           "body": {
             "mode": "formdata",
             "formdata": [
               {
                 "key": "judul",
                 "value": "Judul Berita Baru",
                 "type": "text"
               },
               {
                 "key": "isi",
                 "value": "Ini adalah isi berita baru...",
                 "type": "text"
               },
               {
                 "key": "status",
                 "value": "published",
                 "type": "text"
               },
               {
                 "key": "gambar",
                 "type": "file",
                 "src": "/path/to/your/image.jpg"
               }
             ]
           },
           "url": {
             "raw": "http://localhost:3000/api/news",
             "protocol": "http",
             "host": ["localhost"],
             "port": "3000",
             "path": ["api", "news"]
           }
         }
       }
     ]
   }
   ```

### Langkah-langkah Testing
1. **Login**
   - Jalankan request "Login Admin"
   - Simpan `connect.sid` dari response headers untuk request selanjutnya

2. **Melihat Daftar Berita**
   - Jalankan request "Get All News"
   - Tidak memerlukan autentikasi

3. **Membuat Berita Baru**
   - Ganti `{{session_id}}` dengan session ID yang didapat dari login
   - Sesuaikan path file gambar di form-data
   - Jalankan request "Create News"

4. **Mengupdate Berita**
   - Buat request baru dengan method PUT ke `http://localhost:3000/api/news/:id`
   - Gunakan form-data seperti pada create news
   - Sertakan session ID di headers

5. **Menghapus Berita**
   - Buat request baru dengan method DELETE ke `http://localhost:3000/api/news/:id`
   - Sertakan session ID di headers

## Struktur Database

### Tabel `admin`
- id_admin (PK)
- username
- password (hash)
- nama_lengkap
- created_at
- updated_at

### Tabel `berita`
- id_berita (PK)
- judul
- isi
- gambar (path ke file)
- status (draft/published)
- id_admin (FK ke admin)
- created_at
- updated_at

## Variabel Environment

Buat file `.env` di root direktori dengan konten:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=disporasemarang_db
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
```

## Kontribusi

1. Fork repository
2. Buat branch untuk fitur baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -am 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Lisensi

MIT License
