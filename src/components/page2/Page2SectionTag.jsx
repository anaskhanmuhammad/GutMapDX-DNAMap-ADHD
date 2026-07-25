import React from "react";

const Page2SectionTag = ({ label, accentColor }) => {
  return (
    <span
      className="inline-flex items-center rounded-[7px] bg-[#eeeff8] px-[12px] py-[7px] text-[10px] font-semibold leading-none shadow-[0_1px_0_rgba(255,255,255,0.85)_inset]"
      style={{ color: accentColor }}
    >
      {label}
    </span>
  );
};

export default Page2SectionTag;