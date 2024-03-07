import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { InviteIcon } from "../asset";

const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};
const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);
  const handleSelect = () => {
    if (selected) {
      setSelectedUsers((preUsers) =>
        preUsers.filter((preUser) => preUser !== user.id)
      );
    } else {
      setSelectedUsers((preUsers) => [...preUsers, user.id]);
    }
    setSelected(!selected);
  };
  return (
    <div className="user-item__wrapper">
      <div className="user-item__name-wrapper" onClick={handleSelect}>
        <Avatar image={user.image} name={user.fullName || user.id} size={34} />
        <p className="user-item__name">{user.fullName || user.id}</p>
      </div>
      {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
    </div>
  );
};
const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await client.queryUsers(
          {
            id: {
              $ne: client.userID,
            },
          },
          { id: 1 },
          { limit: 8 }
        );
        if (response.users.length) {
          setUsers(response.users);
        } else {
          setEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    if (client) getUsers();
  }, []);
  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">
          Error loading. Refresh and try again.
        </div>
      </ListContainer>
    );
  }
  if (empty) {
    return (
      <ListContainer>
        <div className="user-list__message">No user found.</div>
      </ListContainer>
    );
  }
  return (
    <ListContainer>
      {loading ? (
        <div className="user-list__message">Loading users....</div>
      ) : (
        users?.map((user, i) => (
          <UserItem
            key={user.id}
            index={i}
            user={user}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
};

export default UserList;
