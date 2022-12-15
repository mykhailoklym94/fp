const { pipe } = require('./lib');
const { Discount, Product, OrderItem, Error } = require("../common/factories");
const { logger } = require("../common/logger");

const getItemTotalWithoutDiscount = (orderItem) => {
  if (!orderItem || !isFinite(orderItem.quantity) || !orderItem.product || !isFinite(orderItem.product.price)) {
    return Error({
      origin: "[getItemTotalWithoutDiscount]",
      key: "INVALID_PARAMS"
    })
  }

  return orderItem.quantity * orderItem.product.price;
};

const applyDiscount = (total, discount) => {
  if (!isFinite(total) || !discount || !isFinite(discount.percentage)) {
    return Error({
      origin: "[applyDiscount]",
      key: "INVALID_PARAMS"
    })
  }

  return Math.min(discount.maxAmount, total * discount.percentage);
};

const getTotal = (orderItem, discount) => pipe(
  orderItem,
  [
    getItemTotalWithoutDiscount,
    (total) => applyDiscount(total, discount)
  ]
);

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

  const total = getTotal(orderItem, discount);

  logger.info(`Successfully calculated total - ${total}`);
};

main();