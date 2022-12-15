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

const Error = ({ key, message, origin }) => ({
  type: "error",
  origin,
  key,
  message
})

module.exports = {
  Discount,
  Product,
  OrderItem,
  Error
}