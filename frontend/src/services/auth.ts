import { api } from "./api";

export type AuthUser = {
  id?: number;
  username: string;
  email: string;
  role: string;
};

const ACCESS_TOKEN_KEY = "access_token";
const USER_KEY = "user";
const ROLE_KEY = "role";

export function getStoredToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function getStoredRole() {
  return localStorage.getItem(ROLE_KEY);
}

export function saveAuthData(token: string, user: AuthUser) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(ROLE_KEY, user.role || "user");
}

export function clearAuthData() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export async function login(username: string, password: string) {
  const response = await api.post("/auth/login", { username, password });
  const token = response.data.access_token;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  const profileResponse = await api.get("/auth/me");
  saveAuthData(token, profileResponse.data as AuthUser);
  return profileResponse.data as AuthUser;
}

export async function register(userData: {
  username: string;
  email: string;
  password: string;
  role: string;
}) {
  await api.post("/auth/register", userData);
  return login(userData.username, userData.password);
}

export async function fetchCurrentUser() {
  const response = await api.get("/auth/me");
  const user = response.data as AuthUser;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(ROLE_KEY, user.role || "user");
  return user;
}
