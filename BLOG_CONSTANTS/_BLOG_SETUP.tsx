import { LogoType, NavbarType } from "../src/shared/enums";
import { IAuthor, iNavSetup, iSEO } from "../src/shared/interfaces";
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin, AiFillInstagram, AiFillFacebook } from "react-icons/ai";

/**
 * EXAMPLE AUTHOR
 * 
 export const AUTHOR_NAME: IAuthor = {
    name: "Full Name",
    designation: "Work Designation",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    profilePic: "",
     social: [
        {
            icon: <AiFillGithub />,
            link: 'https://github.com/'
        },
        {
            icon: <AiFillLinkedin />,
            link: 'https://www.linkedin.com/'
        },
    ]
}
 */

export const MAYUR: IAuthor = {
    name: "Farhan Assegaf",
    designation: "Mahasiswa dan Pengembang Web",
    bio: "Sebagai mahasiswa di bidang teknik informatika, saya berusaha untuk terus menggabungkan teori dengan praktek untuk meningkatkan keterampilan saya sebagai pengembang web. Saya senang bekerja dalam tim dan mengejar proyek-proyek yang menantang untuk mengasah kemampuan saya.",
    profilePic: "",
    social: [
        {
            icon: <AiFillGithub />,
            link: '#'
        },
        {
            icon: <AiFillLinkedin />,
            link: '#'
        },
    ]
}

export const RUPALI: IAuthor = {
    name: "Farhan Assegaf",
    designation: "Mahasiswa dan Pengembang Web",
    bio: "Saya percaya bahwa kemajuan teknologi dapat membawa perubahan positif dalam kehidupan kita dan saya berharap dapat berkontribusi pada inovasi dan perkembangan teknologi di masa depan.",
    profilePic: "",
    social: [
        {
            icon: <AiFillGithub />,
            link: '#'
        },
        {
            icon: <AiFillLinkedin />,
            link: '#'
        },
    ]
}


// This can your company name / your name etc for SEO purposes
export const WEBSITE_NAME: string = 'Yayasan Nurul Iman Perum Singaperbangsa';
export const WEBSITE_URL: string = '#';

/**
 * This is the main navigation setup.
 * This includes the main navbar and the side drawer.
 */
export const PRIMARY_NAV: iNavSetup = {
    type: NavbarType.DEFAULT,
    // max logo image height 40px
    // you can add logo light version if using image
    // logo: {
    //     type: LogoType.IMAGE,
    //     logo: '/images/logo.png',
    //     logoLight: '/images/logo-light.png'
    // },
    logo: {
        type: LogoType.TEXT,
        logo: 'Yayasan Nurul Iman',
    },
    // navLinks are the main navbar links that apper on top of every page
    navLinks: [
        {
            label: 'Beranda',
            path: '/'
        },
        {
            // for categories don't add path and add type: dropdown and pass path empty
            label: 'Berita',
            type: 'dropdown',
            path: ''
        },
        {
            label: 'Tentang Yayasan',
            path: '/about-us'
        },
        {
            // to open a link in new tab pass newTab: true
            label: 'Dukung Kami',
            path: '#',
            newTab: true
        },
        {
            label: 'Donasi Pembangunan',
            path: '/donationPage',
            newTab: true
        },
        {
            label: 'Hubungi Kami',
            path: '/contact-us'
        },
        {
            label: 'Login',
            path: '/login'
        }
    ],
    // sideNavLinks are the links which appear when you open the side menu after clicking the burger menu icon.
    sideNavLinks: [
        {
            label: 'Login',
            path: ''
        },
        {
            label: 'Beranda',
            path: '/'
        },
        {
            // for categories dont add path and add type: dropdown
            label: 'Berita',
            type: 'dropdown',
            path: ''
        },
        {
            label: 'Tentang Yayasan',
            path: '/about-us'
        },
        {
            label: 'Dukung Kami',
            path: '#',
            newTab: true
        },
        {
            label: 'Donasi Pembangunan',
            path: '#',
            newTab: true
        },
        {
            label: 'Hubungi Kami',
            path: '/contact-us'
        }
    ],
    socials: []
}

export const DEFAULT_SEO: iSEO = {
    title: "Yayasan Nurul Iman Perum singaperbangsa Karawang",
    description: "Penerapan Algoritma Sequential Search pada website yayasan nurul iman perum taman singaperbangsa Karawang",
    keywords: "perum singaperbangsa karawang, masjid, nurul iman karawang, perum singaperbangsa, siper, unsika, yayasan nurul iman, nurul iman,",
    url: WEBSITE_URL,
    author: `${MAYUR.name}, ${RUPALI.name}`,
    twitterHandle: '@WebExpe',
    ogImage: '/public/images/og-image.jpg'
}