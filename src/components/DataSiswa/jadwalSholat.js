import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get, push } from 'firebase/database';
import firebaseApp from '../../utils/firebase';

const JadwalSholat = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newData, setNewData] = useState({hari: '', imam: ''});

  const getValue = async () => {
    try {
      setIsLoading(true);
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database);
      const dbGet = await get(child(rootReference, 'jadwal-sholat'));
      const dbvalue = dbGet.val();
      if (dbvalue) {
        setDataList(Object.values(dbvalue));
      }
      const isExist = dbGet.exists();
    } catch (getError) {
      console.error('Error:', getError.message);
    } finally {
      setIsLoading(false);
    }
  };

  // fungsi untuk menambahkan data
  const addData = async (newData) => {
    try {
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database, 'jadwal-sholat');
      await push(rootReference, newData);
      console.log('data berhasil ditambahkan');
      getValue();
    } catch (error) {
      console.log(' Error menambahkan data :', error.message);
    }
  }

  // fungsi untuk menghapus data
  const removeData = async (key) => {
    try {
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database, 'jadwal-sholat');
      // mengambil data dari database
      const dbGet = await get(child(rootReference, 'dataList'));
      const dbValue = dbGet.val();

      // hapus data dengan indeks yang diinginkan
      if (dbValue && dbValue[index]) {
        const itemReference = ref(rootReference, 'dataList/' + index)
        await remove(itemReference);
        console.log('data berhasil dihapus')
        getValue();
        }
      } catch (error) {
        console.error('Gagal Menghapus Data', error.message);
      }
    };

const confirmDelete = (index) => {
      if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        removeData(index);
      }
    };

  const handleSearch = () => {
    const results = [];
    for (const item of dataList) {
      if (
        (item.hari && item.hari.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.imam && item.imam.toLowerCase().includes(searchTerm.toLowerCase()))
      ) {
        results.push(item);
      }
    }

    setSearchResults(results);
  };

  useEffect(() => {
    getValue();
  }, []);

  return (
    <div className="bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold mb-4">Jadwal Sholat</h1>
    <div className="flex mb-4">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      }}
      className="px-3 py-2 border rounded-l-md w-50 focus:outline-none"
      placeholder="Cari"
    />
    <button
      onClick={handleSearch}
      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-r-md"
    >
      Search
    </button>
  </div>
    <table className="table-auto min-w-full divide-y divide-gray-200">
      <thead className="bg-blue-600">
        <tr>
          <th scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Hari</th>
          <th scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Imam</th>
        </tr>
      </thead>
      <tbody>
        {searchResults.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
            <td className="px-6 py-4 whitespace-nowrap">{item.hari}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.imam}</td>
            <td className="px-6 py-4 whitespace-nowrap">
        <button onClick={() => confirmDelete(index)} className="text-red-600 hover:underline">Hapus</button>
        </td>
          </tr>
        ))}
      </tbody>
    </table>

      <form onSubmit={(e) => {e.preventDefault(); addData(newData); setNewData({ hari: '', imam: ''})}} className="mt-4">
        <div className="flex mb-4">
      <input type="text" className="px-4 py-2 border rounded-r-md w-1/2 focus:outline-none" placeholder="Hari" value={newData.hari} onChange={(e) => setNewData({...newData, hari: e.target.value})} />
        <input type="text" className="px-4 py-2 border rounded-r-md w-1/2 focus:outline-none" placeholder="Imam" value={newData.imam} onChange={(e) => setNewData({...newData, imam: e.target.value})} />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Tambah Data</button>
      </form>
    </div>
  );
};

export default JadwalSholat;
