import React from 'react';
import "../../styles/drawer.css";
import { IoCloseSharp } from "react-icons/io5";
import { NavLinks } from '../../utils/navbarUtils';
import clsx from 'clsx';
import Link from 'next/link';

interface DrawerPropsTypes {
    isOpen: boolean,
    toggleFunction: () => void,
    updateActiveLinks: (href: string) => void,
    activeLink: string,
    session: any,
    status: string
}

const Drawer: React.FC<DrawerPropsTypes> = ({ isOpen, toggleFunction, updateActiveLinks, activeLink }) => {

    const closeDrawerAndUpdateLinks = (href: string) => {
        updateActiveLinks(href)
        toggleFunction()
    }

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[99] backdrop-blur-sm"
                    onClick={toggleFunction}
                />
            )}

            <div className={`drawer ${isOpen ? 'open' : ''} h-screen bg-black`}>
                <button className="text-white/60 hover:text-white transition-colors float-right" onClick={toggleFunction} aria-label="Close menu">
                    <IoCloseSharp size={28} />
                </button>
                <div className="mt-16 flex flex-col gap-1">
                    {NavLinks && NavLinks.map((link, index) => (
                        <Link
                            onClick={() => closeDrawerAndUpdateLinks(link.href)}
                            href={link.href}
                            key={index}
                            className={clsx(
                                'block py-3 px-4 rounded-lg text-base font-bold uppercase tracking-wider transition-colors duration-200',
                                activeLink === link.href
                                    ? 'text-primary bg-white/5'
                                    : 'text-white/70 hover:text-white hover:bg-white/5'
                            )}
                        >
                            {link.text}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Drawer;
