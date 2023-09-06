import { WEBSITE_NAME } from "../../../BLOG_CONSTANTS/_BLOG_SETUP"
import {Text } from "../index";
import LinkTo from "../LinkTo"
import GoogleMap from "../newsConten/googleMaps";

const Footer = () => {
    const year = new Date().getFullYear()
    return (
 
        <footer>
          <GoogleMap/>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
  
          {/* Top area: Blocks */}
          <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">
  
            {/* 1st block */}
            <div className="sm:col-span-12 lg:col-span-3">
              <div className="mb-2">
              </div>
              <div className="text-sm text-gray-600">
              <LinkTo href="/privacy-policy" passHref={true} className="pr-[10px] md:pr-3">
                    Kebijakan Privasi
                </LinkTo>
                <LinkTo href="/terms-and-condition" passHref={true}>
                    Syarat & Ketentuan
                </LinkTo>
              </div>
            </div>
  
            {/* 2nd block */}
            <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
              <h6 className="text-gray-800 font-medium mb-2">Alamat</h6>
              <Text p className="text-sm">
                Perum Taman Singaperbangsa Karawang, Telukjambe Timur
              </Text>
            </div>
            {/* 3th block */}
            <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
              <h6 className="text-gray-800 font-medium mb-2">Langganan</h6>
              <p className="text-sm text-gray-600 mb-4">Masukan email Anda untuk menerima berita terbaru dari kami. </p>
              <form>
                <div className="flex flex-wrap mb-4">
                  <div className="w-full">
                    <label className="block text-sm sr-only" htmlFor="newsletter">Email Anda</label>
                    <div className="relative flex items-center max-w-xs">
                      <input id="newsletter" type="email" className="form-input w-full text-gray-800 px-3 py-2 pr-12 text-sm" placeholder="Your email" required />
                      <button type="submit" className="absolute inset-0 left-auto" aria-label="Subscribe">
                        <span className="absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300" aria-hidden="true"></span>
                        <svg className="w-3 h-3 fill-current text-blue-600 mx-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                        </svg>
                      </button>
                    </div>
                    {/* Success message */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className=" w-full md:flex md:items-center md:justify-center py-4 md:py-8 border-t border-gray-200 bg-gradient-to-r from-blue-500 to-pink-500 text-white" style={{maxHeight:'50px'}}>
            Yayasan Nurul Iman © {year}
          </div>
      </footer>

    )
}

export default Footer