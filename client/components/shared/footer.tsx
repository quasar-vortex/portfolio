import Link from "next/link";
import { Container } from "../shared/container";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <Container className="py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
        <div className="text-sm text-gray-600">
          &copy; {year} Jeremy Barber. All rights reserved.
        </div>
        <nav className="flex gap-4 text-sm text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/projects" className="hover:text-blue-600 transition">
            Projects
          </Link>
          <Link href="/posts" className="hover:text-blue-600 transition">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </nav>
      </Container>
    </footer>
  );
};

export { Footer };
