enum E_ROUNDS {
  "1/64_finals" = "1/64_finals",
  "1/32_finals" = "1/32_finals",
  "1/16_finals" = "1/16_finals",
  "Quarter_final" = "Quarter_final",
  "Semi_final" = "Semi_final",
  "Final" = "Final",
}

const checkIsPlayOff = (round: string) =>
  Boolean(Object.values(E_ROUNDS).find((r) => round.includes(r)));

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

    const ROUND = round.includes("place")
      ? "place"
      : prefix + round.replace(/\d/g, "").trim().replace("-", "_");
    const roundLetter = ROUND.split(" ");
    return {
      round: roundLetter.length > 1 ? roundLetter[0] : ROUND,
      number: round.replace(/\D/g, "").trim(),
      isPlayOff: checkIsPlayOff(ROUND) || round.includes("place"),
      isPlace: round.includes("place"),
      roundLetter:
        roundLetter.length > 1 ? roundLetter[roundLetter.length - 1] : "",
    };
  };

  return {
    translateRound: translateRound,
  };
};

export default useTranslationHelp;
