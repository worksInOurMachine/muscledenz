"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setActiveLink } from "@/redux/slices/active-link-slice";
import clsx from "clsx";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLinks } from "../../utils/navbarUtils";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import Drawer from "./Drawer";


const Navbar = () => {

  const { activeLink } = useAppSelector((a) => a.activeLink);
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState(searchParams.get("query") || "")
  const { data: session, status } = useSession() as any;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(setActiveLink(window.location.pathname || "/"));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFunction = () => {
    setIsOpen((prev) => !prev);
  };

  const updateActiveLinks = (href: string) => {
    dispatch(setActiveLink(href));
  };

  const placeholders = [
    'Search Any Product....',
    'MuscleDenz Protein Powder...',
    'MuscleDenz Creatine Monohydrate..'
  ];

  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/products?query=${query}`;
  };

  return (
    <nav
      className={clsx(
        "sticky top-0 left-0 z-50 w-full transition-all duration-300 bg-background/95 backdrop-blur-md border-b",
        scrolled ? "border-border shadow-sm" : "border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-[72px] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={"/logo/md-logo1.jpg"}
            alt="muscledenz"
            height={56}
            width={110}
            className="w-[80px] md:w-[110px] h-auto object-contain"
          />
        </Link>

        {/* Desktop Search */}
        <div className="flex-grow max-w-xl hidden lg:block">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>

        {/* Desktop NavLinks */}
        <div className="hidden lg:flex items-center gap-7">
          {NavLinks &&
            NavLinks.map((link, index) => (
              <Link
                onClick={() => updateActiveLinks(link.href)}
                href={link.href}
                key={index}
                className={clsx(
                  "relative text-[13px] font-bold uppercase tracking-wider transition-colors duration-200",
                  activeLink === link.href
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {link.text}
                {activeLink === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            ))}
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={() => handleShowSearch()}
            className="p-2.5 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle search"
          >
            {!showSearch ? <Search size={20} /> : <FaX size={16} />}
          </button>

          <button
            className="p-2.5 hover:bg-muted rounded-lg transition-colors"
            onClick={toggleFunction}
            aria-label="Open menu"
          >
            <RxHamburgerMenu size={22} />
          </button>

          <Drawer
            isOpen={isOpen}
            toggleFunction={toggleFunction}
            updateActiveLinks={updateActiveLinks}
            activeLink={activeLink}
            session={session}
            status={status}
          />
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="px-4 pb-3 lg:hidden">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
