import { formatSearchParams } from "@/helpers/formatParams";
import api from "./api";
import authToken from "@/constants/authToken";

async function getAllProducts(searchParams) {
  const query = formatSearchParams(searchParams);

  const response = await api.get(`/api/products?${query}`);

  return response.data;
}

// baseUrl/api/products/:id
async function getProductById(id) {
  const response = await api.get(`/api/products/${id}`);

  return response.data;
}

async function addProduct(data) {
  const response = await api.post(`/api/products`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
}

async function editProduct(id, data) {
  const response = await api.put(`/api/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
}

async function getProductsByCategory(category) {
  const response = await api.get(`/api/products/category/${category}`);

  return response.data;
}

async function getProductsByBrand(brand) {
  const response = await api.get(`/api/products/brand/${brand}`);

  return response.data;
}

async function getBrands() {
  const response = await api.get(`/api/products/brands`);

  return response.data;
}

async function getCategories() {
  const response = await api.get(`/api/products/categories`);

  return response.data;
}

async function deleteProduct(id) {
  const response = await api.delete(`/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
}

export {
  getAllProducts,
  getProductById,
  addProduct,
  editProduct,
  getProductsByCategory,
  getProductsByBrand,
  getBrands,
  getCategories,
  deleteProduct,
};

/**
 * HTTP Methods
 * 1. GET - Read
 * 2. POST - Create
 * 3. PUT - Update
 * 4. DELETE - Delete
 */
