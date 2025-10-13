//require('dotenv').config({path: "./env"})
import dotenv from "dotenv";
import { app } from "./app.js";
import { db } from "./db/db.js";


dotenv.config({
  path: "./.env",
});

db.client.connect().then(() => {
  console.log(`MongoDB connected successfully!`);
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
}).catch((err) => {
  console.error(err.message)
})