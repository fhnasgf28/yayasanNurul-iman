import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get, push, onValue} from 'firebase/database';
import firebaseApp from '../../utils/firebase';

const DataGuru = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newData, setNewData] = useState({nomor_guru: '', nama_guru: '', mata_pelajaran: ''})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const rootReference = ref(getDatabase(firebaseApp))
  const [isInputEmpty, setIsInputEmpty] = useState(false);


  const onDataChange = (snapshot) => {
    const dbvalue = snapshot.val();
    if (dbvalue) {
      setDataList(Object.values(dbvalue));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onValue(rootReference, onDataChange);

    return () => {
      unsubscribe(); // Jangan lupa menghapus listener saat komponen unmount
    };
  }, []);

  const getValue = async () => {
    try {
      setIsLoading(true);
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database);
      const dbGet = await get(child(rootReference, 'data-guru'));
      const dbvalue = dbGet.val();
      if (dbvalue) {
        setDataList(Object.values(dbvalue));
        handleSearch();
      }
      const isExist = dbGet.exists();
    } catch (getError) {
      console.error('Error:', getError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addData = async (newData) => {
    try {
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database, 'data-guru');
      await push(rootReference, newData);
      console.log('data berhasil ditambahkan');
      setIsModalOpen(false);
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
      },3000);
      getValue();
    } catch (error) {
      console.log('Error menambahkan Data:', error.message)
    }
  }

  const handleSearch = () => {
    const results = [];
    for (const item of dataList) {
      if (
        (item.nama_guru && item.nama_guru.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.mata_pelajaran && item.mata_pelajaran.toLowerCase().includes(searchTerm.toLowerCase()))
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
      <h1 className="text-2xl font-semibold mb-4">Data Guru</h1>
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
        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nomor Induk Guru</th>
          <th scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nama Guru</th>
          <th scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Mata Pelajaran</th>
        </tr>
      </thead>
      <tbody>
        {searchResults.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
            <td className="px-6 py-4 whitespace-nowrap">{item.nomor_guru}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.nama_guru}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.mata_pelajaran}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newData.nomor_guru && newData.nama_guru && newData.mata_pelajaran) {
            addData(newData);
            setNewData({ nomor_guru: '', nama_guru: '', mata_pelajaran: '' });
          } else {
            setIsInputEmpty(true);
          }
        }}
        className="mt-4"
      >
        <input
          type="text"
          className="px-4 py-2 border rounded-r-md w-1/2 focus:outline-none"
          placeholder="Nomor Guru"
          value={newData.nomor_guru}
          onChange={(e) => setNewData({ ...newData, nomor_guru: e.target.value })}
        />

        <input
          type="text"
          className="px-4 py-2 border rounded-r-md w-1/2 focus:outline-none"
          placeholder="Nama Guru"
          value={newData.nama_guru}
          onChange={(e) => setNewData({ ...newData, nama_guru: e.target.value })}
        />

      <input
          type="text"
          className="px-4 py-2 border rounded-r-md w-1/2 focus:outline-none"
          placeholder="Mata Pelajaran"
          value={newData.mata_pelajaran}
          onChange={(e) => setNewData({ ...newData, mata_pelajaran: e.target.value })}
        />

        {/* ...other input fields */}
        
        <button
          onClick={() => {
            setIsInputEmpty(false);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Tambah Data
        </button>

        {isInputEmpty && (
          <div className="text-red-500 mt-2">Semua field harus diisi</div>
        )}

        {isNotificationVisible && (
          <div className="bg-green-500 text-white p-4 mt-4 rounded">
            Data Berhasil Ditambahkan
          </div>
        )}
      </form>
    </div>
  );
};

export default DataGuru;
