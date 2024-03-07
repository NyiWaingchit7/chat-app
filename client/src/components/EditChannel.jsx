import React, { useState } from "react";
import { CloseCreateChannel } from "../asset";
import { useChatContext } from "stream-chat-react";
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
const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleUpdateChannel = async (e) => {
    e.preventDefault();
    const isNameChanged =
      channelName !== (channel?.data?.name || channel?.data?.id);
    if (channelName) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` }
      );
    }
    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }
    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
  };
  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div
        className="edit-channel__button-wrapper"
        onClick={handleUpdateChannel}
      >
        <p>Save Changes</p>
      </div>
    </div>
  );
};

export default EditChannel;
