"use client";

import { NavLinks } from "../../utils/navbarUtils";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { RxHamburgerMenu } from "react-icons/rx";
import Drawer from "./Drawer";
import { FaUser } from "react-icons/fa6";
import Link from "next/link";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveLink(window.location.pathname || "/");
    }
  }, []);

  const toggleFunction = () => {
    setIsOpen((prev) => !prev);
  };

  const updateActiveLinks = (href: string) => {
    setActiveLink(href);
  };

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <nav className="lg:h-[86px] md:h-[70px] h-[60px] min-w-full lg:pt-[10px] px-[5px] shadow-xl shadow-black/10 lg:bg-white bg-[#E7E7E7] sticky top-0 left-0 z-50">
      <div className="h-full w-full flex justify-between items-center">
        <div className="flex ml-[4%] h-full">
          <a href={"/"}>
            <img
              className="xl:w-[154px] md:w-[120px] w-[80px] xl:h-[74px] lg:h-[60px] md:h-[60px] h-[50px] lg:pb-[10px] lg:pt-0 pt-[12px]"
              src={"./logo/md-logo.png"}
              alt="muscledenz"
            />
          </a>
        </div>

        <div className="w-full lg:flex hidden">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>

        {/* NavLinks For Desktop */}
        <div className="h-full justify-end gap-10 mr-10 items-center lg:flex hidden">
          {NavLinks &&
            NavLinks.map((link, index) => (
              <Link
                onClick={() => updateActiveLinks(link.href)}
                href={link.href}
                key={index}
                className={clsx(
                  `font-[700] text-[#333333] text-[16px] capitalize`,
                  activeLink === link.href && "text-[#FD0808]"
                )}
              >
                {link.text}
              </Link>
            ))}
        </div>

        {/* NavLinks For Mobile */}
        <div className="float-right h-full min-w-[20%] justify-evenly gap-4 items-center lg:hidden flex">
          <a href="/login" className="sm:text-[30px] text-[20px]">
            <FaUser />
          </a>
          <button className="sm:text-[40px] text-[25px]" onClick={toggleFunction}>
            <RxHamburgerMenu />
          </button>
          <Drawer
            dashboardLink={""}
            isOpen={isOpen}
            toggleFunction={toggleFunction}
            updateActiveLinks={updateActiveLinks}
            activeLink={activeLink}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
