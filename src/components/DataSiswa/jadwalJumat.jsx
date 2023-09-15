import { useEffect, useState } from 'react';
import Text from '../Text';
import { getDatabase, ref, push, child, get, remove,onValue, update } from 'firebase/database';
import firebaseApp from '../../utils/firebase';
import { config } from 'process';


const JadwalJumat = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const rootReference = ref(getDatabase(firebaseApp))
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [newData, setNewData] = useState({nama_khatib: '', bulan: '', tanggal: '',})
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
      nama_khatib:'',
      bulan : '',
      tanggal: '',
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
      const dbGet = await get(child(rootReference, 'jadwal-jumat'));
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

  const addData = async (newData) => {
    try {
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database, 'jadwal-jumat');
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
        (item.bulan && item.bulan.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.nama_khatib && item.nama_khatib.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      {
        results.push(item);
      }
    }

    setSearchResults(results);
  };

  // bagian untuk mengedit data siswa
  const editDataItem = async (field, value, newData) => {
    try {
      const database = getDatabase(firebaseApp);
      const dataRef = ref(database, 'jadwal-jumat');
      const snapshot = await get(dataRef);

      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData[field] === value) {
          update(childSnapshot.ref, newData); // Menggunakan update untuk mengganti data
          console.log('Data berhasil diperbaharui.');
        }
        setIsEditSuccess(true);
      setTimeout(() => {
        setIsEditSuccess(false);
      },3000);
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
  const isConfirmed = window.confirm("Apakah anda Yakin ingin mengedit data ini?")
  // Memanggil fungsi editDataByCondition dengan kriteria dan data yang sesuai

  if (isConfirmed){
  editDataItem('nama_khatib', editData.nama_khatib, {
      nama_khatib: editData.nama_khatib,
      bulan : editData.bulan,
      tanggal: editData.tanggal,
  });
  // Mengosongkan input setelah pengeditan
  setEditData({
      nama_khatib: '',
      bulan : '',
      tanggal: '',
  });
} else {
  alert('Tidak ada Perubahan');
  }
}

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
      const dataRef = ref(database, 'jadwal-jumat');
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

// perulangan form input
const inputConfigs = [
  { placeholder: 'Nama Khatib', stateKey: 'nama_khatib' },
  { placeholder: 'Bulan', stateKey: 'bulan' },
  { placeholder: 'Tanggal', stateKey: 'tanggal' },
]

// perulangan Tabel Header
  const tableHeaders = [
    'Nama Khatib',
    'Bulan',
    'Tanggal',
  ]

  useEffect(() => {
    getValue();
  }, []);

  return (
    <div className="bg-gray-100 p-8">
    <h1 className="text-2xl font-semibold mb-4">Jadwal Khatib Jumat, Tahun {new Date().getFullYear()}</h1>
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
      className="bg-blue-500 hover:bg-green-400 text-white px-3 py-1 rounded-r-md transition duration-300 ease-in-out "
    >
      Search
    </button>
  </div>
  <Text>Gunakan tanda "/" untuk memisahkan tanggal ataupun bulan </Text>
  <div className="overflow-x-scroll">
    {/* tabel data */}
  <table className="min-w-full divide-y divide-gray-200 ">
  <thead className="bg-blue-600">
    <tr>
      {tableHeaders.map((header, index) => (
        <th
        key={index}
        scope='col'
        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
        >{header}</th>
      ))}
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {searchResults.map((item, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
        <td className="px-6 py-4 whitespace-nowrap">{item.nama_khatib}</td>
        <td className="px-6 py-4 whitespace-nowrap">{item.bulan}</td>
        <td className="px-6 py-4 whitespace-nowrap">{item.tanggal}</td>

        <td className="px-6 py-4 whitespace-nowrap">
          <button className="bg-green-500 hover:bg-blue-600 text-white px-2 mr-2 py-1 rounded-md" 
        onClick={() => openEditModal(item)}>Edit</button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
            onClick={() => openDeleteModal(item)}>
            Hapus
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
      {/* Akhir Tabel Data */}
      {/* awal Form */}
    <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newData.nama_khatib && newData.bulan && newData.tanggal) {
            addData(newData);
            setNewData({ nama_khatib: '', bulan: '', tanggal: '',});
          } else {
            setIsInputEmpty(true);
          }
        }}
        className="mt-4"
      >
        {inputConfigs.map((config, index) => (
          <input
          key={index}
          type='text'
          className="px-4 py-2 border rounded-r-md w-1/2 focus:outline-none"
          placeholder={config.placeholder}
          value={newData[config.stateKey] || ''}
          onChange={(e) => 
          setNewData({...newData, [config.stateKey]: e.target.value})
        }
        />
        ))}

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
      
      {editData && (
        <div className='mt-4'>
          {inputConfigs.map((config) => (
          <input
            type="text"
            placeholder={config.placeholder}
            name = {config.stateKey}
            value={editData[config.stateKey]}
            className="px-4 py-2 border rounded-r-md w-1/2 focus:outline-none"
            onChange={handleInputChange}
            key={config.stateKey}
          />
          ))}
          <button className="bg-green-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md" onClick={handleEditClick}>Edit Data</button>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md">
              <p className="mb-2">Apakah Anda yakin ingin menghapus data?</p>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => {
                    deleteDataByCondition('bulan', dataToDelete.bulan);
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

            {isEditSuccess && (
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
            Data Berhasil Di Edit
          </div>
          )}
  </div>
</div>
  );
};

export default JadwalJumat;
