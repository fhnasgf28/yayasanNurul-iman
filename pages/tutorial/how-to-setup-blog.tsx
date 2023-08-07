/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";


const BlogSetup = () => {
    return (
        <PageLayout blogwithsidebar>
            
        <section className="container bg-white rounded-lg shadow-lg p-8 mb-8">
            <header className="bg-blue-600 text-white py-4 px-8">
                    <h1 className="text-3xl font-bold">Masjid Nurul iman Menyelenggarakan Idul Adha dan Berqurban</h1>
            </header>
            <div className="container px-4 py-8 mx-auto max-w-2xl">
      <p className="text-gray-600">20 Juni 2023 - Karawang</p>

      <p className="my-6">
        Masjid Nurul Iman, sebuah masjid yang terletak di pusat kota, mengadakan acara perayaan Idul Adha pada hari Kamis, (tanggal), dengan menggelar ibadah salat Idul Adha dan acara berqurban.
      </p>

      <p className="my-4">
        Acara yang dihadiri oleh jamaah masjid dan warga sekitar ini dimulai pada pukul 07.00 pagi dengan pelaksanaan salat Idul Adha yang dipimpin oleh Imam Masjid Nurul Iman, Ustadz Ahmad Hasan. Jamaah yang hadir mengikuti protokol kesehatan yang ketat dengan menjaga jarak dan menggunakan masker demi mencegah penyebaran COVID-19.
      </p>

      <p className="my-4">
        Setelah pelaksanaan salat, dilanjutkan dengan acara berqurban, di mana dua ekor sapi dan lima ekor kambing dikurbankan sebagai wujud syukur atas berkah Allah SWT. Daging kurban akan didistribusikan kepada warga yang membutuhkan serta masyarakat sekitar yang memerlukan bantuan.
      </p>

      <p className="my-4">
        Acara ini juga dimeriahkan dengan berbagai kegiatan sosial seperti pemberian bantuan sembako kepada kaum dhuafa dan anak yatim. Selain itu, dewan pengurus masjid juga menyerahkan santunan kepada para guru ngaji dan pengajar TPA (Taman Pendidikan Al-Quran) yang berdedikasi dalam mengajarkan Al-Quran.
      </p>

      <p className="my-4">
        Ustadz Ahmad Hasan menyampaikan, "Kami berharap bahwa acara Idul Adha dan berqurban ini dapat membawa berkah bagi seluruh umat Muslim dan dapat meningkatkan semangat berbagi dengan sesama, terutama dalam situasi pandemi seperti saat ini."
      </p>

      <p className="my-4">
        Ketua Dewan Masjid Nurul Iman, Bapak Ahmad Ibrahim, juga menyampaikan apresiasi kepada semua jamaah dan warga yang telah ikut serta dalam kegiatan ini, serta para dermawan yang telah berqurban untuk kepentingan sosial dan kemanusiaan.
      </p>

      <p className="my-4">
        Acara ini merupakan momen bersejarah bagi Masjid Nurul Iman dan masyarakat setempat sebagai bentuk kepedulian dan solidaritas dalam menjalankan ajaran agama Islam. Semoga perayaan Idul Adha ini memberikan manfaat dan berkah bagi seluruh umat Muslim.
      </p>
    </div>
        </section>
        </PageLayout>
    )
}

export default BlogSetup