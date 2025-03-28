import { useNavigate } from "react-router-dom";
import Container from "../Container";

type Props = {
  title: string;
  lead: string;
};
const Hero = ({ title, lead }: Props) => {
  const nav = useNavigate();
  const handleNavOnClick = (href: string) => nav(href);
  return (
    <section id="hero" className="bg-slate-700">
      <Container className="py-24">
        <h1 className="text-4xl font-bold mb-4 text-gray-200">{title}</h1>
        <p className="text-xl font-semibold text-gray-300 mb-8">{lead}</p>
        <div className="flex gap-4">
          <button
            onClick={() => handleNavOnClick("/blog")}
            className="bg-slate-600 font-bold text-xl text-slate-200 px-4 py-2 rounded-md border border-slate-200 cursor-pointer hover:bg-slate-800 duration-200"
          >
            Read Blog
          </button>
          <button
            onClick={() => handleNavOnClick("/contact")}
            className="bg-blue-600 font-bold text-xl text-blue-200 px-4 py-2 rounded-md border border-blue-200 cursor-pointer hover:bg-blue-800 duration-200"
          >
            Contact Me
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
