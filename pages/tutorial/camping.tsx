/**These are necessary imports / components for the page */
import { PageLayout, Text, LinkTo, Seperator, Image } from "../../src/components";
import CodeBlock from "../../src/components/CodeBlock";
import { iSEO } from "../../src/shared/interfaces";
import { AiFillYoutube, AiFillTwitterCircle } from "react-icons/ai";
import { BiAbacus, BiAdjust } from "react-icons/bi";




const Icons = () => {
    const PAGE_SEO: iSEO = {
        title: 'Icons',
        keywords: 'webexpx, contact us, webexpe13@gmail.com, next js blog template',
        author: 'Mayur Nalwala, Rupali Yadav'
    }
    return (
           <PageLayout PAGE_SEO={PAGE_SEO} blogwithsidebar>
        <section className="container bg-white rounded-lg shadow-lg p-8 mb-8">
            <title>Camping Kebangsaan: Membangun Semangat Nasionalisme di Perumahan Singaperbangsa Rt 24</title>

        <p className="text-gray-600 mb-6">*(16 Agustus 2023)*</p>

        <Text>
        <p className="mb-4">(Karawang) Suasana peringatan Hari Kemerdekaan masih membara, dan pada tanggal 16 Agustus, semangat kebangsaan semakin terasa dalam Camping Kebangsaan yang diadakan dengan semarak. Acara ini menghadirkan lebih dari sekadar hiburan, namun juga tujuan yang lebih dalam, yaitu memupuk rasa cinta tanah air dan semangat nasionalisme pada generasi muda.</p>
        
        
        <p className="mb-4">Dengan antusias yang menggebu-gebu, 30 anak-anak dari berbagai usia berkumpul untuk mengikuti Camping Kebangsaan yang dihelat di lingkungan yang penuh keakraban, Perumahan Singaperbangsa Rt 24. Lokasi ini dipilih dengan hati-hati karena mengusung nilai-nilai persatuan dan gotong royong yang menjadi pilar bangsa.</p>

        <p className="mb-4">Dengan antusias yang menggebu-gebu, 30 anak-anak dari berbagai usia berkumpul untuk mengikuti Camping Kebangsaan yang dihelat di lingkungan yang penuh keakraban, Perumahan Singaperbangsa Rt 24. Lokasi ini dipilih dengan hati-hati karena mengusung nilai-nilai persatuan dan gotong royong yang menjadi pilar bangsa.</p>

        <p className="mb-4">Setelah acara pembukaan yang dipenuhi dengan semangat menyanyikan lagu kebangsaan, anak-anak langsung diajak untuk berpartisipasi dalam berbagai kegiatan. Lomba-lomba tradisional seperti balap karung, tarik tambang, dan makan kerupuk menjadi sarana untuk belajar tentang kerja sama dan kebersamaan, nilai-nilai yang penting dalam membangun bangsa.</p>

        <p className="mb-4">Selain kegiatan fisik, materi edukatif juga menjadi bagian integral dari Camping Kebangsaan. Anak-anak mendapat kesempatan untuk mendengarkan cerita tentang perjuangan pahlawan dan momen penting dalam sejarah kemerdekaan Indonesia. Diskusi pun diadakan, memungkinkan mereka untuk bertanya dan menggali pemahaman lebih dalam tentang arti penting kemerdekaan.</p>

        <p className="mb-4">Puncak acara diadakan pada malam hari dengan panggung hiburan yang menampilkan grup musik lokal dan pertunjukan lampu-lampu warna-warni yang memukau. Warga berkumpul di area lapangan yang dihias indah dengan bendera merah-putih dan atribut perayaan kemerdekaan.</p>

        <p className="mb-4">Pak Haji Ismayanto, tokoh masyarakat setempat yang juga inisiator acara, menyampaikan harapannya, "Melalui Camping Kebangsaan ini, kami ingin menanamkan rasa cinta tanah air dan semangat nasionalisme pada anak-anak. Mereka adalah penerus bangsa, dan kami berharap mereka dapat menjaga dan memajukan Indonesia di masa depan."</p>

        <p className="mb-4">Puncak acara Camping Kebangsaan adalah malam api unggun yang diisi dengan nyanyian lagu kebangsaan dan doa bersama. Di bawah langit malam yang cerah, semangat kebersamaan dan persatuan semakin terasa, mengokohkan tekad untuk mewujudkan bangsa yang lebih baik.</p>

        <p className="mb-4"> Melalui Camping Kebangsaan ini, 30 anak yang hadir telah merasakan momen tak terlupakan yang tidak hanya menghibur tetapi juga mendidik. Diharapkan, semangat nasionalisme yang mereka bawa pulang akan membantu membentuk karakter mereka sebagai individu yang berkomitmen pada perjuangan dan kemajuan bangsa.
	</p>
        </Text>
            </section>
        </PageLayout>
    )
}

export default Icons;