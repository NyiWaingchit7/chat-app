import { useState } from "react";
import ChannelListContent from "./ChannelListContent";

const ChannelListContainer = ({
  createType,
  setCreateType,
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          createType={createType}
          setCreateType={setCreateType}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setToggle={setToggle}
        />
      </div>
      <div
        className="channel-list__container-responsive"
        style={{
          left: toggle ? "0%" : "-89%",
          backgroundColor: "#005fff",
        }}
        onClick={() => setToggle(!toggle)}
      >
        <div className="channel-list__container-toggle">
          <ChannelListContent
            createType={createType}
            setCreateType={setCreateType}
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            setToggle={setToggle}
          />
        </div>
      </div>
    </>
  );
};
export default ChannelListContainer;
