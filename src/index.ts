import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import jwtMiddleware from "./middleware/jwt";

import projectRouter from "./routers/projectRouter";
import authRouter from "./routers/authRouter";
import profileRouter from "./routers/profileRouter";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const baseURL = process.env.BASE_URL || "https://www.google.com";

app.use(bodyParser.json());
app.use(cors({ origin: "*", credentials: true }));

// Routers
app.get("/", (req: Request, res: Response) => {
  res.send("Simple Proxy Bukaka Companion");
});

app.use(authRouter);
app.use(projectRouter);
app.use(profileRouter);

// protected routes
app.get("/protected", jwtMiddleware, (req: Request, res: Response) => {
  res.json({ message: "Protected route" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
