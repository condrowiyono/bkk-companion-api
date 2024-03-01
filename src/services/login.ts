import dotenv from "dotenv";
import { ServerLoginResponse } from "../interfaces/login";

dotenv.config();

const baseURL = process.env.BASE_URL || "https://www.google.com";

const serverLogin = async (username: string, password: string) => {
  const body = new FormData();
  body.append("eUsername", username);
  body.append("ePassword", password);

  try {
    const url = new URL(baseURL);
    url.pathname = "approvalmgt/public/index.php/umum/login";

    const response = await fetch(url, { method: "POST", body });
    console.warn("proxied to:", url.toString());

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const data = (await response.json()) as ServerLoginResponse;

    console.log(data);

    if (data[0].statuss === 1) {
      return data;
    } else {
      throw new Error(data[0].pesan);
    }
  } catch (e) {
    throw new Error("Error fetching data");
  }
};

export { serverLogin };
