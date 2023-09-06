import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseApp from '../../utils/firebase';

const BeritaList = () => {
  const [beritaList, setBeritaList] = useState([]);

  useEffect(() => {
    const database = getDatabase(firebaseApp);
    const beritaRef = ref(database, 'berita');

    // Membaca data berita dari Firebase saat komponen dimuat
    onValue(beritaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Mengonversi data berita menjadi array
        const beritaArray = Object.values(data);
        setBeritaList(beritaArray);
      }
    });
  }, []);

  return (
    <div>
      <h2>Daftar Berita</h2>
      <ul>
        {beritaList.map((berita, index) => (
          <li key={index}>
            <h3>{berita.judul}</h3>
            <p>{berita.isi}</p>
            <img src={berita.gambar} alt={berita.judul} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeritaList;
