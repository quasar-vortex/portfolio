import Container from "../Container";

type Props = {
  title: string;
  lead: string;
};
const About = ({ title, lead }: Props) => {
  return (
    <section id="about" className="bg-slate-700">
      <Container className="py-24">
        <h1 className="text-3xl font-bold mb-4 text-gray-200">{title}</h1>
        <p className="text-xl font-semibold text-gray-300 mb-8">{lead}</p>
      </Container>
    </section>
  );
};

export default About;
