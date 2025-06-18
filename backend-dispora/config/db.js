import mysql from 'mysql2/promise';

const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'disporasemarang_db',
});

export default db;
