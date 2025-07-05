
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

async function getActiveExchangeItemIds() {
  const response = await api.get('/exchange-offers/active-items');
  return response.data; // This will be an array of item IDs
}


// Update exchange offer
async function updateExchangeOffer(id, data) {
  const response = await api.put(`${BASE_URL}/${id}`, data);
  return response.data;
}

// Delete exchange offer


async function deleteExchangeOffer(offerId) {
  const response = await api.delete(`/exchange-offers/${offerId}`);
  return response.data; // or simply `return response;` if no data is returned
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
  getActiveExchangeItemIds,
};
