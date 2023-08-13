/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import CodeBlock from "../../src/components/CodeBlock";


const Article = () => {
    return (
        // pass blogwithsidebar as show below for article page with sidebar layout
        <PageLayout blogwithsidebar >
            <section className=" containe bg-white rounded-lg shadow-lg p-8 mb-8">
                <header className="bg-blue-600 text-white py-4 px-8">
                        <h1 className="text-3xl font-bold">Masjid Nurul Iman Gelar Pengajian Ba'da Shubuh: Tafsir Surat Al-Fatihah Menyapa Pagi Umat</h1>
                </header>
                <Seperator/>

            <Text>
            Karawang - Di tengah suasana subuh yang tenang, Masjid Nurul Iman menggelar pengajian ba'da shubuh yang kali ini mengambil tema tafsir Surat Al-Fatihah. Kegiatan yang dihadiri oleh jamaah masjid dan warga sekitar ini bertujuan untuk mendalami makna mendalam dari surat pembuka Al-Quran.

            Pengajian ba'da shubuh diawali dengan pelaksanaan salat Shubuh berjamaah di dalam masjid. Setelah salat, para jamaah berkumpul di aula untuk mengikuti pengajian yang dipimpin oleh Ustadz Hidayat, seorang ulama yang memiliki pemahaman mendalam tentang Al-Quran.

            Dalam pengajiannya, Ustadz Hidayat membahas tafsir Surat Al-Fatihah secara detail. Ia mengupas makna kata demi kata dalam surat tersebut dan menjelaskan signifikansinya dalam kehidupan sehari-hari. Ustadz Hidayat juga mengaitkan pesan-pesan dalam Al-Fatihah dengan konteks zaman modern, sehingga memudahkan para jamaah dalam memahaminya.

            "Surat Al-Fatihah adalah surat pembuka dalam Al-Quran yang penuh dengan hikmah dan petunjuk. Melalui pengajian ini, kita berusaha untuk mendalami makna mendalam dari setiap ayatnya dan mengaplikasikannya dalam kehidupan kita," ujar Ustadz Hidayat dalam pengajarannya.

            Acara pengajian juga dimeriahkan dengan sesi tanya jawab, di mana para jamaah memiliki kesempatan untuk bertanya langsung kepada Ustadz Hidayat mengenai pemahaman tafsir Surat Al-Fatihah. Diskusi yang berlangsung penuh kehangatan ini membuat suasana semakin interaktif dan bermanfaat.

            Ketua Pengurus Masjid Nurul Iman, Bapak Ahmad Ibrahim, menyampaikan apresiasi kepada semua jamaah yang telah berpartisipasi dalam pengajian tersebut. "Kami berharap melalui kegiatan pengajian seperti ini, pengetahuan dan pemahaman kita terhadap Al-Quran semakin bertambah, serta mampu menginspirasi perubahan positif dalam diri kita," kata beliau.

            Pengajian ba'da shubuh dengan tema tafsir Surat Al-Fatihah ini merupakan salah satu upaya Masjid Nurul Iman dalam memberikan edukasi keagamaan yang bermakna bagi jamaahnya. Semoga semangat memahami dan mengamalkan ajaran Al-Quran terus tumbuh dan berkembang di kalangan umat.
            </Text>
            </section>
        </PageLayout>
    )
}

export default Article;