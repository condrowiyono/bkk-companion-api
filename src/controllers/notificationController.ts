import { Request, Response } from "express";
import { User, Notification } from "../database/instance";
import { decodeJwt } from "../utils/decode-jwt";
import { getMessaging } from "firebase-admin/messaging";
import basicAuth from "basic-auth";

const registerDevice = async (req: Request, res: Response) => {
  const payload = req.body;
  const { fcm_token, employe_id } = payload;
  const [user] = await User.upsert({ fcm_token, employe_id });

  res.json({ message: "success", data: user });
};

const sendNotification = async (req: Request, res: Response) => {
  const acceptedUsername = "bukaka";
  const acceptedPassword = "app";
  const credentials = basicAuth(req);

  if (!credentials || credentials.name !== acceptedUsername || credentials.pass !== acceptedPassword) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const payload = req.body;
  const { title, body, employe_id, screen = "", task_id = "" } = payload;

  const user = await User.findOne({ where: { employe_id } });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  // Send notification to fcm_token
  const messaging = getMessaging();

  await messaging.send({
    notification: {
      title,
      body,
    },
    data: {
      screen,
      task_id,
    },
    token: user.get("fcm_token") as string,
  });

  // and then save to database
  const data = await Notification.create({
    fcm_token: user.get("fcm_token"),
    employe_id,
    title,
    body,
    screen,
    task_id,
  });

  res.json({ message: "success", data });
};

const getNotifications = async (req: Request, res: Response) => {
  const employe_id = decodeJwt(req)?.employe_id;

  if (!employe_id) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  const notifications = await Notification.findAll({
    where: { employe_id },
    order: [["createdAt", "DESC"]],
  });

  res.json({ message: "success", data: notifications });
};

export { registerDevice, sendNotification, getNotifications };
