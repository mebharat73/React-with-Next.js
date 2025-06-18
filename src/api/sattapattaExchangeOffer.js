
import authToken from "@/constants/authToken";
import axios from "axios";

import config from "@/config/config";
import api from "./api"; // <-- Use your custom axios instance

const BASE_URL = `/exchange-offers`; // baseURL is already set in api.js

// Create a new exchange offer
async function createExchangeOffer(data) {
  const response = await api.post(`${BASE_URL}`, data);
  return response.data;
}

// Accept an exchange offer
async function acceptExchangeOffer(id) {
  const response = await api.post(`${BASE_URL}/${id}/accept`);
  return response.data;
}

// Get all exchange offers
async function getAllExchangeOffers() {
  const response = await api.get(`${BASE_URL}`);
  return response.data;
}

// Get received offers
async function getReceivedOffers() {
  const response = await api.get(`${BASE_URL}/received`);
  return response.data;
}

// Get offer by ID
async function getExchangeOfferById(id) {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
}

// Update exchange offer
async function updateExchangeOffer(id, data) {
  const response = await api.put(`${BASE_URL}/${id}`, data);
  return response.data;
}

// Delete exchange offer
async function deleteExchangeOffer(id) {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
}

// Reject exchange offer
async function rejectExchangeOffer(id) {
  const response = await api.post(`${BASE_URL}/${id}/reject`);
  return response.data;
}

export {
  createExchangeOffer,
  getAllExchangeOffers,
  getExchangeOfferById,
  updateExchangeOffer,
  deleteExchangeOffer,
  acceptExchangeOffer,
  rejectExchangeOffer,
  getReceivedOffers,
  // If these exist:
  getOffersByOfferedBy,
  getOffersByItem,
};
