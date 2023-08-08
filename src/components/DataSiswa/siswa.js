import { useEffect, useState } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import firebaseApp from '../../utils/firebase';

const MyPage = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const getValue = async () => {
    try {
      setIsLoading(true);
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database);
      const dbGet = await get(child(rootReference, 'status-alat'));
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

  const handleSearch = () => {
    const results = [];
    for (const item of dataList) {
      if (
        (item.nama_siswa && item.nama_siswa.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.tanggal_lahir && item.tanggal_ahir.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      {
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
  <h1 className="text-2xl font-semibold mb-4">Data Siswa</h1>
  <div className="flex mb-4">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
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
  <table className="table-auto w-full">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2">Nomor Induk Siswa</th>
        <th className="px-4 py-2">Nama Siswa</th>
        <th className="px-4 py-2">Tanggal Lahir</th>
        <th className="px-4 py-2">Tempat Lahir</th>
        <th className="px-4 py-2">Nama Ayah</th>
        <th className="px-4 py-2">Jenis Kelamin</th>
      </tr>
    </thead>
    <tbody>
      {searchResults.map((item, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
          <td className="px-4 py-2">{item.nomor_induk}</td>
          <td className="px-4 py-2">{item.nama_siswa}</td>
          <td className="px-4 py-2">{item.tanggal_lahir}</td>
          <td className="px-4 py-2">{item.tempat_ahir}</td>
          <td className="px-4 py-2">{item.nama_ayah}</td>
          <td className="px-4 py-2">{item.jenis_kelamin}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
};

export default MyPage;
