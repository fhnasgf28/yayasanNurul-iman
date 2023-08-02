/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import CodeBlock from "../../src/components/CodeBlock";
import { HowToUseImageCode, HowToUseList, HowToUseSeperator, HowToUseTextCode } from "../../src/constants/codeBlocks";
import LazyImage from "../../src/components/LazyImage/LazyImage";

const Article = () => {
    return (
        // pass blogcentered as show below for article page centered layout
    <PageLayout blogwithsidebar>
        <header className="bg-blue-600 text-white py-4 px-8">
        <h1 className="text-3xl font-bold">Berita: Pawai Obor Yayasan Nurul Iman</h1>
      </header>

      <main className="container mx-auto py-8 px-4">

        <section>
          <LazyImage className="mb-8 w-full rounded-lg shadow-lg" src="/images/1Muharram.jpeg" alt="1 Muharram 1445 " />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Yayasan Nurul Iman dan Warga Perum Taman Singaperbangsa Karwang Meriahkan Tahun Baru Islam dengan Pawai Obor</h2>
          <p className="text-gray-600 mt-2">Tanggal 1 Muharram, Karawang - Yayasan Nurul Iman bekerjasama dengan warga Perum Taman Singaperbangsa Karawang menyelenggarakan pawai obor dalam rangka menyambut tahun baru Islam. Acara ini diikuti oleh ratusan warga dari berbagai usia yang antusias mengikuti pawai obor tersebut.</p>
          {/* Tambahkan konten berita lainnya */}

        <Text p className="text-gray-600 mt-2">
        Pawai obor dimulai dari halaman Yayasan Nurul Iman dan berjalan menyusuri jalan-jalan
        di Perum Taman Singaperbangsa Karwang. Para peserta membawa obor yang dinyalakan dengan semangat untuk menyambut
        datangnya tahun baru Islam.

        Acara pawai obor ini bertujuan untuk mempererat tali silaturahmi antara Yayasan Nurul
        Iman dengan warga Perum Taman Singaperbangsa Karwang, serta menyemarakkan perayaan tahun baru Islam. Selain itu,
        acara ini juga sebagai bentuk kegiatan sosial dan budaya yang positif bagi masyarakat.

        Tidak hanya itu, pawai obor juga diisi dengan berbagai penampilan seni dan budaya,
        seperti tarian tradisional dan musik dari anak-anak muda di lingkungan tersebut. Semua peserta pawai terlihat
        senang dan bahagia dalam suasana yang penuh keceriaan dan kegembiraan.
        </Text>
        </section>

        {/* Tambahkan bagian galeri foto */}

      </main>

    </PageLayout>
    )
}

export default Article;