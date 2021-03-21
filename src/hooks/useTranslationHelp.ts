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
    return {
      round: prefix + round.replace(/\d/g, "").trim().replace("-", "_"),
      number: round.replace(/\D/g, "").trim(),
    };
  };
  return {
    translateRound: translateRound,
  };
};

export default useTranslationHelp;
