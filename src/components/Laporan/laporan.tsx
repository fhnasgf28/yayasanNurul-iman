import React, { useEffect, useState} from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import firebaseApp from '../../utils/firebase';

const FinancialReport = () => {
const [mode, setMode] = useState('harian'); // 'harian' atau 'bulanan'
  const [reportData, setReportData] = useState<any[]>([]);

  const fetchData = (mode: string) => {
    const database = getDatabase(firebaseApp);
    const financialRef = ref(database, 'laporan-keuangan');

    onValue(financialRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.values(data);
        const filteredData = mode === 'harian' ? filterDaily(dataArray) : filterMonthly(dataArray);
        setReportData(filteredData);
      }
    });
  };

  const filterDaily = (data: any[]) => {
    // Filter data untuk tampilkan laporan harian
    // Misalnya, sesuai dengan tanggal hari ini
    const today = new Date().toISOString().split('T')[0];
    return data.filter((item) => item.tanggal === today);
  };

  const filterMonthly = (data: any[]) => {
    // Filter data untuk tampilkan laporan bulanan
    // Misalnya, sesuai dengan bulan dan tahun saat ini
    const today = new Date();
    const thisMonth = today.toISOString().substring(0, 7);
    return data.filter((item) => item.tanggal && item.tanggal.startsWith(thisMonth));

  };

  useEffect(() => {
    fetchData(mode);
  }, [mode]);

  return (
    <div>
      <h2>Laporan Keuangan</h2>
      <div>
        <label>Pilih Mode Tampilan:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="harian">Harian</option>
          <option value="bulanan">Bulanan</option>
        </select>
      </div>
      <ul>
        {reportData.map((item, index) => (
          <li key={index}>
            Tanggal: {item.tanggal}, Deskripsi: {item.deskripsi}, Jumlah: {item.jumlah}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialReport;