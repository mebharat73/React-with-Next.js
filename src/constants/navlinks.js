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
  },
  {
    label: "Products",
    route: PRODUCTS_ROUTE,
    isAuth: false,
  },
  {
    label: "Cart",
    route: PRODUCTS_CART_ROUTE,
    isAuth: false,
  },
  {
    label: "Orders",
    route: ORDERS_ROUTE,
    isAuth: true,
  },
];

export default navLinks;
