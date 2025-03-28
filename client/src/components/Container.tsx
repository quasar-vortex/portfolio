import clsx from "clsx";

type Props = {
  children?: React.ReactNode;
  padding?: boolean;
  className?: string;
};

const Container = ({ children, padding = true, className }: Props) => {
  return (
    <div
      className={clsx({
        "max-w-7xl mx-auto": true,
        "p-6": padding,
        [className || ""]: true,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
