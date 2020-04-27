const Player = (name, symbol) => {
  let score = 0;
  let myName = name;

  const getName = () => myName;
  const setName = (name) => {
    myName = name;
  };
  const getSymbol = () => symbol;

  const getScore = () => score;
  const addScore = () => {
    score += 1;
  };

  return {
    getName,
    setName,
    getSymbol,
    getScore,
    addScore,
  };
};
// eslint-disable-next-line import/prefer-default-export
export { Player as default };