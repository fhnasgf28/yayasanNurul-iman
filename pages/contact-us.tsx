/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider  } from "../src/components";
import { iSEO } from "../src/shared/interfaces";

const ContactUs = () => {
    const PAGE_SEO: iSEO = {
        title: 'Contact Us',
        description: 'For any any queries related to this project / template feel free to connect with us on webexpe13@gmail.com',
        keywords: 'webexpx, contact us, webexpe13@gmail.com, next js blog template',
        author: 'Mayur Nalwala, Rupali Yadav'
    } 
    return (
        <PageLayout PAGE_SEO={PAGE_SEO} home>
            <section className='container px-3 pb-10 md:pt-20 pt-[80px]'>
                <Text title className="!text-5xl !font-light">
                    Contact Us
                </Text>

                <div className="flex flex-wrap mt-8 justify-between">
                    <div className="md:w-1/2 w-full md:pl-2">
                        <Text p className="!text-lg leading-relaxed">
                            For any any queries related to this project / template feel free to connect with us at the given email.
                            You can also post any comments on our <a href="https://github.com/webexpe13/blog-template-using-nextjs-typescript-tailwindcss/discussions" target="_blank" rel="noopener noreferrer"><u><i>github discussions</i></u></a>.
                        </Text>
                    </div>
                    <div className="md:w-1/3 w-full">
                        <Text p>
                            write to us at
                        </Text>
                        <Text subtitle className="!font-light md:!text-3xl">
                            webexpe13@gmail.com
                        </Text>
                    </div>
                </div>
            </section>


            <section className={"dark:bg-slate-800 bg-blue-100 mt-10 container py-10 md:px-20 px-5"}>
                <Text subtitle className="md:!text-5xl text-4xl !font-light">
                    Work with us . . .
                </Text>
                <Text p className="!text-lg leading-relaxed mt-5 px-1">
                    We are a group of developers and designers with more than 5 years of industry experience. If you have any requirements like Website Development, Website / App Design feel free to contact us on the given email.
                </Text>
            </section>

            {/* Contact Section Start */}
            <section id="contact" className="pt-36 pb-32 dark:bg-slate-800">
            <div className="container">
                <div className="w-full px-4">
                <div className="mx-auto mb-16 max-w-xl text-center">
                    <h4 className="mb-2 text-lg font-semibold text-primary">Contact</h4>
                    <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl lg:text-5xl">Hubungi Kami</h2>
                    <p className="text-md font-medium text-secondary md:text-lg">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, sed.</p>
                </div>
                </div>

                <form>
                <div className="w-full lg:mx-auto lg:w-2/3">
                    <div className="mb-8 w-full px-4">
                    <label htmlFor="name" className="text-base font-bold text-primary">Nama</label>
                    <input type="text" id="name" className="w-full rounded-md bg-slate-200 p-3 text-dark focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                    <div className="mb-8 w-full px-4">
                    <label htmlFor="email" className="text-base font-bold text-primary">Email</label>
                    <input type="email" id="email" className="w-full rounded-md bg-slate-200 p-3 text-dark focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                    <div className="mb-8 w-full px-4">
                    <label htmlFor="message" className="text-base font-bold text-primary">Pesan</label>
                    <textarea id="message" className="h-32 w-full rounded-md bg-slate-200 p-3 text-dark focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"></textarea>
                    </div>
                    <div className="w-full px-4">
                    <button className="w-full rounded-full bg-blue-600 py-3 px-8 text-base font-semibold text-white shadow-md transition duration-300 ease-in-out hover:opacity-80 focus:outline-none focus:ring focus:ring-blue-400">Kirim</button>
                    </div>
                </div>
                </form>
            </div>
        </section>
    {/* Contact Section End  */}
        </PageLayout>
    )
}

export default ContactUs