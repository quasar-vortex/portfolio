import React from "react";
import { Container } from "../shared/container";
import Section from "../shared/section";

const Skills = ({
  sillList,
  bgGray,
}: {
  bgGray?: boolean;
  sillList: { label: string; icon: any }[];
}) => {
  return (
    <Section bgGray={bgGray} title="Skills">
      <ul className="gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {sillList?.map((s) => {
          const Icon = s.icon;
          return (
            <li
              key={s.label}
              className="bg-white border border-gray-300 snap-center min-w-40 justify-center shrink-0 p-4 text-center rounded-md hover:shadow-md duration-200 shadow-gray-300 group flex items-center gap-1 flex-col md:flex-row"
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
    </Section>
  );
};

export { Skills };
