import api from "./api";

// POST /api/auth/login
async function login({ email, password }) {
  const response = await api.post(`/api/auth/login`, {
    email,
    password,
  });

  return response;
}

async function signup({ name, email, password, confirmPassword }) {
  const response = await api.post(`/api/auth/register`, {
    name,
    email,
    password,
    confirmPassword,
  });

  return response;
}

export { login, signup };
