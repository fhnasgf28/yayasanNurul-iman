/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import CodeBlock from "../../src/components/CodeBlock";


const Article = () => {
    return (
        <PageLayout blogwithsidebar>
           
            <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-semibold mb-4">Yayasan Nurul Iman Perum Taman Singaperbangsa Karawang Adakan Acara Santunan Anak Yatim 10 Muharram</h2>
            <p className="text-gray-600 mb-4">Karawang, 10 Muharram 1445 - Yayasan Nurul Iman Perum Taman Singaperbangsa Karawang menggelar acara santunan anak yatim dalam rangka menyambut peringatan 10 Muharram. Acara berlangsung meriah dan dihadiri oleh ratusan anak yatim dari berbagai daerah sekitar.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="col-span-1 ">
                <Image src="/images/10Muharrom/1Muharram.jpg" alt= " PawaiObor" className="w-full h-auto rounded-lg"/>
                </div>
                <div className="col-span-1">
                <p className="text-gray-600 mb-4">
                Acara yang diadakan setiap tahun pada 10 Muharram ini merupakan bagian dari kegiatan sosial yang rutin dilaksanakan oleh Yayasan Nurul Iman. Tujuan dari acara ini adalah untuk memberikan kebahagiaan dan keceriaan bagi anak-anak yatim di momen yang bersejarah ini.
                </p>
                <p className="text-gray-600 mb-4">
                Dalam acara santunan kali ini, seluruh anak yatim yang hadir menerima bingkisan berisi paket sembako, perlengkapan sekolah, dan pakaian baru. Selain itu, mereka juga menikmati hidangan lezat.
                </p>
                </div>
            </div>

            <p className="text-gray-600 mb-4">
                "Berkumpul dengan anak-anak yatim pada momen spesial 10 Muharram ini adalah kebahagiaan bagi kami semua di Yayasan Nurul Iman. Kami berharap melalui acara santunan ini, kami dapat menyebarkan senyuman dan memberikan semangat baru bagi mereka," ujar Bapak Hji Juhro, Ketua Yayasan Nurul Iman.
            </p>

            <p className="text-gray-600 mb-4">
                Acara santunan anak yatim ini tidak hanya memberikan manfaat bagi para penerima santunan, tetapi juga menjadi momen penting untuk mempererat tali silaturahmi antara Yayasan Nurul Iman dan masyarakat sekitar. Banyak warga masyarakat yang turut berpartisipasi dalam menyumbangkan dana dan bantuan untuk mendukung keberlangsungan acara ini.
            </p>

            <p className="text-gray-600 mb-4">
                Semoga acara santunan anak yatim di Yayasan Nurul Iman Perum Taman Singaperbangsa Karawang ini dapat memberikan berkah dan kebahagiaan bagi semua pihak yang terlibat. Mari kita terus berbuat kebaikan dan peduli terhadap sesama, terutama bagi mereka yang membutuhkan.
            </p>
            <p className="text-gray-600">#SantunanAnakYatim #YayasanNurulIman #Karawang #10Muharram</p>
            </section>

            <div className="mt-6 border-t border-gray-300 pt-6">
                <h3 className="text-xl font-semibold mb-4">Tentang Yayasan Nurul Iman:</h3>
                <p className="text-gray-600 mb-4">
                    Yayasan Nurul Iman adalah lembaga nirlaba yang berdedikasi untuk memberikan bantuan dan dukungan kepada anak yatim serta masyarakat kurang mampu. Yayasan ini telah berdiri sejak tahun xxxx dan secara konsisten berkomitmen untuk berkontribusi dalam memajukan kesejahteraan sosial di wilayah Karawang.
                </p>
                    <h3 className="text-xl font-semibold mb-2">Kontak Media:</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-gray-600">
                    <p className="mb-1">Nama:</p>
                    <p className="mb-1">Jabatan:</p>
                    <p className="mb-1">Telepon:</p>
                    <p className="mb-1">Email:</p>
                    <p className="mb-1">Alamat:</p>
                    </div>
                    <div className="text-gray-600">
                    <p className="mb-1">Bapak Ahmad</p>
                    <p className="mb-1">Ketua Yayasan Nurul Iman</p>
                    <p className="mb-1">(022) 438734566</p>
                    <p className="mb-1">info@yayasan-nuruliman.org</p>
                    <p className="mb-1">Perum Taman Singaperbangsa, Karawang</p>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default Article