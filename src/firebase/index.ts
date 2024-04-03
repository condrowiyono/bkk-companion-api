import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";

// copy this file
import firebaseCredential from "./firebaseCredential.json";

initializeApp({
  credential: admin.credential.cert(firebaseCredential as admin.ServiceAccount),
});
