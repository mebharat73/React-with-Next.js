// authToken.js
import { jwtDecode } from "jwt-decode";




export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}

export function setToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
}

export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
}

/**
 * Extract current user ID from stored JWT token.
 * Returns null if token is missing or invalid.
 */
export function getCurrentUserId() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    return decoded._id || decoded.id || decoded.sub || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

// Optional: default export for backward compatibility
export default getToken;
