export const ORDER_PENDING = "PENDING";
export const ORDER_CONFIRMED = "CONFIRMED";
export const ORDER_SHIPPED = "SHIPPED";
export const ORDER_DELIVERED = "DELIVERED";

export const orderStatus = [
  {
    label: ORDER_PENDING,
    value: ORDER_PENDING,
    disabled: true,
  },
  {
    label: ORDER_CONFIRMED,
    value: ORDER_CONFIRMED,
    disabled: true,
  },
  {
    label: ORDER_SHIPPED,
    value: ORDER_SHIPPED,
    disabled: false,
  },
  {
    label: ORDER_DELIVERED,
    value: ORDER_DELIVERED,
    disabled: false,
  },
];
