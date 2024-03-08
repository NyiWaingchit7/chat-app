import React, { useEffect, useState } from "react";
import { SearchIcon } from "../asset";
import { useChatContext } from "stream-chat-react";
import ResultSearch from "./ResultSearch";
const ChannelSearch = ({ setToggle }) => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamChannel, setTeamChannel] = useState([]);
  const [directChannel, setDirectChannel] = useState([]);

  const getChannel = async (text) => {
    try {
      const channelRes = client.queryChannels({
        type: "team",
        name: { $autocomplete: text },
        members: { $in: [client.userID] },
      });
      const userRes = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });
      const [channels, { users }] = await Promise.all([channelRes, userRes]);
      if (channels.length) setTeamChannel(channels);
      if (users.length) setDirectChannel(users);
    } catch (err) {
      setQuery("");
    }
  };
  const handleSearch = (e) => {
    setLoading(true);
    e.preventDefault();
    setQuery(e.target.value);
    getChannel(e.target.value);
  };
  const setChannel = (channel) => {
    setQuery("");
    setActiveChannel(channel);
  };
  useEffect(() => {
    setTeamChannel([]);
    setDirectChannel([]);
  }, [query]);
  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          type="text"
          className="channel-search__input__text"
          placeholder="Search"
          value={query}
          onChange={handleSearch}
        />
      </div>
      {query && (
        <ResultSearch
          loading={loading}
          setQuery={setQuery}
          teamChannels={teamChannel}
          directChannels={directChannel}
          setToggle={setToggle}
          setChannel={setChannel}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
