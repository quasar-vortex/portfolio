import React from "react";

const Spinner = () => {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full border-4 border-slate-900 animate-spin">
        <div className="w-full absolute top-0 left-0 h-full border-t-4 rounded-full z-10 border-blue-600"></div>
      </div>
    </div>
  );
};

export default Spinner;
