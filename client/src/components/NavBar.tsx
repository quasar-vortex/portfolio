import { NavLink } from "react-router-dom";
import Container from "./Container";

type Props = {
  links: { label: string; href: string }[];
};
const NavBar = ({ links }: Props) => {
  const renderLinks = links.map((l) => (
    <li key={l.label}>
      <NavLink
        className={({ isActive }) => {
          if (isActive) return "text-blue-400 font-bold";
          return "text-gray-200 hover:text-gray-400 duration-200 font-bold";
        }}
        to={l.href}
      >
        {l.label}
      </NavLink>
    </li>
  ));
  return (
    <nav className="bg-slate-800">
      <Container padding={false} className="px-6">
        <ul className="flex gap-4 items-center justify-between h-14">
          <li className="mr-auto">
            <NavLink
              className="text-xl font-bold  text-gray-200 hover:text-gray-400 duration-200"
              to="/"
            >
              JB
            </NavLink>
          </li>
          {renderLinks}
        </ul>
      </Container>
    </nav>
  );
};

export default NavBar;
