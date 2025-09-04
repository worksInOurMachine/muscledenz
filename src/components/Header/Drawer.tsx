import React from 'react';
import "../../styles/drawer.css";
import { IoCloseSharp } from "react-icons/io5";
import { NavLinks } from '../../utils/navbarUtils';
import clsx from 'clsx';
import Link from 'next/link';
import { LogInIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';

interface DrawerPropsTypes {
    isOpen: boolean,
    toggleFunction: () => void,
    updateActiveLinks: (href: string) => void,
    activeLink: string,

    session: any,
    status: string
}

const Drawer: React.FC<DrawerPropsTypes> = ({ isOpen, toggleFunction, updateActiveLinks, activeLink, session, status }) => {

    const closeDrawerAndUpdateLinks = (href: string) => {
        updateActiveLinks(href)
        toggleFunction()
    }


    return (
        <div className={`drawer ${isOpen ? 'open' : ''}`}>
            <button className="text-[25px] float-right" onClick={toggleFunction}>
                <IoCloseSharp />
            </button>
            <div className="mt-[50px] ml-[10%] flex flex-col justify-between h-[90%]">
                <div className="float-right h-full w-[80%] gap-[20px]  xl:hidden flex flex-col">
                    {
                        NavLinks && NavLinks.map((link, index) => (
                            <Link
                                onClick={() => closeDrawerAndUpdateLinks(link.href)}
                                href={link.href} key={index}
                                className={clsx(`font-[700] text-[19px] capitalize`, activeLink === link.href && 'text-[#FD0808]')}>
                                {link.text}
                            </Link>
                        ))
                    }

                    {
                        session?.user?.id ? <Link onClick={() => updateActiveLinks("/orders")} href="/orders" className={clsx(" font-bold text-[16px]", activeLink === "/orders" && "text-[#FD0808]")}>
                            Order
                        </Link> : ""
                    }

                </div>
                <div className='flex gap-2 justify-between'>
                    {
                        status != "loading" ? <>
                            {
                                session?.user.id ? <>{/* <Link onClick={() => closeDrawerAndUpdateLinks("/profile")} href="/profile" className="font-bold text-[16px]">
                                    <UserIcon />
                                </Link> */} </>: <Link onClick={() => closeDrawerAndUpdateLinks("/login")} href="/login" className="font-bold text-[16px]">
                                    <LogInIcon />
                                </Link>
                            }
                        </> : ""
                    }

                    <Link onClick={() => closeDrawerAndUpdateLinks("/cart")} href="/cart" className="font-bold text-[16px]">
                        <ShoppingCartIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
