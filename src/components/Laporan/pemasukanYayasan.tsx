import React, { useState} from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import firebaseApp from '../../utils/firebase';

const PemasukanYayasan = () => {
    const [type, setType] = useState('pemasukanYayasan');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const database = getDatabase(firebaseApp);
            const financialRef = ref(database,type);

            await push(financialRef, {
                type,
                amount: parseFloat(amount),
                description,
                timestamp: new Date().toISOString(),
            });

            setType('pemasukanYayasan');
            setAmount('');
            setDescription('');
        } catch (error: any) {
            console.error('error', error.message);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="mt-4">
          <h2 className="text-2xl font-semibold mb-4">Tambah Data Keuangan Pembangunan TPQ Yayasan Nurul Iman</h2>
        <select value={type} className="px-4 py-2 border rounded-r-md focus:outline-none" onChange={(e) => setType(e.target.value)} >
          <option value="pemasukanYayasan">pemasukan Yayasan</option>
          <option value="pengeluaranYayasan">pengeluaran Yayasan</option>
        </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="px-4 py-2 border rounded-r-md focus:outline-none"
        placeholder="Jumlah"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="px-4 py-2 border rounded-r-md focus:outline-none"
        placeholder="Deskripsi"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md" type="submit">Tambahkan Data</button>
    </form>
  );
};

export default PemasukanYayasan;