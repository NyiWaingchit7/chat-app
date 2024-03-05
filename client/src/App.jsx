import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import ChannelListContainer from "./components/ChannelListContainer";
import ChannelContainer from "./components/ChannelContainer";
import Cookies from "universal-cookie";
import "./App.css";
import Auth from "./components/Auth";
const cookie = new Cookies();
const apiKey = "x43vye38rdyp";
const authToken = cookie.get("token");
const client = StreamChat.getInstance(apiKey);
if (authToken) {
  client.connectUser(
    {
      id: cookie.get("userId"),
      name: cookie.get("userName"),
      fullName: cookie.get("fullName"),
      image: cookie.get("avatarUrl"),
      password: cookie.get("hashedPassword"),
      phoneNumber: cookie.get("phoneNumber"),
    },
    authToken
  );
}
const App = () => {
  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
