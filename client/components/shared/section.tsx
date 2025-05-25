import React, { ReactNode } from "react";
import { Container } from "./container";

type Props = {
  id?: string;
  title?: string;
  children?: ReactNode;
  bgGray?: boolean;
  wrapperClass?: string;
  containerClass?: string;
};
const Section = ({
  id,
  title,
  children,
  bgGray = false,
  wrapperClass = "",
  containerClass = "",
}: Props) => {
  return (
    <section className={`${bgGray && "bg-gray-100"} py-12 ${wrapperClass}`}>
      <Container className={containerClass}>
        {title && (
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-600">
            {title}
          </h2>
        )}
        {children}
      </Container>
    </section>
  );
};

export default Section;
