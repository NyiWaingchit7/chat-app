import React from "react";
import { Channel, MessageTeam, useChatContext } from "stream-chat-react";
import CreateChannel from "./CreateChannel";
import EditChannel from "./EditChannel";

import ChannelInner from "./ChannelInner";

const ChannelContainer = ({
  createType,
  setCreateType,
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
}) => {
  const { channel } = useChatContext();
  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />;
      </div>
    );
  }
  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />;
      </div>
    );
  }
  const EmptyState = () => {
    return (
      <div className="channel-empty__container">
        <p className="channel-empty__first">
          This is the beginning of your chat history.
        </p>
        <p className="channel-empty__second">
          Send messages, attachements, links, emojis and more.
        </p>
      </div>
    );
  };
  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
