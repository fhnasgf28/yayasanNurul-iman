import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MyPage from '../src/components/DataSiswa/siswa';
import DataGuru from '../src/components/DataSiswa/dataGuru';
import PageLayout from '../src/layouts/PageLayouts';

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
      </select>

      <button
        onClick={handleGoToIndex}
        className="mt-4 bg-indigo-600 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-indigo-200 px-3 py-2 border"
      >
        Keluar
      </button>

      </div>
      <div className='bg-white p-4 rounded-md shadow-md'>
      {selectedOption === 'siswa' ? <MyPage /> : <DataGuru />}
    </div>
    </div>
  );
};

export default PencarianData;
