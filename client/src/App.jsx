import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import ChannelListContainer from "./components/ChannelListContainer";
import ChannelContainer from "./components/ChannelContainer";
import Cookies from "universal-cookie";
import "stream-chat-react/dist/css/index.css";
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
      hashedPassword: cookie.get("hashedPassword"),
      phoneNumber: cookie.get("phoneNumber"),
    },
    authToken
  );
}
const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          createType={createType}
          setCreateType={setCreateType}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          createType={createType}
          setCreateType={setCreateType}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </Chat>
    </div>
  );
};

export default App;
