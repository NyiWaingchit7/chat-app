import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { CloseCreateChannel } from "../asset";
import UserList from "./UserList";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={(e) => {
          e.preventDefault();
          setChannelName(e.target.value);
        }}
        placeholder="channel-name"
      />
      <p>Add Members</p>
    </div>
  );
};
const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [channelName, setChannelName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const handleCreateChannel = async (e) => {
    e.preventDefault();
    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });
      await newChannel.watch();
      setChannelName("");
      setIsCreating(false);
      setActiveChannel(newChannel);
      setSelectedUsers(client.userID);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>
          {createType === "team"
            ? "Create a new Channel"
            : "Send Direct Message"}{" "}
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <div
        className="create-channel__button-wrapper"
        onClick={handleCreateChannel}
      >
        <p>
          {createType === "team" ? "Create Channel" : "Create Message Group"}
        </p>
      </div>
    </div>
  );
};

export default CreateChannel;
