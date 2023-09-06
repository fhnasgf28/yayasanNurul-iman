import React, { useState } from 'react';
import { getDatabase, ref, child, get, push, onValue} from 'firebase/database';
import firebaseApp from '../../utils/firebase';

interface Berita {
    
    isi: string;
    
  }
interface TambahBeritaProps {
    tambahSejarah: (beritaBaru: Berita) => void;
}

const TambahSejarah: React.FC<TambahBeritaProps> = ({tambahSejarah}) => {
 
    const [isi, setIsi] = useState('');
   

    const handleTambahBerita = () => {
        
        const database = getDatabase(firebaseApp);
        const beritaRef = ref(database, 'sejarah');
        const konfirmasi = window.confirm("Apakah kamu yakin ingin menambahkan Sejarah ?")
        if (konfirmasi) {
        // membuat objek berita baru
        const beritaBaru = {
            isi
        };
        // mengosongkan input setelah menambahkan berita
     
        setIsi('');
    
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
      <h2 className="text-2xl font-semibold mt-4 mb-4">Tambah Data Sejarah</h2>
      <textarea
        placeholder="Isi Sejarah"
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        value={isi}
        onChange={(e) => setIsi(e.target.value)}
      ></textarea>
      <button onClick={handleTambahBerita} className="bg-blue-500 hover:bg-blue-600 text-white px-2 mr-2 py-1 rounded-md w-1/3">Tambah Sejarah</button>
    </div>
    );
}

export default TambahSejarah;