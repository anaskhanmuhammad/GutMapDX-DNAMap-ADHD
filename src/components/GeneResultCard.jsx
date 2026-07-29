import { getGeneOutcome } from "../utils/geneticResults";

const STATUS_STYLES = {
  green: { background: "#a8e8c7", text: "#075b3c" },
  yellow: { background: "#f0eb91", text: "#6b5f00" },
  red: { background: "#e9a0ad", text: "#850016" },
  unavailable: { background: "#e7e4e9", text: "#5f5865" },
};

const getSnps = (gene) => {
  if (Array.isArray(gene?.snps) && gene.snps.length > 0) return gene.snps;
  return [{ "Key SNPs": gene?.["Key SNPs"] }];
};

const GeneResultCard = ({ gene, result, accentColor = "#006e5e" }) => {

  console.log(result);

  const snps = getSnps(gene);
  const { outcomes, status, recommendations } = getGeneOutcome(snps, result);
  const statusStyle = STATUS_STYLES[status];
  const relevance = gene?.["Function / ADHD Relevance"] ?? gene?.Function ?? "—";
  const explanation =
    gene?.["Generic Explanation (Lay-readable, ADHD-specific)"] ??
    gene?.description ??
    "—";

  return (
    <article className="rounded-[25px] border-2 border-[#d8cde8] bg-white p-[15px]">
      <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.10)]">
        <div
          className="grid grid-cols-[76px_100px_1fr_120px] items-center text-[14px] font-bold tracking-[0.04em]"
          style={{ backgroundColor: `${accentColor}40`, color: accentColor }}
        >
          <div className="border-r border-[#9fbcb7] px-3 py-4">Gene</div>
          <div className="border-r border-[#9fbcb7] px-3 py-4 text-center">Key SNPs</div>
          <div className="border-r border-[#9fbcb7] px-3 py-4 text-center">Relevance</div>
          <div className="px-3 py-4 text-center">Result</div>
        </div>

        <div className="grid grid-cols-[76px_100px_1fr_120px] items-stretch text-[11px] text-[#1e1e20]">
          <div className="flex items-center border-r border-[#e6e2e9] px-3 font-bold">{gene?.Gene ?? "—"}</div>
          <div className="border-r border-[#e6e2e9]">
            {outcomes.map((outcome, index) => (
              <div
                key={`${outcome.key}-${index}`}
                className={`px-3 py-2 text-center ${index < outcomes.length - 1 ? "border-b border-[#e6e2e9]" : ""}`}
              >
                {outcome.label}
              </div>
            ))}
          </div>
          <div className="flex items-center border-r border-[#e6e2e9] px-2 py-1 text-center leading-relaxed">{relevance}</div>
          <div className="flex flex-col justify-around gap-2 px-3 py-2">
          {outcomes.map((outcome, index) => (
            <span
              key={`${outcome.key}-${index}-result`}
              className="rounded-full px-3 py-1 text-center font-semibold"
              style={{ backgroundColor: STATUS_STYLES[outcome.status].background }}
            >
              {outcome.genotype}
              </span>
            ))}
          </div>
        </div>

        <p className="border-t border-[#e6e2e9] px-2 py-2 text-center text-[11px] leading-relaxed text-[#25232a]">{explanation}</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-[14px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.10)]">
        <h3 className="px-4 py-3 text-center text-[14px] font-bold text-[#17151a]" style={{ backgroundColor: statusStyle.background }}>
          Recommendation / Explanation
        </h3>
        <div className="px-3 py-2 text-center text-[11px] leading-relaxed">
          {recommendations.map((recommendation, index) => <p key={`${recommendation}-${index}`}>{recommendation}</p>)}
        </div>
      </div>
    </article>
  );
};

export default GeneResultCard;