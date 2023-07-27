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
                    <h1 className="text-base font-semibold text-primary md:text-xl">Halo Semua 👋, saya <span className="mt-1 block text-4xl font-bold text-dark dark:text-white lg:text-5xl">Sandhika Galih</span></h1>
                    <h2 className="mb-5 text-lg font-medium text-secondary lg:text-2xl">Lecturer &amp; <span className="text-dark dark:text-white">Content Creator</span></h2>
                    <p className="mb-10 font-medium leading-relaxed text-secondary">Belajar web programming itu mudah dan menyenangkan bukan. <span className="font-bold text-dark dark:text-white">bukan!</span></p>

                    <a href="#" className="rounded-full bg-primary py-3 px-8 text-base font-semibold text-white transition duration-300 ease-in-out hover:opacity-80 hover:shadow-lg">Hubungi Saya</a>
                </div>
                <div className="w-full self-end px-4 lg:w-1/2">
                    <div className="relative mt-10 lg:right-0 lg:mt-9">
                    <img src="#" alt="Sandhika Galih" className="relative z-10 mx-auto max-w-full" />
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 md:scale-125">
                        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="#14b8a6"
                            d="M47.4,-51C59.2,-35.6,65.1,-17.8,63.4,-1.7C61.7,14.5,52.6,28.9,40.8,36.6C28.9,44.2,14.5,45,-2,47C-18.4,49,-36.8,52.1,-45.4,44.5C-53.9,36.8,-52.5,18.4,-51.2,1.3C-49.9,-15.8,-48.7,-31.7,-40.2,-47.1C-31.7,-62.4,-15.8,-77.3,1,-78.3C17.8,-79.2,35.6,-66.3,47.4,-51Z"
                            transform="translate(100 100) scale(1.1)"
                        />
                        </svg>
                    </span>
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