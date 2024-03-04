import dotenv from "dotenv";
import { ServerLoginResponse } from "../interfaces/auth";
import querystring from "querystring";

dotenv.config();

const baseURL = process.env.BASE_URL || "https://www.google.com";

const serverLogin = async (username: string, password: string) => {
  const body = querystring.stringify({
    eUsername: username,
    ePassword: password,
  });

  console.log(body);

  try {
    const url = new URL(baseURL);
    url.pathname = "approvalmgt/public/index.php/umum/login";

    const response = await fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.warn("proxied to:", url.toString());

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const data = (await response.json()) as ServerLoginResponse;

    if (data[0].statuss === 1) {
      return data[0];
    } else {
      throw new Error(data[0].pesan);
    }
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching data");
  }
};

export { serverLogin };
