import React from "react";
import Hospital from "../asset/hospital.png";
import Logout from "../asset/logout.png";
import ChannelSearch from "./ChannelSearch";
const SideBar = () => {
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src={Hospital} alt="Hospital" width={30} />
        </div>
      </div>
      <div className="channel-list__sidebar__icon2">
        <div className="icon2__inner">
          <img src={Logout} alt="Logout" width={30} />
        </div>
      </div>
    </div>
  );
};
const CompanyHeader = () => {
  return (
    <div className="channel-list__header">
      <p className="channel-list__header__text"> Medical Pager</p>
    </div>
  );
};
const ChannelListContainer = () => {
  return (
    <>
      <SideBar />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
      </div>
    </>
  );
};

export default ChannelListContainer;
