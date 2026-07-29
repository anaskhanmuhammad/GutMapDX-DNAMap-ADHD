import { useContext } from "react";
import Page2Section from "../components/page2/Page2Section";
import { GlobalDataContext } from "../context/GlobalDataContext";
import { getSectionPageCount, getSections } from "../utils/reportPages";

const Page2 = () => {
  const { style, dnaCategories } = useContext(GlobalDataContext);

  const primaryColor = style?.primaryColor ?? "#6e4e9f";
  const secondaryColor = style?.secondaryColor ?? "#6e4e9f";

  const sectionsData = getSections(dnaCategories);


  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 w-[210mm] h-[297mm]">
        <div
          className="relative w-[210mm] h-[297mm] box-border border-[0.35mm] border-[#1f1f1f] isolate overflow-hidden bg-white"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <div className="relative z-10 h-full px-[36px] pb-[42px] pt-[38px]">
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <h1
                  className="text-[30px] font-bold leading-none tracking-[-0.02em]"
                  style={{ color: secondaryColor }}
                >
                  Contents
                </h1>
                <div
                  className="mt-[16px] h-[3px] w-[160px] rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
            </div>

            <div className="relative mt-[56px] h-[calc(100%-110px)] overflow-hidden">
              <div
                className="absolute left-[23px] top-[12px] bottom-[6px] border-l border-dashed"
                style={{ borderColor: "#d9d9ea" }}
              />

              <div className="flex flex-col gap-[19px]">
                {sectionsData.map((section, index) => {
                  const previousPages = sectionsData
                    .slice(0, index)
                    .reduce((total, item) => total + getSectionPageCount(item), 0);
                  const firstPage = 3 + previousPages;
                  const lastPage = firstPage + getSectionPageCount(section) - 1;

                  return <Page2Section
                    key={`${section.title}-${index}`}
                    index={index}
                    totalSections={sectionsData.length}
                    title={section.name}
                    tags={Array.isArray(section.collection) ? section.collection.map((item) => item?.Gene).filter(Boolean) : []}
                    pageRange={`${String(firstPage).padStart(2, "0")}-${String(lastPage).padStart(2, "0")} PAGES`}
                    accentColor={secondaryColor}
                    primaryColor={primaryColor}
                  />;
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Page2;
