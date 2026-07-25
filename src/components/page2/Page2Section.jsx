import React from "react";
import Page2SectionTag from "./Page2SectionTag";


const formatCircleNumber = (index) => String(index + 1).padStart(2, "0");

const Page2Section = ({ index, totalSections, title, tags, pageRange, accentColor }) => {

  const isLastSection = index === totalSections - 1;

  return (
    <article className="relative pl-[62px] pr-[8px] pt-[2px]">
      <div
        className="absolute left-[1px] top-[2px] flex h-[44px] w-[44px] items-center justify-center rounded-full border-[3px] bg-white text-[12px] font-bold leading-none shadow-[0_0_0_2px_rgba(255,255,255,1)]"
        style={{ borderColor: accentColor, color: accentColor }}
      >
        {formatCircleNumber(index)}
      </div>

      <div className="grid grid-cols-[1fr_146px] items-start gap-x-[16px]">
        <div>
          <h2 className="text-[15px] font-bold leading-[1.08] text-[#1e1e20]">
            {title}
          </h2>

          {tags.length > 0 ? (
            <div className="mt-[14px] flex flex-wrap gap-[8px]">
              {tags.map((tag) => (
                <Page2SectionTag key={tag} label={tag} accentColor={accentColor} />
              ))}
            </div>
          ) : null}

          {/* description removed for now */}
        </div>

        <div className="pt-[4px] text-right text-[10px] font-bold tracking-[0.16em] text-[#8d8d95] whitespace-nowrap">
          {pageRange}
        </div>
      </div>

      {!isLastSection ? <div className="mt-[19px] h-px w-full bg-[#ece7f3]" /> : null}
    </article>
  );
};

export default Page2Section;