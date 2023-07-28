/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../src/components";
import { CURRENT_YEAR } from "../src/constants/appConstants";
import { iSEO } from "../src/shared/interfaces";

const AboutUs = () => {
    const PAGE_SEO: iSEO = {
        title: 'About Us',
        description: `Hi we are WebExpe. This is an open source blog template which can help you start a simple static blog.`,
        keywords: 'webexpx, contact us, webexpe13@gmail.com, next js blog template',
        author: 'Mayur Nalwala, Rupali Yadav'
    }
    return (
        <PageLayout PAGE_SEO={PAGE_SEO} home>
            <section id="home" className="pt-36 dark:bg-dark">
            <div className="container">
                <div className="flex flex-wrap">
                <div className="w-full self-center px-4 lg:w-1/2">
                    <h1 className="text-base font-semibold text-primary md:text-xl">Sejarah<span className="mt-1 block text-4xl font-bold text-dark dark:text-white lg:text-5xl">Yayasan Nurul Iman</span></h1>
                    <p className="mb-10 font-medium leading-relaxed text-secondary">Belajar web programming itu mudah dan menyenangkan bukan. <span className="font-bold text-dark dark:text-white">bukan!</span></p>

                    <a href="#" className="rounded-full bg-primary py-3 px-8 text-base font-semibold text-white transition duration-300 ease-in-out hover:opacity-80 hover:shadow-lg">Hubungi Saya</a>
                </div>
                <div className="w-full self-end px-4 lg:w-1/2">
                    <div className="relative mt-10 lg:right-0 lg:mt-9">
                    <img src="/images/masjid.jpg" alt="masjid nurul iman" className="rounded-lg shadow-lg z-10 mx-auto max-w-full hover:animate-pulse" />
                    </div>
                </div>
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

        <section className='container px-3 md:pb-20 md:pt-10 pt-20'>

           {/* Gambar */}
           <img src="/images/yayasanContoh.jpg" alt="Yayasan Nurul Iman" className="w-full md:w-2/3 lg:w-1/2 mx-auto rounded-lg shadow-md" />
          
          {/* Judul */}
          <Text title className='mt-10 dark:text-sky-400 text-sky-600' >
          Visi dan Misi Yayasan Nurul Iman
          </Text>
           {/* Visi dan Misi */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <Text subtitle className='text-3xl font-medium'>
                  Visi
                </Text>
                <Text p className='text-lg'>
                  Menjadi lembaga pendidikan dan sosial yang unggul, berdaya saing, serta berlandaskan keimanan dan ketaqwaan kepada Allah SWT.
                </Text>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <Text subtitle className='text-3xl font-medium'>
                  Misi
                </Text>
                <List type={ListType.disc}>
                  <li>Mengembangkan karakter dan akhlakul karimah siswa-siswi yang berlandaskan nilai-nilai Islami.</li>
                  <li>Mendorong peningkatan prestasi akademik dan non-akademik melalui program pembelajaran yang inovatif dan berbasis teknologi.</li>
                  <li>Menyediakan lingkungan belajar yang aman, nyaman, dan mendukung perkembangan potensi siswa-siswi secara holistik.</li>
                  {/* ... tambahkan misi lainnya ... */}
                </List>
              </div>
            </div>
          </div>    
        </section>
            
        {/* Blog Section Start  */}
    <section id="blog" className="bg-slate-100 pt-36 pb-32 dark:bg-dark">
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
            <div className="mb-10 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800">
              <img src="https://source.unsplash.com/360x200?programming" alt="Programming" className="w-full" />
              <div className="py-8 px-6">
                <h3>
                  <a href="#" className="mb-3 block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white">Tips Belajar Programming</a>
                </h3>
                <p className="mb-6 text-base font-medium text-secondary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat officia beatae quisquam?</p>
                <a href="#" className="rounded-lg bg-primary py-2 px-4 text-sm font-medium text-white hover:opacity-80">Baca Selengkapnya</a>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-1/3">
            <div className="mb-10 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800">
              <img src="https://source.unsplash.com/360x200?mechanical+keyboard" alt="Mechanical Keyboard" className="w-full" />
              <div className="py-8 px-6">
                <h3>
                  <a href="#" className="mb-3 block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white">Review Keyboard GMMK Pro</a>
                </h3>
                <p className="mb-6 text-base font-medium text-secondary">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi facilis illum in.</p>
                <a href="#" className="rounded-lg bg-primary py-2 px-4 text-sm font-medium text-white hover:opacity-80">Baca Selengkapnya</a>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-1/3">
            <div className="mb-10 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800">
              <img src="https://source.unsplash.com/360x200?coffee" alt="Coffee" className="w-full" />
              <div className="py-8 px-6">
                <h3>
                  <a href="#" className="mb-3 block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white">Menikmati Secangkir Kopi</a>
                </h3>
                <p className="mb-6 text-base font-medium text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, totam ipsum ea quam sequi velit sunt.</p>
                <a href="#" className="rounded-lg bg-primary py-2 px-4 text-sm font-medium text-white hover:opacity-80">Baca Selengkapnya</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Blog Section End */}
    
    
    
        </PageLayout>
    )
}

export default AboutUs