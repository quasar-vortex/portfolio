import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
};
const Container = ({
  children,
  className,
  noPadding = false,
}: ContainerProps) => {
  return (
    <div className={`max-w-7xl mx-auto ${!noPadding && "p-6"} ${className}`}>
      {children}
    </div>
  );
};

export { Container };
