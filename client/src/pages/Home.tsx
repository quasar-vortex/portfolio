import About from "../components/home/About";
import Hero from "../components/home/Hero";
import Testimonials from "../components/home/Testimonials";
import siteData from "../data";

const Home = () => {
  return (
    <>
      <Hero {...siteData.hero} />
      <Testimonials {...siteData.testimonials} />
      <About {...siteData.about} />
    </>
  );
};

export default Home;
