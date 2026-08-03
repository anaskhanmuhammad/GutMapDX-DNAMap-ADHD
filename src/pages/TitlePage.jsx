import React from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";
import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";


const KitIdIcon = () => (
  <svg
    className="kit-id-icon-svg"
    viewBox="0 0 512 512"
    aria-hidden="true"
    focusable="false"
    role="img"
  >
    <path d="M249.992,158.591A100.713,100.713,0,1,0,350.705,259.3,100.825,100.825,0,0,0,249.992,158.591Zm0,187.425A86.713,86.713,0,1,1,336.705,259.3,86.811,86.811,0,0,1,249.992,346.016Zm237.044,99.562-85.321-85.32a22.777,22.777,0,0,0-22.348-5.779l-22.025-22.025A129.893,129.893,0,0,0,183.327,147.795V85.418a27.872,27.872,0,0,0,24.541-27.634V36.831A27.867,27.867,0,0,0,180.032,9H46.15A27.866,27.866,0,0,0,18.315,36.831V57.784A27.87,27.87,0,0,0,42.856,85.418V432.761a70.236,70.236,0,0,0,140.471,0V370.81a129.689,129.689,0,0,0,139.818-4.157l22.027,22.027a22.968,22.968,0,0,0-.874,6.245,22.613,22.613,0,0,0,6.65,16.1l85.321,85.322a22.8,22.8,0,0,0,32.2,0l18.567-18.567a22.818,22.818,0,0,0,0-32.2ZM120.04,259.3a129.738,129.738,0,0,0,4.126,32.54H56.856V245.322H75.8a7,7,0,0,0,0-14H56.856V196.2h43.779a7,7,0,1,0,0-14H56.856V147.074H75.8a7,7,0,0,0,0-14H56.856V85.62H169.327v71.872A129.782,129.782,0,0,0,120.04,259.3ZM32.315,57.784V36.831A13.85,13.85,0,0,1,46.15,23H180.032a13.851,13.851,0,0,1,13.836,13.835V57.784A13.852,13.852,0,0,1,180.032,71.62H46.15A13.851,13.851,0,0,1,32.315,57.784ZM169.327,432.761a56.236,56.236,0,0,1-112.471,0V305.843h71.808a130.56,130.56,0,0,0,40.663,55.27ZM134.04,259.3A115.952,115.952,0,1,1,249.992,375.255,116.083,116.083,0,0,1,134.04,259.3Zm214.713,84.362,18.677,18.677-14.4,14.4-18.677-18.677A130.932,130.932,0,0,0,348.753,343.665ZM477.135,467.88,458.57,486.446a8.781,8.781,0,0,1-12.4,0l-85.32-85.321a8.813,8.813,0,0,1,0-12.4l18.568-18.567a8.778,8.778,0,0,1,12.4,0l85.32,85.321a8.813,8.813,0,0,1,0,12.4ZM255.959,211.85a7,7,0,0,0-11.933,0l-20.1,32.764c-9.9,16.133-12.321,41.8,1.018,55.141a35.5,35.5,0,0,0,50.1,0c13.339-13.339,10.915-39.008,1.018-55.141Zm9.183,78.006a21.509,21.509,0,0,1-30.3,0c-8.125-8.126-5.985-26.506,1.018-37.921L249.993,228.9l14.131,23.039C271.127,263.35,273.267,281.73,265.142,289.856Z" />
  </svg>
);

const TitlePage = () => {
  const { style, patientName, kitid, SampleDate, Kittype } =
    useContext(GlobalDataContext);
  console.log(kitid);

  const primaryColor = style?.primaryColor;
  const secondaryColor = style?.secondaryColor;
  const secondaryFivePercent = secondaryColor
    ? `${secondaryColor}0D`
    : `rgba(0, 0, 0, 0.05)`;
  const header = style?.header;



  const isPrint = new URLSearchParams(window.location.search).get("print") === "1";

  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const percentageRef = useRef(0);

  const { id } = useParams();


  useEffect(() => {
    if (!isPrint) {
      document.body.classList.remove("print-mode");
      window.__REPORT_READY__ = false;
      return;
    }

    document.body.classList.add("print-mode");
    return () => document.body.classList.remove("print-mode");
  }, [isPrint]);

  useEffect(() => {
    if (!isPrint) return;

    const container = document.getElementById("report-container");
    if (!container) return;

    // Signal to Puppeteer that the report DOM is ready for PDF capture.
    window.__REPORT_READY__ = false;
    requestAnimationFrame(() => {
      window.__REPORT_READY__ = true;
    });
  }, [isPrint]);

    const downloadpdf = async (Kittype) => {
    try {
      setPercentage(10);
      percentageRef.current = 10;

      const interval = setInterval(() => {
        setPercentage((prev) => {
          if (prev >= 83) {
            return prev;
          } 
          return prev + 3;
        });
      }, 150);


      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/report/${id}/download`,
      );
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      setPercentage(90);
      percentageRef.current = 90;

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Gut-Thyroid-Function-Test-Report.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      setPercentage(100);
      percentageRef.current = 100;
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (err) {
      console.error("Server PDF download failed:", err);
    } finally {
      setLoading(false);
    }
  };




  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 w-[210mm] h-[297mm]">
        <div className="relative w-[210mm] h-[297mm] box-border border-[0.35mm] border-[#1f1f1f] isolate overflow-hidden bg-white">
          {header ? (
            <img
              src={header}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ zIndex: 0 }}
            />
          ) : (
            <div className="absolute inset-0" />
          )}

          <div
            className="absolute inset-0"
            // style={{ backgroundColor: secondaryFivePercent }}
          />

          <section className="absolute left-[8.5%] top-[50.2%] w-[49%] z-10 flex flex-col gap-2 ">
            {style?.imageBase64 ? (
              <img
                className="w-[280px] max-w-full object-contain mb-4"
                src={style?.imageBase64}
                alt="AllergyPro"
              />
            ) : null}



            <h1
              className="text-[50px] leading-[0.98] font-bold"
              style={{ color: secondaryColor }}
            >
              DNAMap
            </h1>

            <div>
              <h2 className="text-[22px] font-bold w-fit py-0 px-5 rounded-full" style={{ backgroundColor: primaryColor, color: "#ffffff" }}>
                {Kittype ? Kittype.slice(4) : ""}
              </h2>
            </div>



            <div className="mt-6 flex flex-col gap-2 text-[18px]">
              <div className="flex items-center gap-[18px]">


                <div
                  className="flex gap-[8px] justify-center items-center"
                  style={{ color: secondaryColor }}
                >
                  <div className=" font-bold">Sample ID:</div>
                  <div>
                    {kitid}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-[18px]">


                <div
                  className="flex gap-[8px] justify-center items-center"
                  style={{ color: secondaryColor }}
                >
                  <div className=" font-bold">Patient Name:</div>
                  <div>
                    {patientName}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-[18px]">


                <div
                  className="flex gap-[8px] justify-center items-center"
                  style={{ color: secondaryColor }}
                >
                  <div className=" font-bold">Sample Date:</div>
                  <div>
                    {SampleDate}
                  </div>
                </div>
              </div>

          {!loading ? (
            <button
              className="print:hidden text-white"
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                await downloadpdf();
                setLoading(false);
              }}
              style={{ backgroundColor: primaryColor }}
            >
              Download
            </button>
          ) : (
            <div className="mt-3 flex flex-col gap-2 text-base font-medium text-[#001342] print:hidden">
              <div className="text-base font-medium text-[#001342]">
                Downloading...
              </div>

              <div className="relative h-10 w-full overflow-hidden rounded-md bg-[#f0f0f0]">
                <div
                  className="flex h-full items-center justify-end pr-3 transition-[width] duration-300 ease-in-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: primaryColor,
                  }}
                />
              </div>

              <div className="text-right text-sm font-semibold text-[#001342]">
                {percentage}%
              </div>
            </div>
          )}


            </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default TitlePage;
