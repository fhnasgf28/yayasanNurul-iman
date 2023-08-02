import React, {ChangeEvent, useState, useEffect} from "react";
import { useRouter } from "next/router";
import supabase from "../src/config/supabaseClient";
import {Siswa} from "./siswa/noInduk"
import SiswaCard  from "./siswa/siswaCard"


const DataSiswa: React.FC = () => {
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [siswaData, setSiswaData] = useState<Siswa[] | null>(null);
  
    useEffect(() => {
      const fetchSiswaData = async () => {
        try {
          const { data, error } = await supabase
            .from<Siswa>('siswaYayasan')
            .select('no_indukDTA, nama_siswa, tanggal_lahir, tempat_lahir, nama_ayah, jenis_kelamin, id');
  
          if (error) {
            setFetchError('Gagal mengambil data siswa');
            setSiswaData(null);
          }
          if (data) {
            setSiswaData(data);
            setFetchError(null);
          }
        } catch (error) {
          console.error('Error fetching siswa data:', error);
          setFetchError('Gagal mengambil data siswa');
          setSiswaData(null);
        }
      };
  
      fetchSiswaData();
    }, []);
  
    return (
      <div className="page home">
        {fetchError && <p>{fetchError}</p>}
        {siswaData && (
          <div className="siswa">
            {/* Render komponen card untuk setiap data siswa */}
            <div className="siswa-grid">
              {siswaData.map((siswa) => (
                <SiswaCard key={siswa.no_indukDTA} siswa={siswa} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default DataSiswa;