import React, { useState } from "react";
import { SearchIcon } from "../asset";
const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getChannel = async (text) => {
    try {
      //to do fetch
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
    </div>
  );
};

export default ChannelSearch;
