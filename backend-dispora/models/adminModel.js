import db from '../config/db.js';

export const findAdminByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM admin WHERE username = ?', [username]);
  return rows[0];
};

export const createAdmin = async (username, hashedPassword) => {
  await db.query('INSERT INTO admin (username, password) VALUES (?, ?)', [username, hashedPassword]);
};
