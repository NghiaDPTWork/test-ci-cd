const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);

if (!API_URL)
  throw new Error("API_URL is not defined \n" + "Please check .env file");

export const env = {
  API_URL,
} as const;
