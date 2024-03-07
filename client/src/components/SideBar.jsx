import Hospital from "../asset/hospital.png";
import Logout from "../asset/logout.png";
import Cookies from "universal-cookie";
const cookie = new Cookies();
const SideBar = () => {
  const logOut = () => {
    cookie.remove("userId");
    cookie.remove("token");
    cookie.remove("userName");
    cookie.remove("fullName");
    cookie.remove("avatarUrl");
    cookie.remove("hashedPassword");
    cookie.remove("phoneNumber");
    window.location.reload();
  };
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src={Hospital} alt="Hospital" width={30} />
        </div>
      </div>
      <div className="channel-list__sidebar__icon2" onClick={logOut}>
        <div className="icon2__inner">
          <img src={Logout} alt="Logout" width={30} />
        </div>
      </div>
    </div>
  );
};
export default SideBar;
