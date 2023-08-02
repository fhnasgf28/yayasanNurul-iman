import { Siswa } from './noInduk'; // Sesuaikan path dengan lokasi tipe data Siswa

interface SiswaCardProps {
  siswa: Siswa;
}

const SiswaCard: React.FC<SiswaCardProps> = ({ siswa }) => {
  const { no_indukDTA, nama_siswa, tanggal_lahir, tempat_lahir, nama_ayah, jenis_kelamin, id } = siswa;

  return (
    <div className="siswa-card bg-white shadow-lg rounded-lg p-4">
        <h2 className="nama-siswa text-2xl font-bold mb-4">{nama_siswa}</h2>
        <p className="no-induk text-sm">No. Induk: {no_indukDTA}</p>
        <p className="tanggal-lahir text-sm">Tanggal Lahir: {tanggal_lahir}</p>
        <p className="tempat-lahir text-sm">Tempat Lahir: {tempat_lahir}</p>
        <p className="nama-ayah text-sm">Nama Ayah: {nama_ayah}</p>
        <p className="jenis-kelamin text-sm">Jenis Kelamin: {jenis_kelamin}</p>
        <p className="id text-sm">ID: {id}</p>
    </div>

  );
};

export default SiswaCard;