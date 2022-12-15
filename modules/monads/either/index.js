const { pipe, curry, map } = require("rambda");
const { Either } = require("./lib")

const Discount = ({ percentage, maxAmount }) => ({
  percentage,
  maxAmount
})

const Product = ({ name, price }) => ({
  name,
  price
})

const OrderItem = ({ quantity, product }) => ({
  quantity,
  product
});

const getItemTotalWithoutDiscount = (orderItem) => {
  if (!orderItem.quantity || !orderItem.product?.price) {
    throw new Error("[getItemTotalWithoutDiscount] Invalid params");
  }

  return orderItem.quantity * orderItem.product.price
};

const applyDiscount = (total, discount) => {
  if (!isFinite(total) || !discount) {
    throw new Error("[getItemTotalWithoutDiscount] Invalid params");
  }

  return Math.min(discount.maxAmount, total * discount.percentage);
};

const calculateTotal = (orderItem, discount) => {
  return Either(orderItem)
    .map(getItemTotalWithoutDiscount)
    .map((totalAmountWithDiscount) => applyDiscount(totalAmountWithDiscount, discount))
    .fold((error, result) => {
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

  const totalWithDiscount = calculateTotal(orderItem, discount)
  console.log("🚀 ~ file: index.js:37 ~ main ~ totalWithoutDiscount", totalWithDiscount)
}

main();




