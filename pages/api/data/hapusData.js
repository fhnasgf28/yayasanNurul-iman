import React from 'react';
import axios from 'axios';

const HapusData = ({ data, onHapus }) => {
  const handleHapusData = () => {
    axios
      .delete(`/api/data/${data.id}`)
      .then((response) => {
        console.log('Data berhasil dihapus:', response.data);
        // Lakukan sesuatu setelah data berhasil dihapus
        onHapus(data.id); // Panggil callback untuk menghapus data dari tampilan
      })
      .catch((error) => {
        console.error('Gagal menghapus data:', error);
        // Handle kesalahan jika diperlukan
      });
  };

  return (
    <div>
      <h2>Hapus Data</h2>
      <p>Anda yakin ingin menghapus data ini?</p>
      <button onClick={handleHapusData}>Hapus Data</button>
    </div>
  );
};

export default HapusData;
