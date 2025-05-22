"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

type CustomLinkProps = {
  children: ReactNode;
  href: string;
  className: string;
  activeClassName?: string;
};
const CustomLink = ({
  children,
  href,
  className,
  activeClassName,
}: CustomLinkProps) => {
  const path = usePathname();
  // if path matches and active class is passed then use it, otherwise use classname
  const usedClass =
    path === href
      ? (activeClassName !== undefined && activeClassName) || className
      : className;
  return (
    <Link className={`${usedClass}`} href={href}>
      {children}
    </Link>
  );
};

export { CustomLink };
