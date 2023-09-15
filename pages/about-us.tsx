/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../src/components";
import { CURRENT_YEAR } from "../src/constants/appConstants";
import { iSEO } from "../src/shared/interfaces";
import Anggota from "../src/components/newsConten/anggota";
import Sejarah from "../src/components/VisiMisi/sejarah";
import VisiMisi from "../src/components/VisiMisi/visiMisi";

const AboutUs = () => {
    const PAGE_SEO: iSEO = {
        title: 'Tentang Yayasan Nurul Iman',
        description: `Hi we are WebExpe. This is an open source blog template which can help you start a simple static blog.`,
        keywords: 'webexpx, contact us, webexpe13@gmail.com, next js blog template',
        author: 'Mayur Nalwala, Rupali Yadav'
    }

    
    return (
        <PageLayout PAGE_SEO={PAGE_SEO} home>
            <section id="home" className="pt-36 dark:bg-dark container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Struktur Organisasi Yayasan</h1>
            <Image src="/images/yayasan/struktur.svg" alt="Yayasan Nurul Iman"/>

          <div className="w-full px-4">
          <div className="mx-auto mb-4 max-w-xl text-center">
            <h5 className="mb-2 text-3xl font-bold text-dark dark:text-white sm:text-4xl lg:text-5xl">Profil Anggota</h5>
          </div>
          </div>
          <Anggota/>
          <VisiMisi></VisiMisi>
        <h1 className="text-3xl font-bold mb-4">Yayasan Nurul Iman</h1>
        <p className="text-gray-700 mb-8">Perum Taman Singaperbangsa Karawang</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
        <Sejarah></Sejarah>
      <div className="bg-white p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Program</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Penyediaan beasiswa pendidikan untuk siswa berprestasi namun kurang mampu, sehingga mereka dapat melanjutkan pendidikan ke jenjang yang lebih tinggi.</li>
          <li>Pengadaan buku dan alat belajar bagi sekolah-sekolah di wilayah tersebut untuk meningkatkan fasilitas pembelajaran.</li>
          <li>Mengadakan berbagai pelatihan dan workshop untuk masyarakat, seperti pelatihan keterampilan, pengembangan usaha kecil, dan pemahaman teknologi informasi.</li>
          <li>Menyelenggarakan kegiatan sosial, seperti pembagian sembako kepada keluarga prasejahtera, bantuan untuk korban bencana, dan kegiatan santunan anak yatim.</li>
          <li>Ikut berperan dalam kegiatan pelestarian lingkungan, seperti kampanye penghijauan, pembersihan lingkungan, dan program daur ulang.</li>
        </ul>
      </div>
    </div>
            </section>

            {/* section Baru */}
            <section id="about" className="pt-36 pb-32 dark:bg-dark">
            <div className="container">
            <div className="flex flex-wrap">
                <div className="mb-10 w-full px-4 lg:w-1/2">
                <h4 className="mb-3 text-lg font-bold uppercase text-primary">Tentang Saya</h4>
                <h2 className="mb-5 max-w-md text-3xl font-bold text-dark dark:text-white lg:text-4xl">Yuk, belajar web programming di WPU!</h2>
                <p className="max-w-xl text-base font-medium text-secondary lg:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id temporibus maiores sequi vitae saepe iusto deleniti!</p>
                </div>
                <div className="w-full px-4 lg:w-1/2">
                <h3 className="mb-4 text-2xl font-semibold text-dark dark:text-white lg:pt-10 lg:text-3xl">Mari berteman</h3>
                <p className="mb-6 text-base font-medium text-secondary lg:text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quos, hic animi quasi ipsum exercitationem ipsam incidunt voluptatem.
                </p>
                </div>
            </div>
            </div>
        </section>

      
            
        {/* Blog Section Start  */}
    {/* <section id="blog" className="bg-slate-100 pt-36 pb-32 dark:bg-dark">
      <div className="container">
        <div className="w-full px-4">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <h4 className="mb-2 text-lg font-semibold text-primary">Blog</h4>
            <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl lg:text-5xl">Tulisan Terkini</h2>
            <p className="text-md font-medium text-secondary md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quisquam perspiciatis blanditiis dolores?</p>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2 xl:w-1/3">
            <div className="mb-10 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800 transform transition-transform hover:-translate-y-1 hover:shadow-xl">
              <img src="https://source.unsplash.com/360x200?programming" alt="Programming" className="w-full" />
              <div className="py-8 px-6">
                <h3>
                  <a href="#" className="mb-3 block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white">Tips Belajar Programming</a>
                </h3>
                <p className="mb-6 text-base font-medium text-secondary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat officia beatae quisquam?</p>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-1/3">
            <div className="mb-10 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800 transform transition-transform hover:-translate-y-1 hover:shadow-xl">
              <img src="https://source.unsplash.com/360x200?mechanical+keyboard" alt="Mechanical Keyboard" className="w-full" />
              <div className="py-8 px-6">
                <h3>
                  <a href="#" className="mb-3 block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white">Review Keyboard GMMK Pro</a>
                </h3>
                <p className="mb-6 text-base font-medium text-secondary">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi facilis illum in.</p>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-1/3">
            <div className="mb-10 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800 transform transition-transform hover:-translate-y-1 hover:shadow-xl">
              <img src="https://source.unsplash.com/360x200?coffee" alt="Coffee" className="w-full" />
              <div className="py-8 px-6">
                <h3>
                  <a href="#" className="mb-3 block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white">Menikmati Secangkir Kopi</a>
                </h3>
                <p className="mb-6 text-base font-medium text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, totam ipsum ea quam sequi velit sunt.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> */}
    {/* Blog Section End */}

    
        </PageLayout>
    )
}

export default AboutUs