import db from '../config/db.js';
import path from 'path';
import fs from 'fs';

// Helper function to generate URL-friendly slug
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '')          // Trim - from end of text
    .substring(0, 100);          // Limit length to 100 chars
};

// Validasi input berita
const validateNewsInput = (judul, isi) => {
  const errors = [];
  
  if (!judul || judul.trim() === '') {
    errors.push('Judul berita harus diisi');
  } else if (judul.length < 10) {
    errors.push('Judul berita minimal 10 karakter');
  }
  
  if (!isi || isi.trim() === '') {
    errors.push('Isi berita harus diisi');
  } else if (isi.length < 50) {
    errors.push('Isi berita minimal 50 karakter');
  }
  
  return errors;
};

export const createNews = async (req, res) => {
  try {
    const { judul, isi, status = 'draft', ringkasan = '' } = req.body;
    const id_admin = req.session.admin?.id;
    
    if (!id_admin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Validasi input
    const validationErrors = validateNewsInput(judul, isi);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    
    // Generate slug from title
    const slug = generateSlug(judul);
    
    // Check if slug already exists
    const [existing] = await db.query(
      'SELECT id_berita FROM berita WHERE slug = ?',
      [slug]
    );
    
    // If slug exists, append a random string
    const finalSlug = existing.length > 0 
      ? `${slug}-${Math.random().toString(36).substring(2, 7)}` 
      : slug;
    
    // Handle upload gambar
    let gambarPath = '';
    if (req.file) {
      gambarPath = `/uploads/${req.file.filename}`;
    }
    
    // Simpan ke database
    const [result] = await db.query(
      `INSERT INTO berita 
       (judul, isi, ringkasan, gambar, status, id_admin, slug) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [judul, isi, ringkasan, gambarPath, status, id_admin, finalSlug]
    );
    
    // Ambil data berita yang baru dibuat
    const [rows] = await db.query(
      'SELECT * FROM berita WHERE id_berita = ?',
      [result.insertId]
    );
    
    res.status(201).json({
      message: 'Berita berhasil ditambahkan',
      data: rows[0]
    });
    
  } catch (error) {
    console.error('Error creating news:', error);
    
    // Hapus file yang sudah diupload jika terjadi error
    if (req.file) {
      const filePath = path.join('public', req.file.path);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Gagal menghapus file:', err);
      });
    }
    
    res.status(500).json({
      message: 'Gagal menambahkan berita',
      error: error.message
    });
  }
};

export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, isi, status, ringkasan = '' } = req.body;
    const id_admin = req.session.admin?.id;
    
    if (!id_admin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Get existing article
    const [existingNews] = await db.query(
      'SELECT * FROM berita WHERE id_berita = ?',
      [id]
    );
    
    if (existingNews.length === 0) {
      return res.status(404).json({ message: 'Berita tidak ditemukan' });
    }
    
    // Generate new slug if title changed
    let slug = existingNews[0].slug;
    if (judul && judul !== existingNews[0].judul) {
      slug = generateSlug(judul);
      
      // Check if new slug exists
      const [existingSlug] = await db.query(
        'SELECT id_berita FROM berita WHERE slug = ? AND id_berita != ?',
        [slug, id]
      );
      
      if (existingSlug.length > 0) {
        slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
      }
    }
    
    let gambarPath = existingNews[0].gambar;
    
    // Handle upload gambar baru jika ada
    if (req.file) {
      // Hapus gambar lama jika ada
      if (gambarPath) {
        const oldImagePath = path.join('public', gambarPath);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Gagal menghapus gambar lama:', err);
        });
      }
      gambarPath = `/uploads/${req.file.filename}`;
    }
    
    // Update data di database
    await db.query(
      `UPDATE berita 
       SET judul = ?, isi = ?, ringkasan = ?, gambar = ?, status = ?, slug = ?, updated_at = NOW() 
       WHERE id_berita = ? AND id_admin = ?`,
      [judul, isi, ringkasan, gambarPath, status, slug, id, id_admin]
    );
    
    // Ambil data berita yang sudah diupdate
    const [updatedNews] = await db.query(
      'SELECT * FROM berita WHERE id_berita = ?',
      [id]
    );
    
    res.json({
      message: 'Berita berhasil diperbarui',
      data: updatedNews[0]
    });
    
  } catch (error) {
    console.error('Error updating news:', error);
    
    // Hapus file yang baru diupload jika terjadi error
    if (req.file) {
      const filePath = path.join('public', req.file.path);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Gagal menghapus file:', err);
      });
    }
    
    res.status(500).json({
      message: 'Gagal memperbarui berita',
      error: error.message
    });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const id_admin = req.session.admin?.id;
    
    if (!id_admin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Dapatkan data berita yang akan dihapus
    const [newsToDelete] = await db.query(
      'SELECT * FROM berita WHERE id_berita = ?',
      [id]
    );
    
    if (newsToDelete.length === 0) {
      return res.status(404).json({ message: 'Berita tidak ditemukan' });
    }
    
    // Hapus gambar terkait jika ada
    if (newsToDelete[0].gambar) {
      const imagePath = path.join('public', newsToDelete[0].gambar);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Gagal menghapus gambar:', err);
      });
    }
    
    // Hapus dari database
    const [result] = await db.query(
      'DELETE FROM berita WHERE id_berita = ? AND id_admin = ?',
      [id, id_admin]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Gagal menghapus berita' });
    }
    
    res.json({ message: 'Berita berhasil dihapus' });
    
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({
      message: 'Gagal menghapus berita',
      error: error.message
    });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT b.*, a.nama_lengkap as author 
       FROM berita b 
       LEFT JOIN admin a ON b.id_admin = a.id_admin 
       ORDER BY b.tanggal DESC`
    );
    
    res.json(rows);
    
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      message: 'Gagal mengambil daftar berita',
      error: error.message
    });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [rows] = await db.query(
      `SELECT b.*, a.nama_lengkap as author 
       FROM berita b 
       LEFT JOIN admin a ON b.id_admin = a.id_admin 
       WHERE b.id_berita = ?`,
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Berita tidak ditemukan' });
    }
    
    res.json(rows[0]);
    
  } catch (error) {
    console.error('Error fetching news by id:', error);
    res.status(500).json({
      message: 'Gagal mengambil detail berita',
      error: error.message
    });
  }
};
