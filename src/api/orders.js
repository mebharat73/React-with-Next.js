import config from "@/config/config";
import authToken from "@/constants/authToken";
import axios from "axios";

async function createOrder(data) {
  const response = await axios.post(`${config.apiUrl}/api/orders`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
}

async function getOrders() {
  const response = await axios.get(`${config.apiUrl}/api/orders`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
}

async function getOrdersByUser(status, userId) {
  const response = await axios.get(
    `${config.apiUrl}/api/orders/users/${userId}?status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response.data;
}

async function checkoutOrder(id, data) {
  const response = await axios.put(
    `${config.apiUrl}/api/orders/${id}/checkout`,
    data,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response.data;
}

async function confirmOrder(id, status) {
  const response = await axios.put(
    `${config.apiUrl}/api/orders/${id}/confirm?status=${status}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response.data;
}

async function updateStatus(id, data) {
  const response = await axios.put(
    `${config.apiUrl}/api/orders/${id}/status`,
    data,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response.data;
}

export {
  checkoutOrder,
  confirmOrder,
  createOrder,
  getOrders,
  getOrdersByUser,
  updateStatus,
};
