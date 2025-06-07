"use client";

import { Container } from "@/components/shared/container";
import React, { useRef } from "react";
import Typed from "typed.js";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import img from "../../public/terminal.png";
import { SiMysql, SiTailwindcss } from "react-icons/si";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaReact, FaNodeJs, FaNetworkWired, FaLinux } from "react-icons/fa";
const skills = [
  { label: "ReactJS", icon: FaReact },
  { label: "Linux", icon: FaLinux },
  { label: "NodeJS", icon: FaNodeJs },
  { label: "Networking", icon: FaNetworkWired },
  { label: "MySQL", icon: SiMysql },
  { label: "Tailwind", icon: SiTailwindcss },
];
type HeroProps = {
  name: string;
  titles: string[];
  description: string;
  cta: {
    label: string;
    href: string;
  };
};
const Hero = ({ titles, description, cta, name }: HeroProps) => {
  const typedRef = useRef(null);
  React.useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [...titles],
      typeSpeed: 50,
      loop: true,
      loopCount: 4,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, [titles]);

  const scrollContainer = useRef<HTMLUListElement | null>(null);

  return (
    <section id="hero" className="bg-gray-100">
      <Container className="py-20 ">
        <div className="flex mb-6 flex-col-reverse gap-12 md:flex-row">
          <div className="md:flex-1 md:max-w-1/2  border-gray-300 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-600">
              {name}
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">
              <span ref={typedRef} />
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6">
              {description}
            </p>

            <div className="w-full">
              <div className="flex gap-6 mb-3">
                <Button
                  className="cursor-pointer bg-slate-600 duration-200 hover:bg-slate-800"
                  size="sm"
                  onClick={() => {
                    if (scrollContainer.current) {
                      scrollContainer.current.scrollBy(-150, 0);
                    }
                  }}
                >
                  <FiChevronLeft />
                </Button>
                <Button
                  className="cursor-pointer bg-slate-600 duration-200 hover:bg-slate-800"
                  onClick={() => {
                    if (scrollContainer.current) {
                      scrollContainer.current.scrollBy(150, 0);
                    }
                  }}
                  size="sm"
                >
                  <FiChevronRight />
                </Button>
              </div>
              <ul
                ref={scrollContainer}
                className="w-full flex gap-6 mb-12 overflow-x-auto snap-x snap-mandatory scroll-smooth py-2"
              >
                {skills.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li
                      key={s.label}
                      className="bg-white snap-center min-w-40 justify-center shrink-0 p-2 rounded-sm hover:shadow-md duration-200 shadow-gray-300 group flex items-center gap-1 flex-col md:flex-row"
                    >
                      <Icon
                        title={s.label}
                        className="text-2xl text-blue-400 group-hover:text-blue-600 duration-200"
                      />
                      <span className="text-sm text-blue-400 font-bold group-hover:text-blue-600 duration-200">
                        {s.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Button
              asChild
              size="lg"
              className="text-base sm:text-lg font-bold bg-blue-600 hover:bg-blue-800 duration-200"
            >
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </div>
          <div className="flex flex-col min-w-[14rem] items-center justify-center md:items-end md:flex-1 ">
            <div className="max-h-[20rem] bg-[rgba(0,0,0,.1)]  rounded-md overflow-hidden shadow-md  border-gray-100 border-2">
              <Image
                src={img}
                alt="avatar"
                height={500}
                width={500}
                className="h-full w-auto border inset-10 shadow-md shadow-gray-400"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export { Hero };
