import React from "react";
import Section from "../shared/section";

const About = ({
  content,
  bgGray,
}: {
  title: string;
  content: string;
  bgGray?: boolean;
}) => {
  return (
    <Section bgGray={bgGray} title="About Me">
      <p className="text-base sm:text-lg text-gray-700 mb-6">{content}</p>
    </Section>
  );
};

export { About };
