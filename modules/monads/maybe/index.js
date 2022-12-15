const { add, curry } = require("rambda");

const { logger } = require("../../common/logger");
const { Maybe } = require("./lib")

const increment = curry(add)(1);
const randomize = number => Math.floor(number * Math.random())

const main = () => {
  const FALLBACK_PAGE = 1

  const randomPage = (max) =>
    Maybe(max)
      .filter(number => number > 0)
      .map(increment)
      .map(randomize)
      .getOr(FALLBACK_PAGE)


  logger.info(`Get random page for a book of 300 pages ${randomPage(300)}`);

  logger.info(`Get random page for a book of -300 pages ${randomPage(-300)}`);
}

main();




