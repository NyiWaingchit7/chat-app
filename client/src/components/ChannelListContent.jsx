import React from "react";

import ChannelSearch from "./ChannelSearch";
import { ChannelList, useChatContext } from "stream-chat-react";
import TeamChannelList from "./TeamChannelList";
import TeamChannelPreview from "./TeamChannelPreview";
import SideBar from "./SideBar";

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const CompanyHeader = () => {
  return (
    <div className="channel-list__header">
      <p className="channel-list__header__text"> Medical Pager</p>
    </div>
  );
};
const ChannelListContent = ({
  createType,
  setCreateType,
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  setToggle,
}) => {
  const { client } = useChatContext();
  return (
    <>
      <SideBar />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{ members: { $in: [client.userID] } }}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listPorps) => (
            <TeamChannelList
              {...listPorps}
              type="team"
              createType={createType}
              setCreateType={setCreateType}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setToggle={setToggle}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              createType={createType}
              setCreateType={setCreateType}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setToggle={setToggle}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={{ members: { $in: [client.userID] } }}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listPorps) => (
            <TeamChannelList
              {...listPorps}
              type="messaging"
              createType={createType}
              setCreateType={setCreateType}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setToggle={setToggle}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              createType={createType}
              setCreateType={setCreateType}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setToggle={setToggle}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};

export default ChannelListContent;
