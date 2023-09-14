import React from 'react';
import StrukturYayasan from './strukturYayasan';


const Anggota: React.FC = () => {
    const members = [
        { name: 'Endang Samsul Bachri, SH', photoSrc: '/images/anggota/',jabatan:'Ketua' },
        { name: 'Drs. Endang Faturohman, M.Pd', photoSrc: '/images/anggota/',jabatan:' Wakil Ketua' },
        { name: 'Perdina Triani', photoSrc: '/images/anggota/PakAte.jpeg',jabatan:'Sekretaris' },
        { name: 'Gunawan', photoSrc: '/images/anggota/',jabatan:'Bendahara' },
        { name: 'H. Ismayanto, SE', photoSrc: '/images/anggota/',jabatan:'Ketua Bidang Imaroh' },
        { name: 'ustad Herman, ST', photoSrc: '/images/anggota/herman.jpeg',jabatan:'Seksi Peribadatan' },
        { name: 'Ustad Burhanudin', photoSrc: '/images/anggota/',jabatan:'Seksi Pendidikan' },
        { name: 'Slamet Raharjo', photoSrc: '/images/anggota/slamet.jpg',jabatan:'Seksi PHBI' },
        { name: 'Ustad, Nizam, SE', photoSrc: '/images/anggota/nizam.jpeg',jabatan:'Seksi ZIS dan Dakwah' },
        { name: 'Muhammad Khairil Akbar', photoSrc: '/images/anggota/aril.jpeg',jabatan:'Seksi Remaja' },
        { name: 'Drs. Slamet Mulyana', photoSrc: '/images/anggota/',jabatan:'Ketua Bidang Idaroh' },
        { name: 'Dedi Rohendi, S.Sos', photoSrc: '/images/anggota/',jabatan:'Seksi Perencanaan' },
        { name: 'M. Miftah', photoSrc: '/images/anggota/',jabatan:'Seksi Administrasi' },
        { name: 'Farhan', photoSrc: '/images/anggota/farhan.jpg',jabatan:'Seksi Dokumentasi' },
        { name: 'H. Mulyono', photoSrc: '/images/anggota/mulyono.jpeg',jabatan:'Ketua Bidang Riayah' },
        { name: 'Anton', photoSrc: '/images/anggota/anton.jpeg',jabatan:'Seksi Pemeliharaan Bangunan' },
        { name: 'Yayan Kustian', photoSrc: '/images/anggota/yayan.jpeg',jabatan:'Seksi Peralatan & Perlengkapan' },
        { name: 'Uus', photoSrc: '/images/anggota/farhan.jpg',jabatan:'Seksi Lingkungan & Taman' },
        { name: 'H. Rohmani', photoSrc: '/images/anggota/rohmani.jpg',jabatan:'Seksi Keamanan' },
        
    ]
return (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {members.map((member, index) => (
              <StrukturYayasan key={index} name={member.name} photoSrc={member.photoSrc} jabatan={member.jabatan} />
            ))}
          </div>
       
        )
}

export default Anggota;