import dotenv from "dotenv";

import safeParseResponse from "./safeParseResponse";

dotenv.config();
const baseURL = process.env.BASE_URL || "https://www.google.com";

const safeFetch = async <T = unknown>(pathname: string, init?: RequestInit) => {
  try {
    const url = new URL(baseURL);
    url.pathname = pathname;

    const fetchPromise = await fetch(url, init);

    const response = {
      status: fetchPromise.status,
      message: fetchPromise.statusText,
      data: await safeParseResponse<T>(fetchPromise),
    };

    return response;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error fetching data";
    return {
      status: 500,
      message,
      data: null,
    };
  }
};

export default safeFetch;
