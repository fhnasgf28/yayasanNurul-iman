import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MyPage from '../src/components/DataSiswa/siswa';
import DataGuru from '../src/components/DataSiswa/dataGuru';
import JadwalSholat from '../src/components/DataSiswa/jadwalSholat';
import JadwalJumat from '../src/components/DataSiswa/jadwalJumat';
import FinancialForm from '../src/components/Laporan/pemasukan';
import SejarahYayasan from '../src/components/VisiMisi/SejarahYayasan';
import Tutorial from '../src/components/newsConten/tutorial';
import MisiYayasan from '../src/components/VisiMisi/misi';

// CRUD
import TambahData from './api/data/TambahData';
import EditData from './api/data/editData';
import HapusData from './api/data/hapusData';


const PencarianData = () => {
  const [selectedOption, setSelectedOption] = useState('siswa');
  const router = useRouter();
  const handleChangeOption = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleGoToIndex = () => {
    router.push('/'); // Ganti '/index' dengan path yang sesuai
  };

  return (

    <div className="relative min-h-screen container bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold mb-4">Pencarian Data</h1>
      <div className='flex items-center space-x-4 mb-4'>
        <label htmlFor="dataOption" className='text-lg'>Pilih Data:</label>
      
      <select
        value={selectedOption}
        onChange={handleChangeOption}
        className="px-3 py-2 border rounded-md focus:outline-blue"
      >
        <option value="siswa">Data Siswa</option>
        <option value="guru">Data Guru</option>
        <option value="Jadwal Sholat">Jadwal Sholat</option>
        <option value="Jadwal Khatib Jumat">Jadwal Khatib Jumat</option>
        <option value="Misi">Misi Yayasan</option>
        <option value="SejarahYayasan">Sejarah Yayasan</option>
        <option value="Tambah">Tambah Data Kegiatan Keagamaan</option>
        <option value="Edit">Edit Data Kegiatan Keagamaan</option>
        <option value="Hapus">Hapus Data Kegiatan Keagamaan</option>
      </select>

      <button
        onClick={handleGoToIndex}
        className="mt-4 bg-indigo-600 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-indigo-200 px-3 py-2 border"
      >
        Keluar
      </button>

      </div>
      <div className='bg-white p-4 rounded-md shadow-md'>
      {selectedOption === 'siswa' ? <MyPage /> : null}
        {selectedOption === 'guru' ? <DataGuru /> : null}
        {selectedOption === 'Jadwal Sholat' ? <JadwalSholat /> : null} {/* Tambahkan kondisi untuk halaman baru */}
        {selectedOption === 'Jadwal Khatib Jumat' ? <JadwalJumat /> : null}
        {selectedOption === 'Misi' ? <MisiYayasan /> : null}
        {selectedOption === 'SejarahYayasan' ? <SejarahYayasan /> : null}
        {selectedOption === 'Tambah' ? <TambahData /> : null}
        {selectedOption === 'Edit' ? <EditData /> : null}
        {selectedOption === 'Hapus' ? <HapusData /> : null}
    <Tutorial/>
    <FinancialForm/>
    </div>
    
    </div> 
  );
};

export default PencarianData;
