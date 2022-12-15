const { Product } = require("../../common/factories");
const { logger } = require("../../common/logger");
const { jest } = require("./lib");
const assert = require("assert");


const main = () => {
  const ProductMock = jest.fn(Product);

  const __product = ProductMock({
    name: "MacBook Pro",
    price: 3000
  });

  logger.info('Called jest.fn, here is the functions\' state ', JSON.stringify(ProductMock.state, null, 4));

  assert(ProductMock.state.args.length === 1);
  assert(ProductMock.state.args[0][0].name === "MacBook Pro");
  assert(ProductMock.state.args[0][0].price === 3000);

  assert(ProductMock.state.results.length === 1);

  assert(ProductMock.state.results[0].type === "return");
  assert(ProductMock.state.results[0].value.name === "MacBook Pro");
  assert(ProductMock.state.results[0].value.price === 3000);
  assert(isFinite(ProductMock.state.results[0].value.id));

  logger.info('✅ jAll tests are passing');
};

main();