import React from "react";

const Header = ({ section = "", title = "DNAMap - ADHD", logo, color = "#6e4e9f", bg = "rgba(114,78,158,0.15)" }) => {
  return (
    <div
      className="w-full mx-auto flex items-center justify-between p-5 h-[100px]"
      style={{ backgroundColor: bg }}
    >
      <div className="flex items-center gap-4 w-[200px]">
        {logo ? (
          <img
            src={logo}
            alt="Logo"
            className="w-4/5 h-full p-2 flex justify-center items-center object-contain"
          />
        ) : null}
      </div>

      <div className="flex flex-col items-end">
        <div className="text-[34px] font-bold leading-none" style={{ color }}>
          {title}
        </div>

        {(section !== "" && (
          <div
            className="mt-2 text-[12px] text-white rounded-[20px] w-[85px] flex justify-center items-end px-3"
            style={{ backgroundColor: color }}
          >
            {section}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;

