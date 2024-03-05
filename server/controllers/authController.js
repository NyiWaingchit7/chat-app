import crypto from "crypto";
import { connect } from "getstream";
import bcrypt from "bcrypt";
import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.STEAM_API_KEY;
const appId = process.env.STEAM_APP_ID;
const apiSecret = process.env.STREAM_API_SECRET;
export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, phoneNumber } = req.body;
    const userId = crypto.randomBytes(16).toString("hex");
    const serverClient = connect(apiKey, apiSecret, appId);
    const hashedPassword = bcrypt.hash(password, 10);
    const token = serverClient.createUserToken(userId);
    return res
      .status(200)
      .json({ token, fullName, userName, userId, hashedPassword, phoneNumber });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
export const login = async (req, res) => {
  try {
    const { fullName, password } = req.body;
    const serverClient = connect(apiKey, apiSecret, appId);
    const client = StreamChat.getInstance(apiKey, apiSecret);
    const { user } = client.queryUsers({ name: fullName });
    if (!user) return res.status(400).json({ message: "User Not Found" });
    const isCorrectPassword = await bcrypt.compare(
      password,
      user[0].hashedPassword
    );
    const token = serverClient.createUserToken(user[0].id);
    if (isCorrectPassword) {
      return res.status(200).json({
        fullName: user[0].fullName,
        userName,
        token,
        userId: user[0].id,
      });
    } else {
      return res.status(400).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
