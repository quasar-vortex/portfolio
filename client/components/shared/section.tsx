import React, { ReactNode } from "react";
import { Container } from "./container";

type Props = {
  id?: string;
  title?: string;
  children?: ReactNode;
  bgGray?: boolean;
  wrapperClass?: string;
  containerClass?: string;
  wrapperPadding?: boolean;
  containerPadding?: boolean;
};
const Section = ({
  id,
  title,
  children,
  bgGray = false,
  wrapperClass = "",
  containerClass = "",
  wrapperPadding = true,
  containerPadding = true,
}: Props) => {
  return (
    <section
      id={id}
      className={`${bgGray && "bg-gray-100"} ${
        wrapperPadding && "py-12"
      } ${wrapperClass}`}
    >
      <Container className={containerClass} noPadding={!containerPadding}>
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
