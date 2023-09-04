import React, { useEffect, useState} from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import firebaseApp from '../../utils/firebase';
import GoogleSheetsEmbed from '../Laporan/googleSheet';

const FinancialReport = () => {
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [ totalPengeluaran,setTotalPengeluaran ] = useState(0);
  const [ saldoBulanan, setSaldoBulanan ] = useState(0);
  const [ financialData, setFinancialData] = useState ([]);
  const [bulanTahun, setBulanTahun] = useState ('');
  const FormatAngka = (angka: number) => {
    return angka.toLocaleString('id-ID')
  } 

  useEffect (() => {
    const database = getDatabase(firebaseApp);
    const pemasukanRef = ref(database, 'pemasukan');
    const pengeluaranRef = ref(database, 'pengeluaran');
    
    // fungsi untuk mendapatkan bulan dalam format "Januari", "Feb,...", "Mar..."
    const getMonthName = (month: number) => {
      const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus","September", "Oktober", "November", "Desember"]
      return monthNames[month];
    };

    const currenDate = new Date();
    const currentMonth = currenDate.getMonth();
    const currentYear = currenDate.getFullYear();

    const monthName = getMonthName(currentMonth);
    setBulanTahun(`${monthName} ${currentYear}`)


    // mengambil data masukan dari firebase 
    onValue(pemasukanRef, (snapshot) => {
      let totalPemasukan = 0;
      snapshot.forEach((childSnapshot) => {
        totalPemasukan += childSnapshot.val().amount;
      })

      setTotalPemasukan(totalPemasukan);
    });

    // mengambil data pengeluaran dari firebase
    onValue(pengeluaranRef, (snapshot) => {
      let totalPengeluaran = 0;
      snapshot.forEach((childSnapshot) => {
        totalPengeluaran += childSnapshot.val().amount;
    });
      setTotalPengeluaran(totalPengeluaran);
    });
  },[]);

  // mengambil data untuk rincian pemasukan dan pengeluaran
  

  useEffect (() => {
  // saldo bulanan
  const saldo = totalPemasukan - totalPengeluaran;
  setSaldoBulanan(saldo);
  }, [totalPemasukan,totalPengeluaran]);

  return (


    <div>
      <h2>Laporan Keuangan</h2>
      <GoogleSheetsEmbed/>
      <div className="bg-white rounded-lg shadow-lg p-4">
  <h2 className="text-2xl font-semibold mb-4">Laporan Keuangan Realtime - {bulanTahun}</h2>
  <table className="w-full">
    <thead>
      <tr className="bg-gray-200">
        <th className="py-2 px-4 text-left">Keterangan</th>
        <th className="py-2 px-4 text-right">Nominal</th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-blue-300">
        <td className="py-2 px-4">Total Pemasukan</td>
        <td className="py-2 px-4 text-right"> Rp. {FormatAngka(totalPemasukan)}</td>
      </tr>
      <tr className="bg-red-300">
        <td className="py-2 px-4">Total Pengeluaran</td>
        <td className="py-2 px-4 text-right">Rp. {FormatAngka(totalPengeluaran)}</td>
      </tr>
      <tr className="bg-green-300">
        <td className="py-2 px-4">Saldo Bulan {bulanTahun}</td>
        <td className="py-2 px-4 text-right">Rp. {FormatAngka(saldoBulanan)}</td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
  );
};

export default FinancialReport;