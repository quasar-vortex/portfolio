"use client";

import { CustomLink } from "@/components/shared/customlink";
import Protected from "@/components/shared/Protected";

import { ReactNode } from "react";

const navLinks = [
  { href: "/dash", label: "Dash Home" },
  { href: "/dash/posts", label: "Manage Posts" },
  { href: "/dash/projects", label: "Manage Projects" },
  { href: "/dash/tags", label: "Manage Tags" },
  { href: "/dash/users", label: "Manage Users" },
];
function Sidebar() {
  return (
    <aside className="p-4 overflow-x-auto">
      <div className="flex space-x-4 snap-x snap-mandatory overflow-x-auto pb-2">
        {navLinks.map((link) => (
          <CustomLink
            key={link.href}
            href={link.href}
            className="snap-start shrink-0 min-w-[160px] px-4 py-3 text-center bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100 transition-colors duration-200"
            activeClassName="snap-start shrink-0 min-w-[160px] px-4 py-3 text-center bg-gray-200 border border-gray-300 rounded-md shadow hover:bg-gray-100 transition-colors duration-200"
          >
            {link.label}
          </CustomLink>
        ))}
      </div>
    </aside>
  );
}
const DashLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Protected>
        <div className="flex flex-col h-full mx-auto max-w-7xl">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </Protected>
    </>
  );
};
export default DashLayout;
