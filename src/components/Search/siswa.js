import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get, push, onValue } from 'firebase/database';
import firebaseApp from '../../utils/firebase';

const Siswa= () => {
    const [dataList, setDataList] = useState([]);
    const rootReference = ref(getDatabase(firebaseApp));
    const [searchTerm, setSearchTerm] = useState('');
    const [ searchResults, setSearchResult] = useState([]);
    const [ isLoading, setIsLoading] = useState(false);


    const getValue = async () => {
        try {
            setIsLoading(true);
            const database = getDatabase(firebaseApp);
            const rootReference = ref(database);
            const dbGet = await get(child(rootReference, 'status-alat'));
            const dbValue = dbGet.val();

            if (dbValue) {
                setDataList(Object.values(dbValue));
                handleSearch();
            }
            const isExist = dbGet.exists();
        } catch (getError) {
            console.error('Error',getError.message);
        } finally {
            setIsLoading(false);
        }
    };


    const handleSearch = () => {
        const results = [];
        for (const item of dataList) {
            if(
              (item.nama_siswa && item.nama_siswa.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (item.tanggal_ahir && item.tanggal_ahir.toLowerCase().includes(searchTerm.toLowerCase()))
            ) {
                results.push(item);
            }
        }
        setSearchResult(results);
    };

    useEffect(() => {
        getValue();
    }, []);

    return (
      <div className="bg-gray-100 p-8">
    <h1 className="text-2xl font-semibold mb-4">Data Siswa</h1>
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
        placeholder="Klik Enter"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-green-400 text-white px-3 py-1 rounded-r-md transition duration-300 ease-in-out "
      >
        Search
      </button>
    </div>
    
    <div className="overflow-x-scroll">
    <table className="min-w-full divide-y divide-gray-200 ">
    <thead className="bg-blue-600">
      <tr>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
        >
          Nomor Induk Siswa
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
        >
          Nama Siswa
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
        >
          Tanggal Lahir
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
        >
          Tempat Lahir
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
        >
          Nama Ayah
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
        >
          Jenis Kelamin
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {searchResults.map((item, index) => (
        <tr key={index}>
          <td className="px-6 py-4 whitespace-nowrap">{item.nomor_induk}</td>
          <td className="px-6 py-4 whitespace-nowrap">{item.nama_siswa}</td>
          <td className="px-6 py-4 whitespace-nowrap">{item.tanggal_lahir}</td>
          <td className="px-6 py-4 whitespace-nowrap">{item.tempat_ahir}</td>
          <td className="px-6 py-4 whitespace-nowrap">{item.nama_ayah}</td>
          <td className="px-6 py-4 whitespace-nowrap">{item.jenis_kelamin}</td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
  </div>
    );
};

export default Siswa;
