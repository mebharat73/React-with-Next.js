import config from "@/config/config";
import authToken from "@/constants/authToken";
import axios from "axios";

async function getUserById(id) {
  const response = await axios.get(`${config.apiUrl}/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
}

async function uploadProfileImage(id, data) {
  const response = await axios.put(
    `${config.apiUrl}/api/users/${id}/profile-image`,
    data,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response.data;
}

async function updateUser(id, data) {
  const response = await axios.put(`${config.apiUrl}/api/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
}

export { uploadProfileImage, updateUser, getUserById };
