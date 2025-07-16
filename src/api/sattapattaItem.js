// src/api/sattapattaItem.js
import config from "@/config/config";
import authToken from "@/constants/authToken";
import axios from "axios";
import getToken from "@/constants/authToken";


// Function to create a new Sattapatta item
export async function createSattapattaItem(formData) {
  const token = authToken(); // ✅ call the function to get the string

  const response = await axios.post(`${config.apiUrl}/api/sattapatta-items`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}


// Function to get all Sattapatta items
async function getAllSattapattaItems() {
  const response = await axios.get(`${config.apiUrl}/api/sattapatta-items`);
  return response.data;
}

// Function to get a Sattapatta item by ID
async function getSattapattaItemById(id) {
  const response = await axios.get(`${config.apiUrl}/api/sattapatta-items/${id}`);
  return response.data;
}

// Function to update a Sattapatta item
async function updateSattapattaItem(id, data) {
  const response = await axios.put(`${config.apiUrl}/api/sattapatta-items/${id}`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
}

// Function to delete a Sattapatta item
// Function to delete a Sattapatta item
async function deleteSattapattaItem(id) {
  const token = getToken(); // ✅

  if (!token) {
    throw new Error('No auth token found. User might not be logged in.');
  }

  try {
    const response = await axios.delete(`${config.apiUrl}/api/sattapatta-items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to delete item. Please try again.');
  }
}

// Function to get items by owner
async function getItemsByOwner() {
  const response = await axios.get(`${config.apiUrl}/api/sattapatta-items/my-items`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
}

export {
  getAllSattapattaItems,
  getSattapattaItemById,
  updateSattapattaItem,
  deleteSattapattaItem,
  getItemsByOwner,
};
