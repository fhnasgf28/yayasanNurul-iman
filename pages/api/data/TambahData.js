import React, { useState } from 'react';
import axios from 'axios';

const TambahData = () => {
    const [namaKegiatan, setNamaKegiatan] = useState('');
    const [hari, setHari] = useState('');
    const [waktu, setWaktu] = useState('');
    const [tempat, setTempat] = useState('');
    const [keterangan, setKeterangan] = useState('');

  const handleTambahData = () => {
    axios
      .post('/api/data', { nama_kegiatan: namaKegiatan, hari, waktu, tempat, keterangan })
      .then((response) => {
        console.log('Data berhasil ditambahkan:', response.data);
        // Lakukan sesuatu setelah data berhasil ditambahkan
      })
      .catch((error) => {
        console.error('Gagal menambahkan data:', error);
        // Handle kesalahan jika diperlukan
      });
  };

  return (
    <div>
      <h2>Tambah Data</h2>
      <input
        type="text"
        placeholder="Nama Kegiatan"
        value={namaKegiatan}
        onChange={(e) => setNamaKegiatan(e.target.value)}
      />
      <input
        type="text"
        placeholder="Hari"
        value={hari}
        onChange={(e) => setHari(e.target.value)}
      />
      <input
        type="text"
        placeholder="Waktu"
        value={waktu}
        onChange={(e) => setWaktu(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tempat"
        value={tempat}
        onChange={(e) => setTempat(e.target.value)}
      />
      <input
        type="text"
        placeholder="Keterangan"
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
      />
      <button onClick={handleTambahData}>Tambah Data</button>
    </div>
  );
};

export default TambahData;
