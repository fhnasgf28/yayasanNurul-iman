import { useEffect, useState } from 'react';
import { THEMES } from '../../shared/enums';
import { addBodyNoScroll, combineClasses, getCategories, removeBodyNoScroll } from '../../utils/utils';
import classes from './Navbar.module.scss';
import { Text, LinkTo } from '../../components';
import { useTheme } from 'next-themes';
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { MdOutlineClose } from 'react-icons/md';
import NavCatergoryDD from '../Misc/NavCategoryDD';
import { iNavLink, iNavSetup, iNavSocials } from '../../shared/interfaces';

interface IProps {
    openSidebar: boolean;
    closeNavSidebar: () => void;
    navSetup: iNavSetup;
    changeTheme: () => void;
}

const NavSidebar = ({ openSidebar = false, closeNavSidebar, navSetup, changeTheme }: IProps) => {
    const { theme, setTheme } = useTheme();
    useEffect(() => {
        openSidebar
            ? addBodyNoScroll()
            : removeBodyNoScroll()

        return () => {
            removeBodyNoScroll()
        }
    }, [openSidebar]);

    const env = process.env.NODE_ENV;
    const [openDD, setOpenDD] = useState(false)

    return (
        <>
            {openSidebar ? (
                <div className="backdrop" onClick={closeNavSidebar}></div>
            ) : null}

            <aside className={combineClasses(classes.nav_sidebar_wrapper, openSidebar && classes.open, 'dark:bg-slate-900 dark:text-white bg-white text-black')}>
                <div className='flex items-center justify-between pb-3' onClick={closeNavSidebar}>
                    <p className=''>menu</p>
                    <div><MdOutlineClose className='text-slate-800 dark:text-white text-[25px]' /></div>
                </div>
                <hr />
                <div className='my-15'>
                    {
                        navSetup.sideNavLinks.map((each: iNavLink, i: any) => (
                            each.type !== 'dropdown' ? !each.newTab ?
                                <LinkTo href={each.path} key={i} passHref className='text-[16px] block my-3'>
                                    {each.label}
                                </LinkTo> :
                                <a href={each.path} key={each.path} target="_blank" rel="noopener noreferrer" className='text-[16px] block my-3 flex-wrap'>
                                    {each.label}
                                </a>
                                :
                                // eslint-disable-next-line react/jsx-key
                                <NavCatergoryDD label={each.label} openDD={openDD} setOpenDD={() => setOpenDD(!openDD)} />
                        ))
                    }
                    {
                        env === 'development' ?
                            <>
                                <hr />
                                <Text subtitle className='mt-3 !text-[18px]'>Examples and tutorials</Text>
                                <LinkTo href='/pages/tutorial/all-components.tsx' passHref className='text-[16px] block my-3'>
                                    #
                                </LinkTo>
                                <LinkTo href='/pages/tutorial/style-guide.tsx' passHref className='text-[16px] block my-3'>
                                   #
                                </LinkTo>
                                <LinkTo href='/pages/tutorial/home-layout.tsx' passHref className='text-[16px] block my-3'>
                                #
                                </LinkTo>
                                <LinkTo href='/pages/tutorial/blog-with-sidebar-layout.tsx' passHref className='text-[16px] block my-3'>
                                #
                                </LinkTo>
                                <LinkTo href='/pages/tutorial/blog-with-centered-layout.tsx' passHref className='text-[16px] block my-3'>
                                #
                                </LinkTo>
                                <LinkTo href='/pages/tutorial/how-to-setup-blog.tsx' passHref className='text-[16px] block my-3'>
                                #
                                </LinkTo>
                                <LinkTo href='/pages/tutorial/how-to-write-your-first-article.tsx' passHref className='text-[16px] block my-3'>
                                    Yayasan Nurul Iman Adakan Acara Santunan Anak Yatim 10 Muharram
                                </LinkTo>
                                <LinkTo href='/pages/tutorial/how-to-deploy-blog.tsx' passHref className='text-[16px] block my-3'>
                                #
                                </LinkTo>
                                <LinkTo href='/pages/tutorial/icons.tsx' passHref className='text-[16px] block my-3'>
                                    Icons
                                </LinkTo>
                            </>
                            : null
                    }

                </div>
                <hr />
                <div className='my-5'>
                    {
                        navSetup.socials && <>
                            <p className='font-light'>Ikuti Kami : </p> {
                                navSetup.socials.map((each: iNavSocials) => (
                                    <a href={each.link} key={each.link} target="_blank" rel="noopener noreferrer" className='text-[28px] inline-block mr-5 mt-2'>{each.icon}</a>
                                ))
                            }
                            <hr className='mt-5' />
                        </>
                    }
                </div>
                <div className='mt-5 mb-4'>
                    <p className='mb-2 font-light'>Switch To {theme === THEMES.LIGHT ? 'Dark' : 'Light'} Theme :</p>
                    <button name="theme-switch" aria-label="theme-switch" className={combineClasses(classes.theme_switch, 'dark:text-white text-black')} onClick={() => changeTheme()}>
                    {
                            theme === THEMES.DARK ? <BsFillSunFill className="text-2xl" /> : <BsFillMoonFill className="text-lg" />
                        }
                    </button>
                </div>
                <hr />
                <div className='my-5'>
                    <p className='text-sm font-light dark:text-gray-400 text-gray-500 mb-1'>Copyright © 2022</p>
                    <LinkTo href="/privacy-policy" passHref className='text-sm font-light dark:text-gray-400 text-gray-500 pr-3'>
                        Kebijakan Pribadi
                    </LinkTo>
                    <LinkTo href="/terms-and-condition" passHref className='text-sm font-light dark:text-gray-400 text-gray-500'>
                        Syarat dan Ketentuan
                    </LinkTo>
                </div>
            </aside>
        </>
    )
}

export default NavSidebar