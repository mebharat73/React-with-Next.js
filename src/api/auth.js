import api from "./api";

// POST /auth/login
async function login({ email, password }) {
  const response = await api.post(`/auth/login`, {
    email,
    password,
  });
  return response;
}

async function signup({ name, email, password, confirmPassword, phone, address }) {
  const response = await api.post(`/auth/register`, {
    name,
    email,
    password,
    confirmPassword,
    phone,
    address,
  });
  return response;
}

// ✅ Removed `: string`
async function forgotPassword(email) {
  const response = await api.post(`/auth/forgot-password`, { email });
  return response.data;
}

// ✅ Removed TypeScript `interface`
async function resetPassword({ userId, token, password, confirmPassword }) {
  const response = await api.post(
    `/auth/reset-password/${userId}?token=${token}`,
    {
      password,
      confirmPassword,
    }
  );
  return response.data;
}

export { login, signup, forgotPassword, resetPassword };
