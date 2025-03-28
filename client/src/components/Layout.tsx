import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
const Layout = () => {
  return (
    <>
      <NavBar links={links} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
