import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp: number;
  [key: string]: any;
};

const getToken = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    return token;
  }
  if (!token) {
    return null;
  }
};

const decodeToken = (): DecodedToken | null => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    try {
      const decodeData: DecodedToken = jwtDecode<DecodedToken>(token);
      const isExpired = decodeData.exp * 1000 < Date.now();

      if (isExpired) {
        localStorage.removeItem("token");
        return null;
      } else {
        return decodeData;
      }
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  }

  return null;
};

const isToken = () => {
  // const token =  localStorage.getItem("token");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    return true;
  } else {
    return false;
  }
};

const removeToken = () => {
  localStorage.removeItem("token");
};

export { getToken, isToken, removeToken, decodeToken };
