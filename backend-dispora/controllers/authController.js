import bcrypt from 'bcrypt';
import db from '../config/db.js';

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM admin WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Username tidak ditemukan' });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Simpan data admin ke session
    req.session.admin = {
      id: admin.id_admin,
      username: admin.username,
      nama_lengkap: admin.nama_lengkap,
    };

    res.json({ message: 'Login berhasil', admin: req.session.admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat login' });
  }
};

export const logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Gagal logout:', err);
      return res.status(500).json({ message: 'Gagal logout' });
    }
    res.clearCookie('connect.sid'); // Nama default cookie session
    res.json({ message: 'Logout berhasil' });
  });
};

export const checkSession = (req, res) => {
  if (req.session && req.session.admin) {
    res.json({ loggedIn: true, admin: req.session.admin });
  } else {
    res.status(401).json({ loggedIn: false });
  }
};
