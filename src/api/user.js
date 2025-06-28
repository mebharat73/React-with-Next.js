import config from "@/config/config";
import authToken from "@/constants/authToken";
import axios from "axios";

async function getUserById(id) {
  const token = authToken();
  const response = await axios.get(`${config.apiUrl}/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

// api/user.js or wherever your API helpers are
async function getAllUsers() {
  const token = authToken();
  const response = await axios.get(`${config.apiUrl}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}


async function uploadProfileImage(id, data) {
  const token = authToken();
  const response = await axios.put(
    `${config.apiUrl}/api/users/${id}/profile-image`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

async function updateUser(id, data) {
  const token = authToken();
  const response = await axios.put(`${config.apiUrl}/api/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export { uploadProfileImage, updateUser, getUserById, getAllUsers };
