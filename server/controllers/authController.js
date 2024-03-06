import crypto from "crypto";
import { connect } from "getstream";
import bcrypt from "bcrypt";
import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config();
const api_key = process.env.STREAM_API_KEY;
const app_id = process.env.STREAM_APP_ID;
const api_secret = process.env.STREAM_API_SECRET;
export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, phoneNumber, avatarUrl } = req.body;
    const userId = crypto.randomBytes(16).toString("hex");
    const serverClient = connect(api_key, api_secret, app_id);
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createUserToken(userId);
    return res
      .status(200)
      .json({
        token,
        fullName,
        userName,
        userId,
        hashedPassword,
        phoneNumber,
        avatarUrl,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const serverClient = connect(api_key, api_secret, app_id);

    const client = StreamChat.getInstance(api_key, api_secret);
    const { users } = await client.queryUsers({ name: userName });
    const fullName = users[0].fullName;
    const phoneNumber = users[0].phoneNumber;
    const avatarUrl = users[0].image;

    const hashedPassword = users[0].hashedPassword;
    console.log(fullName, phoneNumber, hashedPassword);

    if (!users.length)
      return res.status(400).json({ message: "User Not Found" });
    const isCorrectPassword = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );
    const token = serverClient.createUserToken(users[0].id);
    if (isCorrectPassword) {
      return res.status(200).json({
        fullName,
        userName,
        token,
        userId: users[0].id,
        hashedPassword,
        phoneNumber,
        avatarUrl,
      });
    } else {
      return res.status(400).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
