// lib/db.js
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: '',
  database: 'jadwalKeagamaan',
});

db.connect((error) => {
  if (error) {
    console.error('Gagal terhubung ke database:', error);
  } else {
    console.log('Berhasil terhubung ke database');
  }
});

export default db;
