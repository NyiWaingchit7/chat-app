import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRoute } from "./routes/auth.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", authRoute);
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => console.log(`server is running at ${PORT}`));
