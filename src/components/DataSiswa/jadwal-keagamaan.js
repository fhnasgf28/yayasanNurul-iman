// Import library mysql2
import db from '../../lib/db';

// Create (Membuat Data Baru)
app.post('/api/data', (req, res) => {
  const { nama_kegiatan, hari, waktu, tempat, keterangan } = req.body;
  const query = 'INSERT INTO jadwal_keagamaan (nama_kegiatan, hari, waktu, tempat, keterangan) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nama_kegiatan, hari, waktu, tempat, keterangan], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gagal membuat data' });
    }
    res.status(201).json({ message: 'Data berhasil dibuat', data: result });
  });
});

// Read (Membaca Data)
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM jadwal_keagamaan';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gagal membaca data' });
    }
    res.status(200).json({ data: results });
  });
});

// Update (Mengedit Data)
app.put('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const { nama_kegiatan, hari, waktu, tempat, keterangan } = req.body;
  const query = 'UPDATE jadwal_keagamaan SET nama_kegiatan = ?, hari = ?, waktu = ?, tempat = ?,keterangan = ? WHERE id = ?';
  db.query(query, [nama_kegiatan, hari, waktu,tempat, keterangan, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gagal mengedit data' });
    }
    res.status(200).json({ message: 'Data berhasil diubah', data: result });
  });
});

// Delete (Menghapus Data)
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM jadwal_keagamaan WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gagal menghapus data' });
    }
    res.status(200).json({ message: 'Data berhasil dihapus', data: result });
  });
});
