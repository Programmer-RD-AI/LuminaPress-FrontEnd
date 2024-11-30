import { apiHeader, baseUrl } from "../../config/apiConfig";

export const loginUser = async (email, password) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...apiHeader },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data.userId;
};
