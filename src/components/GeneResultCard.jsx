const PLACEHOLDER_RESULT = "TT";
const PLACEHOLDER_RECOMMENDATION =
  "Placeholder recommendation: follow a consistent sleep routine, use regular movement and discuss personalised support with a qualified healthcare professional.";

const getSnps = (gene) => {
  if (Array.isArray(gene?.snps) && gene.snps.length > 0) return gene.snps;
  return [{ "Key SNPs": gene?.["Key SNPs"] }];
};

const GeneResultCard = ({ gene, accentColor = "#006e5e" }) => {
  const snps = getSnps(gene);
  const relevance = gene?.["Function / ADHD Relevance"] ?? gene?.Function ?? "—";
  const explanation =
    gene?.["Generic Explanation (Lay-readable, ADHD-specific)"] ??
    gene?.description ??
    "—";

  return (
    <article className="rounded-[25px] border-2 border-[#d8cde8] bg-white p-[15px]">
      <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.10)]">
        <div
          className="grid grid-cols-[76px_178px_1fr_158px] items-center text-[14px] font-bold tracking-[0.04em]"
          style={{ backgroundColor: `${accentColor}40`, color: accentColor }}
        >
          <div className="border-r border-[#9fbcb7] px-3 py-4">Gene</div>
          <div className="border-r border-[#9fbcb7] px-3 py-4 text-center">Key SNPs</div>
          <div className="border-r border-[#9fbcb7] px-3 py-4 text-center">Relevance</div>
          <div className="px-3 py-4 text-center">Result</div>
        </div>

        <div className="grid grid-cols-[76px_178px_1fr_158px] items-stretch text-[11px] text-[#1e1e20]">
          <div className="flex items-center border-r border-[#e6e2e9] px-3 font-bold">{gene?.Gene ?? "—"}</div>
          <div className="border-r border-[#e6e2e9]">
            {snps.map((snp, index) => (
              <div
                key={`${snp?.["Key SNPs"] ?? index}`}
                className={`px-3 py-2 text-center ${index < snps.length - 1 ? "border-b border-[#e6e2e9]" : ""}`}
              >
                {snp?.["Key SNPs"] ?? "—"}
              </div>
            ))}
          </div>
          <div className="flex items-center border-r border-[#e6e2e9] px-2 py-1 text-center leading-relaxed">{relevance}</div>
          <div className="flex flex-col justify-around gap-2 px-3 py-2">
            {snps.map((snp, index) => (
              <span key={`${snp?.["Key SNPs"] ?? index}-result`} className="rounded-full bg-[#e9a0ad] px-3 py-1 text-center font-semibold text-[#850016]">
                {PLACEHOLDER_RESULT}
              </span>
            ))}
          </div>
        </div>

        <p className="border-t border-[#e6e2e9] px-2 py-2 text-center text-[11px] leading-relaxed text-[#25232a]">{explanation}</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-[14px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.10)]">
        <h3 className="bg-[#e9a0ad] px-4 py-3 text-center text-[14px] font-bold text-[#17151a]">Recommendation / Explanation</h3>
        <p className="px-5 py-4 text-center text-[11px] leading-relaxed text-[#850016]">{PLACEHOLDER_RECOMMENDATION}</p>
      </div>
    </article>
  );
};

export default GeneResultCard;
