import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Guru from '../src/components/Search/guru';
import Siswa from '../src/components/Search/siswa';
import { PageLayout } from "../src/components";
import FeaturedArticleSection from "../src/components/Misc/FeaturedArticleSection";
import HomeNonFeatureArticles from "../src/components/Misc/HomeNonFeatureAricles";
import FinancialReport from '../src/components/Laporan/laporan';

const DataDataPencarian = () => {
  const [selectedOption, setSelectedOption] = useState('siswa');
  const handleChangeOption = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <PageLayout>
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
      </select>
      </div>
      <div className='bg-white p-4 rounded-md shadow-md'>
      {selectedOption === 'siswa' ? <Siswa /> : null}
        {selectedOption === 'guru' ? <Guru /> : null}
        {/* {selectedOption === 'Jadwal Sholat' ? <JadwalSholat /> : null}  */}
    </div>
    <FinancialReport/>
    </div>

    <div className="container mx-auto lg:px-[15px] px-0">
        <div className={'flex flex-wrap'}>
          <FeaturedArticleSection />
          <h1 className='px-3 w-full mb-5 text-xl md:text-3xl font-medium'>Cek Berita Lainnya</h1>
          <hr className='border-1 mb-5 w-[98%] mx-auto' />
          <HomeNonFeatureArticles />
        </div>
      </div>
    </PageLayout>
  );
};

export default DataDataPencarian;
