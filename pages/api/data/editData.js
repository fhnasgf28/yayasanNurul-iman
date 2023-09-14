import React, { useState } from 'react';
import axios from 'axios';

const EditData = ({ data }) => {
    const [namaKegiatan, setNamaKegiatan] = useState('');
    const [hari, setHari] = useState('');
    const [waktu, setWaktu] = useState('');
    const [tempat, setTempat] = useState('');
    const [keterangan, setKeterangan] = useState('');

  const handleEditData = () => {
    axios
      .put(`/api/data/${data.id}`, { nama_kegiatan: namaKegiatan, hari, waktu, tempat, keterangan })
      .then((response) => {
        console.log('Data berhasil diubah:', response.data);
        // Lakukan sesuatu setelah data berhasil diubah
      })
      .catch((error) => {
        console.error('Gagal mengedit data:', error);
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
      <button onClick={handleEditData}>Edit Data</button>
    </div>
  );
};

export default EditData;
