import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get, push, onValue, remove, update} from 'firebase/database';
import firebaseApp from '../../utils/firebase';
import { Seperator } from '../Seperator';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    nomor_guru: '', // Nomor guru yang akan diedit
    nama_guru: '', // Data baru yang ingin Anda set
    mata_pelajaran: '', // Data baru yang ingin Anda set
  });

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

  // bagian untuk mengedit Data
  const editDataItem = async (field, value, newData) => {
    try {
      const database = getDatabase(firebaseApp);
      const dataRef = ref(database, 'data-guru');
      const snapshot = await get(dataRef);

      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData[field] === value) {
          update(childSnapshot.ref, newData); // Menggunakan update untuk mengganti data
          console.log('Data berhasil diperbaharui.');
        }
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
}

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setEditData({
    ...editData,
    [name]: value,
  });
};

const handleEditClick = () => {
  // Memanggil fungsi editDataByCondition dengan kriteria dan data yang sesuai
  editDataItem('nomor_guru', editData.nomor_guru, {
    nomor_guru: editData.nomor_guru,
    nama_guru: editData.nama_guru,
    mata_pelajaran: editData.mata_pelajaran,
  });
  // Mengosongkan input setelah pengeditan
  setEditData({
    nomor_guru: '',
    nama_guru: '',
    mata_pelajaran: '',
  });
};

const openEditModal = (data) => { 
  setIsModalOpen(true);
  setEditData(data);
};
const closeEditModal = () => { 
  setIsEditModalOpen(false);
  setEditData(null);
};

useEffect(() => {
  getValue();
}, []);
// bagian untuk menghaps data
  const deleteDataByCondition = async (field, value) => {
    try {
      const database = getDatabase(firebaseApp);
      const dataRef = ref(database, 'data-guru');
      const snapshot = await get(dataRef);

      snapshot.forEach((childSnaphot) => {
        const childData = childSnaphot.val();
        if (childData[field] === value) {
          remove(childSnaphot.ref);
          console.log('data berhasil dihapus.');
        }
      })
      setIsDeleteSuccess(true);
      setTimeout(() => {
        setIsDeleteSuccess(false);
      },3000);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const openDeleteModal = (data) => {
  setIsDeleteModalOpen(true);
  setDataToDelete(data);
};

const closeDeleteModal = () => {
  setIsDeleteModalOpen(false);
  setDataToDelete(null);
}

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
   {/* Tabel Data */}
   <div className="overflow-x-auto">
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
            <td className="px-6 py-4 ">{item.nomor_guru}</td>
            <td className="px-6 py-4 ">{item.nama_guru}</td>
            <td className="px-6 py-4 ">{item.mata_pelajaran}</td>

        <td className="px-6 py-4 ">
        <button className="bg-green-500 hover:bg-blue-600 text-white px-2 mr-2 py-1 rounded-md" 
        onClick={() => openEditModal(item)}>Edit</button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
            onClick={() => openDeleteModal(item)}
          >
            Hapus
          </button>

      </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  
          {/* akhir tabel data */}

          {/* awal Form */}
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
      {/* akhir form */}

      {/* Modal Konfirmasi Hapus */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md">
              <p className="mb-2">Apakah Anda yakin ingin menghapus data?</p>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => {
                    deleteDataByCondition('nama_guru', dataToDelete.nama_guru);
                    closeDeleteModal();
                  }}
                >
                  Hapus
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                  onClick={closeDeleteModal}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Formuler Pengeditan */}

        {editData && (
        <div className='mt-4'>
      
          <input
            type="text"
            placeholder="Nama Guru"
            name = "nama_guru"
            value={editData.nama_guru}
            className="px-4 py-2 border rounded-r-md w-1/2 focus:outline-none"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name = "mata_pelajaran"
            placeholder="Mata Pelajaran"
            className="px-4 py-2 border rounded-r-md w-1/2 focus:outline-none"
            value={editData.mata_pelajaran}
            onChange={handleInputChange}
          />
          
          <button className="bg-green-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md" onClick={handleEditClick}>Edit Data</button>
        </div>
      )}
        {/* modal untuk data berhasil dihapus */}
            {isDeleteSuccess && (
          <div className="bg-green-500 text-white p-4 mt-4 rounded flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Data Berhasil Dihapus
          </div>
          )}
    </div>
  );
};

export default DataGuru;
