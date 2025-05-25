import { CustomLink } from "@/components/shared/customlink";
import Protected from "@/components/shared/Protected";

import { ReactNode } from "react";

const navLinks = [
  { href: "/dash/", label: "Dash Home" },
  { href: "/dash/posts", label: "Manage Posts" },
  { href: "/dash/tags", label: "Manage Tags" },
  { href: "/dash/users", label: "Manage Users" },
  { href: "/dash/projects", label: "Manage Projects" },
  { href: "/dash/profile", label: "User Profile" },
];

function Sidebar() {
  return (
    <aside className="p-6">
      <div className="md:w-64 mt-6 rounded-md shadow-md border border-gray-300 h-min   p-4">
        <nav>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <CustomLink
                  href={link.href}
                  className="block px-3 py-2 rounded hover:bg-gray-200 duration-200"
                  activeClassName="block px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 duration-200"
                >
                  {link.label}
                </CustomLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
const DashLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Protected>
        <div className="flex flex-col md:flex-row h-full mx-auto max-w-7xl">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </Protected>
    </>
  );
};
export default DashLayout;
