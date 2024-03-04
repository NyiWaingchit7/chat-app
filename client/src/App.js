import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import ChannelListContainer from "./components/ChannelListContainer";
import ChannelContainer from "./components/ChannelContainer";

import "./App.css";
import Auth from "./components/Auth";
const apiKey = "x43vye38rdyp";
const client = StreamChat.getInstance(apiKey);
const authToken = false;
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
