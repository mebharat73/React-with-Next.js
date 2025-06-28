// src/api/contactApi.js

import config from '@/config/config'; // your config should have `apiUrl` defined
import axios from 'axios';

export async function submitContactForm(data) {
  const response = await axios.post(`${config.apiUrl}/api/contact`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}
