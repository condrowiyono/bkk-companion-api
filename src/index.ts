import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import "./database/instance";
import "./firebase/index";

import jwtMiddleware from "./middleware/jwt";

import projectRouter from "./routers/projectRouter";
import authRouter from "./routers/authRouter";
import profileRouter from "./routers/profileRouter";
import searchRouter from "./routers/searchRouter";
import purchaseOrderRouter from "./routers/purchaseOrderRouter";
import notificationRouter from "./routers/notificationRouter";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: "*", credentials: true }));

// Routers
app.get("/", (req: Request, res: Response) => {
  res.send("Simple Proxy Bukaka Companion");
});

// protected routes
app.get("/protected", jwtMiddleware, (req: Request, res: Response) => {
  res.json({ message: "Protected route" });
});

app.use(authRouter);
app.use(projectRouter);
app.use(profileRouter);
app.use(purchaseOrderRouter);
app.use(searchRouter);
app.use(notificationRouter);
app.use((_, res) => res.status(404).json({ message: "Not Found" }));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
