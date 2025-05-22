"use client";

import React, { Ref, RefObject, useEffect, useRef, useState } from "react";
import {
  HomeIcon,
  NewspaperIcon,
  BriefcaseIcon,
  MailIcon,
  MenuIcon,
  XIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { CustomLink } from "./customlink";
import Image from "next/image";
import { Button } from "../ui/button";
import { useOutsideClick } from "@/app/utils/useOutsideClick";

const links = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    label: "Posts",
    icon: NewspaperIcon,
    href: "/posts",
  },
  {
    label: "Projects",
    icon: BriefcaseIcon,
    href: "/projects",
  },
  {
    label: "Contact",
    icon: MailIcon,
    href: "/contact",
  },
  {
    label: "Admin",
    icon: UserIcon,
    href: "/login",
  },
];

const MobileMenu = ({
  isOpen,
  toggleClosed,
}: {
  isOpen: boolean;
  toggleClosed: () => void;
}) => {
  const ref = useOutsideClick(toggleClosed);
  return (
    <>
      <div
        className={`z-50 duration-200 ${
          !isOpen && "-translate-x-full"
        } border-r border-gray-300  top-0 left-0 absolute h-screen w-60 ${
          isOpen && "menu"
        } `}
      >
        <div ref={ref} className="bg-gray-100 h-full">
          <div className="p-6 border-b border-gray-300">
            <Link onClick={toggleClosed} className="block" href="/">
              <Image
                className="hover:shadow-xl shadow-gray-400 duration-200 rounded-full "
                src={"icon.svg"}
                alt="logo"
                height={48}
                width={48}
              />
            </Link>
          </div>
          <ul className="p-6 space-y-6">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <li key={l.label} onClick={toggleClosed}>
                  <CustomLink
                    activeClassName="flex gap-1  items-center text-blue-500 duration-200 hover:text-gray-blue-400 font-semibold text-sm"
                    className="flex  gap-1 items-center text-gray-700 duration-200 hover:text-blue-700 font-semibold text-sm"
                    href={l.href}
                  >
                    <Icon />
                    <span>{l.label}</span>
                  </CustomLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((p) => !p);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    };

    addEventListener("resize", handleResize);
    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <header className="border-b border-gray-300 h-22 bg-gray-100">
      <Container>
        <nav className="flex jusftify-between items-center">
          <div className="mr-auto">
            <Link className="block" href="/">
              <Image
                className="hover:shadow-xl shadow-gray-400 duration-200 rounded-full "
                src={"icon.svg"}
                alt="logo"
                height={48}
                width={48}
              />
            </Link>
          </div>
          <div>
            <Button className="cursor-pointer md:hidden" onClick={toggleOpen}>
              {isOpen ? <XIcon /> : <MenuIcon />}
            </Button>
          </div>
          <MobileMenu toggleClosed={() => setIsOpen(false)} isOpen={isOpen} />
          {/* Desktop Menu */}
          <ul className=" gap-6 hidden md:flex">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <li key={l.label}>
                  <CustomLink
                    activeClassName="flex flex-col items-center text-blue-500 duration-200 hover:text-gray-blue-400 font-semibold text-sm"
                    className="flex flex-col items-center text-gray-700 duration-200 hover:text-blue-700 font-semibold text-sm"
                    href={l.href}
                  >
                    <Icon />
                    <span>{l.label}</span>
                  </CustomLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export { Header };
