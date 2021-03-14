const useTranslationHelp = () => {
  const translateRound = (round: string) => {
    return {
      round: round.replace(/\d/g, "").trim().replace("-", "_"),
      number: round.replace(/\D/g, "").trim(),
    };
  };
  return {
    translateRound: translateRound,
  };
};

export default useTranslationHelp;
