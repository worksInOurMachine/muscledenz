import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import "../../styles/drawer.css";
import { IoCloseSharp } from "react-icons/io5";
import { NavLinks } from '../../utils/navbarUtils';
import clsx from 'clsx';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, LogIn, ShoppingBag } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface DrawerPropsTypes {
    isOpen: boolean,
    toggleFunction: () => void,
    updateActiveLinks: (href: string) => void,
    activeLink: string,
    session: any,
    status: string
}

const Drawer: React.FC<DrawerPropsTypes> = ({ 
    isOpen, 
    toggleFunction, 
    updateActiveLinks, 
    activeLink,
    session,
    status 
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isMounted) return null;

    const closeDrawerAndUpdateLinks = (href: string) => {
        updateActiveLinks(href)
        toggleFunction()
    }

    const handleSignOut = async () => {
        await signOut();
        toggleFunction();
    }

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-[999] backdrop-blur-sm"
                        onClick={toggleFunction}
                    />

                    {/* Drawer Content */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="drawer open fixed top-0 right-0 h-[100dvh] bg-neutral-950 z-[1000] p-6 shadow-2xl overflow-y-auto w-[80%] sm:w-[400px]"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xl font-black tracking-tighter uppercase text-white">Menu</span>
                                <button 
                                    className="p-2 -mr-2 text-white/60 hover:text-white transition-colors" 
                                    onClick={toggleFunction} 
                                    aria-label="Close menu"
                                >
                                    <IoCloseSharp size={28} />
                                </button>
                            </div>

                            {/* Main Navigation */}
                            <div className="flex flex-col gap-2">
                                {NavLinks && NavLinks.map((link, index) => (
                                    <Link
                                        onClick={() => closeDrawerAndUpdateLinks(link.href)}
                                        href={link.href}
                                        key={index}
                                        className={clsx(
                                            'flex items-center py-4 px-4 rounded-xl text-lg font-bold uppercase tracking-wider transition-all duration-200',
                                            activeLink === link.href
                                                ? 'text-primary bg-primary/10 border border-primary/20'
                                                : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                                        )}
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto pt-8 border-t border-white/10">
                                {/* Account Section */}
                                {status === "authenticated" ? (
                                    <div className="flex flex-col gap-3">
                                        <div className="px-4 mb-2">
                                            <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Logged in as</p>
                                            <p className="text-white font-medium truncate">{session?.user?.email}</p>
                                        </div>
                                        
                                        <Link
                                            href="/orders"
                                            onClick={toggleFunction}
                                            className="flex items-center gap-3 py-3 px-4 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                        >
                                            <ShoppingBag size={20} />
                                            <span className="font-bold uppercase text-sm tracking-wide">My Orders</span>
                                        </Link>

                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-3 py-3 px-4 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full text-left"
                                        >
                                            <LogOut size={20} />
                                            <span className="font-bold uppercase text-sm tracking-wide">Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        <Link
                                            href="/login"
                                            onClick={toggleFunction}
                                            className="flex items-center justify-center gap-3 py-4 px-4 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-wider transition-transform active:scale-95"
                                        >
                                            <LogIn size={20} />
                                            <span>Login / Register</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default Drawer;


