import { COOKIE_TOKEN_NAME, generateToken, verifyToken } from "@/lib/jwt";
import Cookies from "universal-cookie";
export const cookies = new Cookies(null, { path: "/" });

export interface UserSession {
  id: string;
  email: string;
  name: string;
  token?: string;
}

export const saveUserSession = async (userData: UserSession) => {
  const { id, email, name } = userData;

  const token = await generateToken({ id, email, name });
  // Set expiration to 1 week
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  // Set values in cookies with expiration
  if (id) cookies.set("id", id, { expires: expirationDate });
  if (email) cookies.set("email", email, { expires: expirationDate });
  if (name) cookies.set("name", name, { expires: expirationDate });
  if (token)
    cookies.set(COOKIE_TOKEN_NAME, { token }, { expires: expirationDate });
};

export async function getSession(): Promise<UserSession | null> {
  const session = cookies.get(COOKIE_TOKEN_NAME);
  if (!session?.token) {
    return null;
  }

  const isValid = await verifyToken(session.token);
  if (!isValid) {
    return null;
  }

  return {
    id: cookies.get("id"),
    email: cookies.get("email"),
    name: cookies.get("name"),
    token: session.token,
  };
}

export async function clearSession() {
  cookies.remove(COOKIE_TOKEN_NAME, { path: "/" });
  cookies.remove("id", { path: "/" });
  cookies.remove("email", { path: "/" });
  cookies.remove("name", { path: "/" });
}
