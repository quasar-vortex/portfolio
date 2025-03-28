import React from "react";
import Container from "../Container";

const Projectcard = () => {
  return <div></div>;
};

type Project = {
  id: string;
  title: string;
  lead: string;
};
type Props = {
  title: string;
  lead: string;
  projects: Project[];
};
const FeaturedProjects = ({ title, lead }: Props) => {
  return (
    <section id="hero" className="bg-slate-700">
      <Container className="py-24">
        <h1 className="text-3xl font-bold mb-4 text-gray-200">{title}</h1>
        <p className="text-xl font-semibold text-gray-300 mb-8">{lead}</p>
      </Container>
    </section>
  );
};
export default FeaturedProjects;
