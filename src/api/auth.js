import api from "./api";

// POST /api/auth/login
async function login({ email, password }) {
  const response = await api.post(`/auth/login`, {  // <-- remove /api
    email,
    password,
  });
  return response;
}

async function signup({ name, email, password, confirmPassword, phone, address }) {
  const response = await api.post(`/auth/register`, {  // <-- remove /api
    name,
    email,
    password,
    confirmPassword,
    phone,
    address,
  });
  return response;
}


export { login, signup };
