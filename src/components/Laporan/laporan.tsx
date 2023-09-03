import React, { useEffect, useState} from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import firebaseApp from '../../utils/firebase';
import GoogleSheetsEmbed from '../Laporan/googleSheet';

const FinancialReport = () => {
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [ totalPengeluaran,setTotalPengeluaran ] = useState(0);
  const [ saldoBulanan, setSaldoBulanan ] = useState(0);
  const [ financialData, setFinancialData] = useState ([]);

  useEffect (() => {
    const database = getDatabase(firebaseApp);
    const pemasukanRef = ref(database, 'pemasukan');
    const pengeluaranRef = ref(database, 'pengeluaran');

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
      <div>
            <h2>Total Pemasukan: {totalPemasukan}</h2>
            <h2>Total Pengeluaran: {totalPengeluaran}</h2>
            <h2>Saldo Bulanan: {saldoBulanan}</h2>
        </div>
    </div>
  );
};

export default FinancialReport;