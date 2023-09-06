import React, { useState } from 'react';
import { getDatabase, ref, child, get, push, onValue} from 'firebase/database';
import firebaseApp from '../../utils/firebase';

interface Berita {
    judul: string;
    isi: string;
    gambar: string;
  }
interface TambahBeritaProps {
    tambahBerita: (beritaBaru: Berita) => void;
}

const TambahBerita: React.FC<TambahBeritaProps> = ({tambahBerita}) => {
    const [judul, setJudul] = useState('');
    const [isi, setIsi] = useState('');
    const [gambar, setGambar] = useState('');

    const handleTambahBerita = () => {
        
        const database = getDatabase(firebaseApp);
        const beritaRef = ref(database, 'berita');
        const konfirmasi = window.confirm("Apakah kamu yakin ingin menambahkan Berita ?")
        if (konfirmasi) {
        // membuat objek berita baru
        const beritaBaru = {
            judul,
            isi,
            gambar,
        };

        // memanggil fungsi tambah Berita dari prop
        tambahBerita(beritaBaru);
        // mengosongkan input setelah menambahkan berita
        setJudul('');
        setIsi('');
        setGambar('');
        
        push(beritaRef, beritaBaru)
            .then(() => {
                alert('berita berhasil ditambahkan');
            })
            .catch((error) => {
                console.log('error saat menambahkan berita', error);
            });
        }
    }

    return(
        <div className='grid gap-2 w-1/2'>
      <h2 className="text-2xl font-semibold mt-4 mb-4">Tambah Berita Baru</h2>
      <input
        type="text"
        placeholder="Judul Berita"
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
      />
      <textarea
        placeholder="Isi Berita"
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        value={isi}
        onChange={(e) => setIsi(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="URL Gambar"
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        value={gambar}
        onChange={(e) => setGambar(e.target.value)}
      />
      <button onClick={handleTambahBerita} className="bg-blue-500 hover:bg-blue-600 text-white px-2 mr-2 py-1 rounded-md w-1/3">Tambah Berita</button>
    </div>
    );
}

export default TambahBerita;