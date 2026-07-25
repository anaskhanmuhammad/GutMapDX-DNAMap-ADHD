const STATUS_ORDER = ["red", "yellow", "green"];

const normaliseGenotype = (value) => {
  if (value === null || value === undefined) return "";

  const text = String(value).toUpperCase().trim();
  const pairedAlleles = text.match(/([A-Z-])\s*[/|]?\s*([A-Z-])/);

  if (!pairedAlleles) return "";
  return [pairedAlleles[1], pairedAlleles[2]].sort().join("");
};

const getRsIds = (value) => String(value ?? "").toLowerCase().match(/rs\d+/g) ?? [];

const getValueByPattern = (object, pattern) => {
  const key = Object.keys(object ?? {}).find((property) => pattern.test(property));
  return key ? object[key] : "";
};

export const getGeneticResultIndex = (result) => {
  const resultGroups = Array.isArray(result)
    ? result
    : Array.isArray(result?.result)
      ? result.result
      : result
        ? [result]
        : [];
  const index = new Map();

  resultGroups.flatMap((group) => group?.genetic ?? []).forEach((entry) => {
    const ids = new Set([...getRsIds(entry?.snpName), ...getRsIds(entry?.rsID)]);
    const genotype = normaliseGenotype(`${entry?.allele1 ?? ""}${entry?.allele2 ?? ""}`);

    ids.forEach((id) => {
      if (!index.has(id)) index.set(id, { ...entry, genotype });
    });
  });

  return index;
};

const getRuleForGenotype = (snp, genotype) => {
  const ruleSets = [
    { status: "red", rule: snp?.isRed },
    { status: "yellow", rule: snp?.isYellow ?? snp?.isAmber },
    { status: "green", rule: snp?.isGreen },
  ];

  return ruleSets.find(({ rule }) => {
    const expectedResult = getValueByPattern(rule, /result/i);
    return normaliseGenotype(expectedResult) === genotype;
  });
};

export const getSnpOutcome = (snp, geneticResultIndex) => {
  const rsId = getRsIds(snp?.["Key SNPs"])[0];
  const rawResult = rsId ? geneticResultIndex.get(rsId) : undefined;
  const genotype = rawResult?.genotype ?? "";
  const matchedRule = genotype ? getRuleForGenotype(snp, genotype) : undefined;

  return {
    key: rsId ?? snp?.["Key SNPs"] ?? "unknown-snp",
    label: snp?.["Key SNPs"] ?? "—",
    genotype: genotype || "—",
    status: matchedRule?.status ?? "unavailable",
    recommendation: matchedRule
      ? getValueByPattern(matchedRule.rule, /recommendation/i)
      : "No matching result or recommendation is available for this SNP.",
  };
};

export const getGeneOutcome = (snps, result) => {
  const resultIndex = getGeneticResultIndex(result);
  const outcomes = snps.map((snp) => getSnpOutcome(snp, resultIndex));
  const status = STATUS_ORDER.find((candidate) => outcomes.some((outcome) => outcome.status === candidate)) ?? "unavailable";
  const recommendations = [...new Set(outcomes.map((outcome) => outcome.recommendation).filter(Boolean))];

  return { outcomes, status, recommendations };
};
