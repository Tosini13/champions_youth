enum E_ROUNDS {
  "1/64_finals" = "1/64_finals",
  "1/32_finals" = "1/32_finals",
  "1/16_finals" = "1/16_finals",
  "Quarter_final" = "Quarter_final",
  "Semi_final" = "Semi_final",
  "Final" = "Final",
}

const checkIsPlayOff = (round: string) =>
  Boolean(Object.values(E_ROUNDS).find((r) => r === round));

const useTranslationHelp = () => {
  const translateRound = (round: string) => {
    let prefix = "";
    if (round.includes("1/16")) {
      prefix = "1/16";
      round = "_" + round.replace(prefix, "").trim();
    }
    if (round.includes("1/32")) {
      prefix = "1/32";
      round = "_" + round.replace(prefix, "").trim();
    }
    if (round.includes("1/64")) {
      prefix = "1/64";
      round = "_" + round.replace(prefix, "").trim();
    }

    const ROUND = prefix + round.replace(/\d/g, "").trim().replace("-", "_");

    return {
      round: ROUND,
      number: round.replace(/\D/g, "").trim(),
      isPlayOff: checkIsPlayOff(ROUND),
    };
  };
  return {
    translateRound: translateRound,
  };
};

export default useTranslationHelp;
