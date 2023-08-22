import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get, push } from 'firebase/database';
import firebaseApp from '../../utils/firebase';

const JadwalSholat = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newData, setNewData] = useState({hari: '', imam: ''});
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const handleDeleteClick = (key) => {
    setItemToDelete(key)
  }

  const confirmDelete = async () => {
    if (itemToDelete) {
      await removeData(itemToDelete);
      setItemToDelete(null);
    }
  };

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
      setIsModalOpen(false);
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
      },3000)
      getValue();
    } catch (error) {
      console.log(' Error menambahkan data :', error.message);
    }
  } 

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

  const removeData = async (key) => {
    try {
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database, 'jadwal-sholat');
      await remove(child(rootReference, key));
      console.log('Data Berhasil Dihapus');
      getValue();
    } catch (error) {
      console.error('Gagal Menghapus Data', error.message);
    }
  };

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
            <button onClick={() => handleDeleteClick(item.key)} className="text-red-600">Hapus</button>
        </td>
          </tr>
        ))}
      </tbody>
    </table>

      <form onSubmit={(e) => {
          e.preventDefault();
          if (newData.hari && newData.imam) {
            addData(newData);
            setNewData({ hari: '', imam: ''});
          } else {
            setIsInputEmpty(true);
          }
        }}
        className="mt-4">
        <div className="flex mb-4">
        <input type="text" className="px-4 py-2 border rounded-r-md w-1/2 focus:outline-none" placeholder="Hari" value={newData.hari} onChange={(e) => setNewData({...newData, hari: e.target.value})} />
        <input type="text" className="px-4 py-2 border rounded-r-md w-1/2 focus:outline-none" placeholder="Imam" value={newData.imam} onChange={(e) => setNewData({...newData, imam: e.target.value})} />
        </div>
        <button onClick= {() => {
          setIsInputEmpty(false);
          setIsModalOpen(true);
        }} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Tambah Data</button>

        {isInputEmpty && (
          <div className="text-red-500 mt-2">Semua field harus diisi</div>
        )}

        {isNotificationVisible && (
          <div className="bg-green-500 text-white p-4 mt-4 rounded">
            Data Berhasil Ditambahkan
          </div>
        )}

      </form>

      {/* {itemToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="flex justify-end mt-4">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Ya</button>
              <button onClick={() => setItemToDelete(null)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Tidak</button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default JadwalSholat;
