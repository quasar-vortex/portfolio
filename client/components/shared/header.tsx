"use client";

import React, { Ref, RefObject, useEffect, useRef, useState } from "react";
import {
  HomeIcon,
  NewspaperIcon,
  BriefcaseIcon,
  MailIcon,
  MenuIcon,
  XIcon,
  LogInIcon,
  Grid,
  HammerIcon,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { CustomLink } from "./customlink";
import Image from "next/image";
import { Button } from "../ui/button";
import { useOutsideClick } from "@/app/useOutsideClick";

import SignOut from "./SignOut";
import { useAuthStore } from "@/app/providers/storeProvider";
import ProfileDrop from "./ProfileDrop";

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
];

const MobileMenu = ({
  isOpen,
  toggleClosed,
}: {
  isOpen: boolean;
  toggleClosed: () => void;
}) => {
  const { user } = useAuthStore();
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
            {!user && (
              <li onClick={toggleClosed}>
                <Button
                  asChild
                  className="bg-indigo-500 cursor-pointer text-white hover:bg-indigo-600 duration-200"
                >
                  <Link href="/login">
                    <LogInIcon />
                    <span>Sign In</span>
                  </Link>
                </Button>
              </li>
            )}

            {user && user.role === "ADMIN" && (
              <li onClick={toggleClosed}>
                <CustomLink
                  activeClassName="flex gap-1  items-center text-blue-500 duration-200 hover:text-gray-blue-400 font-semibold text-sm"
                  className="flex  gap-1 items-center text-gray-700 duration-200 hover:text-blue-700 font-semibold text-sm"
                  href={"/dash"}
                >
                  <HammerIcon />
                  <span>Admin</span>
                </CustomLink>
              </li>
            )}

            {user && (
              <li onClick={toggleClosed}>
                <ProfileDrop />
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
const Header = () => {
  const { user } = useAuthStore();
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

            {!user && (
              <li>
                <Button
                  asChild
                  className="bg-indigo-500 cursor-pointer text-white hover:bg-indigo-600 duration-200"
                >
                  <Link href="/login">
                    <LogInIcon />
                    <span>Sign In</span>
                  </Link>
                </Button>
              </li>
            )}

            {user && user.role === "ADMIN" && (
              <li>
                <CustomLink
                  activeClassName="flex flex-col items-center text-blue-500 duration-200 hover:text-gray-blue-400 font-semibold text-sm"
                  className="flex flex-col items-center text-gray-700 duration-200 hover:text-blue-700 font-semibold text-sm"
                  href={"/dash"}
                >
                  <HammerIcon />
                  <span>Admin</span>
                </CustomLink>
              </li>
            )}

            {user && (
              <li>
                <ProfileDrop />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export { Header };
