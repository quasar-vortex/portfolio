import { useEffect, useState } from "react";
import Container from "../Container";
import { BsCircleFill, BsCircle } from "react-icons/bs";
type Props = {
  title: string;
  lead: string;
  testimonials: {
    firstName: string;
    lastName: string;
    company: string;
    position: string;
    excerpt: string;
  }[];
};

const TestimonialSlide = ({
  company,
  excerpt,
  firstName,
  lastName,
  position,
}: Props["testimonials"][0]) => {
  return (
    <figure className="bg-slate-200 shrink-0 w-full p-6 shadow-md rounded-md">
      <blockquote className="mb-8 text-gray-800">
        <p className="text-4xl font-bold">{excerpt}</p>
      </blockquote>
      <figcaption>
        <p className="mb-2">
          <strong>
            {firstName} {lastName}
          </strong>
        </p>
        <p className="text-gray-800">
          <span className="font-semibold ">{position}</span>, {company}
        </p>
      </figcaption>
    </figure>
  );
};
const Testimonials = ({ title, lead, testimonials }: Props) => {
  const [index, setIndex] = useState(0);
  const handleIndexChange = (num: number) => {
    if (num === -1 && index - 1 > -1) {
      setIndex(index - 1);
      return;
    }
    if (num === 1 && index + 1 < testimonials.length) {
      setIndex(index + 1);
      return;
    }
    setIndex(0);
  };
  // Auto change slide every 5 seconds
  useEffect(() => {
    const int = setInterval(() => {
      handleIndexChange(1);
    }, 5000);
    return () => clearInterval(int);
  });
  return (
    <section id="testimonials" className="overflow-x-hidden">
      <Container className="py-24">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-xl font-semibold text-gray-700 mb-8">{lead}</p>
        <div className="">
          <div
            style={{ transform: `translateX(-${index * 100}%)` }}
            className="flex gap-4 duration-500 mb-8"
          >
            {testimonials.map((s) => (
              <TestimonialSlide key={s.firstName + s.lastName} {...s} />
            ))}
          </div>
          <div className="flex justify-center gap-4">
            {Array(testimonials.length)
              .fill(null)
              .map((_, idx) => {
                return (
                  <button onClick={() => setIndex(idx)} key={idx}>
                    {idx === index ? <BsCircleFill /> : <BsCircle />}
                  </button>
                );
              })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
