const STATUS_ORDER = ["red", "yellow", "green"];

const getRsIds = (value) => String(value ?? "").toLowerCase().match(/rs\d+/g) ?? [];

const getValueByPattern = (object, pattern) => {
  const key = Object.keys(object ?? {}).find((property) => pattern.test(property));
  return key ? object[key] : "";
};

export const getGeneticResultIndex = (result) => {
  const resultGroups = Array.isArray(result)
    ? result.slice(-1)
    : Array.isArray(result?.result)
      ? result.result.slice(-1)
      : result
        ? [result]
        : [];
  const index = new Map();

  resultGroups.flatMap((group) => group?.genetic ?? []).forEach((entry) => {
    const ids = new Set([...getRsIds(entry?.snpName), ...getRsIds(entry?.rsID)]);
    const genotype = `${entry?.allele1 ?? ""}${entry?.allele2 ?? ""}`;

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
    const expectedResultKey = Object.keys(rule ?? {}).find(
      (key) => /result/i.test(key) && !/display/i.test(key),
    );
    const expectedResult = expectedResultKey ? rule[expectedResultKey] : "";
    const expectedGenotypes = Array.isArray(expectedResult) ? expectedResult : [expectedResult];

    return expectedGenotypes.some((expectedGenotype) => String(expectedGenotype ?? "") === genotype);
  });
};

export const getSnpOutcome = (snp, geneticResultIndex) => {
  const rsId = getRsIds(snp?.["Key SNPs"])[0];
  const rawResult = rsId ? geneticResultIndex.get(rsId) : undefined;
  const genotype = rawResult?.genotype ?? "";
  const matchedRule = genotype ? getRuleForGenotype(snp, genotype) : undefined;
  const displayResult = matchedRule
    ? getValueByPattern(matchedRule.rule, /display result/i) || genotype
    : genotype;

  return {
    key: rsId ?? snp?.["Key SNPs"] ?? "unknown-snp",
    label: snp?.["Key SNPs"] ?? "—",
    genotype: displayResult || "—",
    status: matchedRule?.status ?? "unavailable",
    recommendation: matchedRule
      ? getValueByPattern(matchedRule.rule, /recommendation/i)
      : "No matching result or recommendation is available for this SNP.",
  };
};

export const getGeneOutcome = (snps, result, scoring) => {
  const resultIndex = getGeneticResultIndex(result);
  const outcomes = snps.map((snp) => getSnpOutcome(snp, resultIndex));
  const primarySnpId = getRsIds(scoring?.primarySNP ?? scoring?.primarySnp)[0];
  const primaryOutcome = primarySnpId
    ? outcomes.find((outcome) => outcome.key === primarySnpId)
    : undefined;

  if (primaryOutcome) {
    return {
      outcomes,
      status: primaryOutcome.status,
      recommendations: primaryOutcome.recommendation ? [primaryOutcome.recommendation] : [],
    };
  }

  const status = STATUS_ORDER.find((candidate) => outcomes.some((outcome) => outcome.status === candidate)) ?? "unavailable";
  const recommendations = [...new Set(outcomes.map((outcome) => outcome.recommendation).filter(Boolean))];

  return { outcomes, status, recommendations };
};
