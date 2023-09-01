import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, push, onValue } from "firebase/database";
import firebaseApp from "../../utils/firebase";

const Guru = () => {
  const [dataList, setDataList] = useState([]);
  const rootReference = ref(getDatabase(firebaseApp));
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getValue = async () => {
    try {
      setIsLoading(true);
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database);
      const dbGet = await get(child(rootReference, "data-guru"));
      const dbValue = dbGet.val();

      if (dbValue) {
        setDataList(Object.values(dbValue));
        handleSearch();
      }
      const isExist = dbGet.exists();
    } catch (getError) {
      console.error("Error", getError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const results = [];
    for (const item of dataList) {
      if ((item.nama_guru && item.nama_guru.toLowerCase().includes(searchTerm.toLowerCase())) || (item.mata_pelajaran && item.mata_pelajaran.toLowerCase().includes(searchTerm.toLowerCase()))) {
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
      <h1 className="text-2xl font-semibold mb-4">Data Guru</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="px-3 py-2 border rounded-l-md w-50 focus:outline-none"
          placeholder="Cari"
        />
        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-r-md">
          Search
        </button>
      </div>
      <table className="table-auto min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-600">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Nomor Induk Guru
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Nama Guru
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Mata Pelajaran
            </th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <td className="px-6 py-4 whitespace-nowrap">{item.nomor_guru}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.nama_guru}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.mata_pelajaran}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Guru;
