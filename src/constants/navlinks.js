const {
  HOME_ROUTE,
  PRODUCTS_ROUTE,
  PRODUCTS_CART_ROUTE,
  ORDERS_ROUTE,
} = require("./routes");

const navLinks = [
  {
    label: "Home",
    route: HOME_ROUTE,
    isAuth: false,
    notification: false,
  },
  {
    label: "Products",
    route: PRODUCTS_ROUTE,
    isAuth: false,
    notification: false,
  },
  {
    label: "Cart",
    route: PRODUCTS_CART_ROUTE,
    isAuth: false,
    notification: true,
  },
  {
    label: "Orders",
    route: ORDERS_ROUTE,
    isAuth: true,
    notification: false,
  },
];

export default navLinks;
