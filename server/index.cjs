import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRoute } from "./routes/auth.js";
import twilio from "twilio";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = twilio(accountSid, authToken);
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", authRoute);
app.get("/", (req, res) => {
  res.send("hello, vercel");
});
app.post("/", (req, res) => {
  const { message, user: sender, type, members } = req.body;

  if (type === "message.new") {
    members
      .filter((member) => member.user_id !== sender.id)
      .forEach(({ user }) => {
        if (!user.online) {
          twilioClient.message
            .create({
              body: `You have a new message from ${message.user.fullName} - ${message.text}`,
              messagingServiceSid: messagingServiceSid,
              to: user.phoneNumber,
            })
            .then(() => console.log("Message sent!"))
            .catch((err) => console.log(err));
        }
      });

    return res.status(200).send("Message sent!");
  }

  return res.status(200).send("Not a new message request");
});

app.listen(PORT, () => console.log(`server is running at ${PORT}`));
