const { Discount, Product, OrderItem, Error } = require("../../common/factories");
const { logger } = require("../../common/logger");

const { Either, Left, Right } = require("./lib")

const getItemTotalWithoutDiscount = (orderItem) => {
  logger.debug('[getItemTotalWithoutDiscount] Invoked');

  if (!orderItem || !isFinite(orderItem.quantity) || !orderItem.product || !isFinite(orderItem.product.price)) {
    return Left(Error({
      origin: "[getItemTotalWithoutDiscount]",
      key: "INVALID_PARAMS"
    }))
  }

  return Right(orderItem.quantity * orderItem.product.price)
};

const applyDiscount = (total, discount) => {
  logger.debug('[applyDiscount] Invoked');

  if (!isFinite(total) || !discount || !isFinite(discount.percentage)) {
    return Left(Error({
      origin: "[applyDiscount]",
      key: "INVALID_PARAMS"
    }))
  }

  return Right(Math.min(discount.maxAmount, total * discount.percentage));
};

const calculateTotal = (orderItem, discount) => {
  logger.debug('[calculateTotal] Invoked');

  return Either(orderItem)
    .flatMap(getItemTotalWithoutDiscount)
    .flatMap((totalAmountWithDiscount) => applyDiscount(totalAmountWithDiscount, discount))
    .fold((error, result) => {
      if (error) {
        logger.error(`[monads][either] Failed to calculate discount - ${JSON.stringify(error, null, 4)}`)
        return error;
      }

      logger.info(`[monads][either] Successfully calculated discount - ${result}`)
      return result
    })
}

const main = () => {
  const orderItem = OrderItem({
    quantity: 2,
    product: Product({
      name: "MacBook Pro",
      price: 150000
    })
  });

  const discount = Discount({
    percentage: 0.1,
    maxAmount: 2000
  });

  logger.debug('First run')
  calculateTotal(orderItem, discount);

  logger.debug('__________')

  logger.debug('Second run')
  calculateTotal(null, null);
}

main();




