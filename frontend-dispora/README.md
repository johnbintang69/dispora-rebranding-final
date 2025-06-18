# 🏛️ Website Resmi DISPORA Kota Semarang

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

Website resmi Dinas Pemuda dan Olahraga (DISPORA) Kota Semarang yang menampilkan profil, berita, galeri, dan informasi seputar kegiatan kepemudaan dan olahraga di Kota Semarang.

## ✨ Fitur Utama

- **Berita & Artikel**
  - Daftar berita terbaru
  - Kategori berita
  - Pencarian berita
  - Detail berita lengkap

- **Galeri Kegiatan**
  - Galeri foto kegiatan
  - Kategori galeri
  - Tampilan grid yang responsif

- **Profil & Informasi**
  - Profil Dinas
  - Visi & Misi
  - Struktur Organisasi
  - Kontak & Lokasi

- **Fitur Tambahan**
  - Tema responsif (Desktop & Mobile)
  - Animasi halus dengan Framer Motion
  - Optimasi performa
  - SEO friendly

## 🚀 Teknologi

- **Frontend Framework**: React 18
- **Build Tool**: Vite 4
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM 6
- **Animation**: Framer Motion
- **Icons**: React Icons
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **State Management**: React Context API

## 🛠️ Prasyarat

- Node.js 16+
- npm 8+ atau Yarn 1.22+
- Git

## 🚀 Memulai

### Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/dispora-rebranding.git
   cd frontend-dispora
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   # atau gunakan yarn
   yarn
   ```

### Konfigurasi

1. Salin file `.env.example` ke `.env`
   ```bash
   cp .env.example .env
   ```

2. Sesuaikan konfigurasi di file `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_BASE_URL=http://localhost:5173
   VITE_APP_TITLE=DISPORA Kota Semarang
   ```

### Menjalankan Aplikasi

- **Development Mode**
  ```bash
  npm run dev
  # atau
  yarn dev
  ```
  Buka [http://localhost:5173](http://localhost:5173) untuk melihat di browser.

- **Production Build**
  ```bash
  npm run build
  npm run preview
  ```
  Aplikasi akan tersedia di `dist/` dan dapat dijalankan dengan server produksi.

## 🧩 Struktur Proyek

```
src/
├── assets/           # Aset statis (gambar, font, dll)
├── components/       # Komponen UI yang dapat digunakan ulang
├── config/           # Konfigurasi aplikasi
├── contexts/         # React Context
├── hooks/            # Custom Hooks
├── layouts/          # Layout halaman
├── pages/            # Halaman aplikasi
├── services/         # Layanan API
├── styles/           # File CSS/SCSS global
├── utils/            # Fungsi utilitas
├── App.jsx           # Komponen utama
└── main.jsx          # Entry point aplikasi
```

## 🧪 Testing

```bash
# Menjalankan test
npm test

# Menjalankan test dengan coverage
npm run test:coverage
```

## 🏗️ Build untuk Produksi

```bash
# Build untuk produksi
npm run build

# Preview build produksi secara lokal
npm run preview
```

## 🌐 Deployment

Aplikasi ini dapat dideploy ke berbagai platform seperti:
- Vercel
- Netlify
- GitHub Pages
- Hosting statis lainnya

## 🤝 Berkontribusi

1. Fork repository ini
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -am 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## 📝 Lisensi

Dibawah lisensi [MIT](LICENSE) - Hak Cipta  2025 DISPORA Kota Semarang

## 📞 Kontak

- **Email**: dispora@semarangkota.go.id
- **Alamat**: Jl. Pemuda No. 1, Semarang, Jawa Tengah
- **Website Resmi**: https://dispora.semarangkota.go.id

## 🙏 Ucapan Terima Kasih

Terima kasih kepada semua pihak yang telah berkontribusi dalam pengembangan website ini.
5. Buat Pull Request

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

Dikembangkan oleh [Nama Anda] untuk DISPORA Kota Semarang.
