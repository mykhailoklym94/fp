const { Product } = require("../../common/factories");
const { logger } = require("../../common/logger");
const { Redux } = require("./lib");
const assert = require("assert");

const main = () => {
  const productsReducer = (products = { list: [] }, action) => {
    switch (action.type) {
      case "CREATE_PRODUCT":
        return {
          ...products,
          list: products.list.concat(action.product)
        }
      case "UPDATE_PRODUCT": {
        return {
          ...products,
          list: products.list.map(product => product.id === action.product.id ? { ...product, ...action.product } : product)
        }
      }

      default:
        return { ...products };
    }
  }

  const rootReducer = (state = {}, action) => ({
    products: productsReducer(state.products, action)
  });

  const store = Redux.createStore(rootReducer);


  const macbook = {
    id: Math.floor(Math.random() * 1000),
    name: "MacBook Pro",
    price: 3000
  };

  store.dispatch({
    type: "CREATE_PRODUCT",
    product: macbook
  });

  const iphone = {
    id: Math.floor(Math.random() * 1000),
    name: "iPhone",
    price: 1500
  };

  store.dispatch({
    type: "CREATE_PRODUCT",
    product: iphone
  });

  logger.info(`Updated state for products `, JSON.stringify(store.getState().products, null, 2));

  store.dispatch({
    type: "UPDATE_PRODUCT",
    product: {
      id: iphone.id,
      price: 1000
    }
  });

  logger.info(`Updated iphone state `, JSON.stringify(store.getState().products.list[1], null, 2));
};


main()