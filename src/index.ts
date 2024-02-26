import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import safeParseResponse from "./utils/safeParseJSON";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const baseURL = process.env.BASE_URL || "https://www.google.com";

app.get("/", (req: Request, res: Response) => {
  res.send("Simple Proxy Bukaka Companion");
});

app.get("/projects/:token/:id", async (req: Request, res: Response) => {
  const { token, id } = req.params;

  if (!token || !id) {
    res.status(400).json({ message: "Invalid token or id" });
    return;
  }

  const url = new URL(baseURL);
  url.pathname = `approvalmgt/public/index.php/proyek/proyekDaftarBelum/${token}/${id}`;

  const response = await fetch(url);
  console.warn("proxied to:", url.toString());

  try {
    res.json(await safeParseResponse(response));
  } catch (e) {
    res.status(response.status).json({ message: "Error fetching data" });
  }
});

app.get("/projects/detail/:token/:code", async (req: Request, res: Response) => {
  const { token, code } = req.params;

  if (!token || !code) {
    res.status(400).json({ message: "Invalid token or code" });
    return;
  }

  const url = new URL(baseURL);
  url.pathname = `approvalmgt/public/index.php/proyek/proyekDetail/${token}/${code}`;

  const response = await fetch(url);
  console.warn("proxying to:", url.toString());

  try {
    res.json(await safeParseResponse(response));
  } catch (e) {
    res.status(response.status).json({ message: "Error fetching data" });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
