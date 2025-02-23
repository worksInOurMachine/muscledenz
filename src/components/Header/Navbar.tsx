"use client"

import { NavLinks } from '../../utils/navbarUtils';
import { useEffect, useState } from "react";
import clsx from "clsx";
import { RxHamburgerMenu } from "react-icons/rx";
import Drawer from "./Drawer";
import { FaUser } from "react-icons/fa6";
import Link from 'next/link';


const Navbar = () => {

    const pathname = window.location.pathname
    const [activeLink, setActiveLink] = useState(pathname ? pathname : "/");
    const [isOpen, setIsOpen] = useState(false);

    const toggleFunction = () => {
        setIsOpen((prev) => !prev)
    }

    const updateActiveLinks = (href: string) => {
        setActiveLink(href)
    }

    useEffect(() => {
        updateActiveLinks(pathname)
    }, [pathname])

    return (
        <nav className="lg:h-[86px] md:h-[70px] h-[60px] min-w-full lg:pt-[10px] px-[5px] shadow-xl shadow-black/10 lg:bg-white bg-[#E7E7E7] sticky top-0 left-0 z-50">
            <div className="h-full w-full">
                <div className=" float-left flex ml-[4%] h-full">
                    <a href={"/"}><img className="xl:w-[154px] md:w-[120px] w-[80px] xl:h-[74px] lg:h-[60px] md:h-[60px] h-[50px] lg:pb-[10px] lg:pt-0 pt-[12px]" src={"./logo/md-logo.png"} alt="muscledenz" /></a>
                </div>

                {/* NavLinks For Desktop */}
                <div className="float-right h-full justify-end gap-10 mr-10  items-center lg:flex hidden">
                    {
                        NavLinks && NavLinks.map((link, index) => (
                            <Link
                                onClick={() => updateActiveLinks(link.href)}
                                href={link.href} key={index}
                                className={clsx(`font-[700] text-[#333333] text-[16px] capitalize`, activeLink === link.href && 'text-[#FD0808]')}>
                                {link.text}
                            </Link>
                        ))
                    }
                    {/*  <Link href="/login" className="bg-[#FD0808] text-white py-[12px] px-[32px] rounded-[8px]  text-[16px]">
                        Login | Sign UP
                    </Link> */}
                </div>

                {/* NavLinks For Mobile */}
                <div className="float-right h-full min-w-[20%] justify-evenly gap-4  items-center lg:hidden flex">
                    <a href="/login" className="sm:text-[30px] text-[20px]"><FaUser /></a>
                    <button className="sm:text-[40px] text-[25px]" onClick={toggleFunction}>
                        <RxHamburgerMenu />
                    </button>
                    <Drawer dashboardLink={""} isOpen={isOpen} toggleFunction={toggleFunction} updateActiveLinks={updateActiveLinks} activeLink={activeLink} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
