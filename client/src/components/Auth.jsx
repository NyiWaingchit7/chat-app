import React, { useState } from "react";
import SiginImage from "../asset/signup.jpg";
import axios from "axios";
import Cookies from "universal-cookie";
const defaultUserForm = {
  fullName: "",
  userName: "",
  phoneNumber: "",
  avatarUrl: "",
  password: "",
  confirmPassword: "",
};
const cookie = new Cookies();

const Auth = () => {
  const [singUp, setSignup] = useState(true);
  const [userForm, setUserForm] = useState(defaultUserForm);
  const handleOnChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const handleOnSumbit = async (e) => {
    const url = process.env.REACT_APP_API_URL;
    e.preventDefault();
    console.log(userForm);
    const {
      data: {
        userId,
        fullName,
        userName,
        token,
        hashedPassword,
        phoneNumber,
        avatarUrl,
      },
    } = await axios.post(`${url}/auth/${singUp ? "signup" : "login"}`, {
      ...userForm,
    });
    cookie.set("token", token);
    cookie.set("userId", userId);
    cookie.set("userName", userName);
    cookie.set("fullName", fullName);
    cookie.set("phoneNumber", phoneNumber);
    cookie.set("hashedPassword", hashedPassword);
    cookie.set("avatarUrl", avatarUrl);

    window.location.reload();
  };
  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{singUp ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleOnSumbit}>
            {singUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  required
                  onChange={handleOnChange}
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                placeholder="User Name"
                name="userName"
                required
                onChange={handleOnChange}
              />
            </div>
            {singUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  required
                  onChange={handleOnChange}
                />
              </div>
            )}
            {singUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarUrl">Avatar URL</label>
                <input
                  type="text"
                  placeholder="Avatar URL"
                  name="avatarUrl"
                  required
                  onChange={handleOnChange}
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={handleOnChange}
              />
            </div>
            {singUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="comfirmPassword">Comfirm Password</label>
                <input
                  type="password"
                  placeholder="Comfirm Password"
                  name="comfirmPassword"
                  required
                  onChange={handleOnChange}
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{singUp ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account ">
            <p>
              {singUp
                ? "Already have an account? "
                : "Don't have an accouont? "}
            </p>
            <span
              onClick={() => {
                setSignup(!singUp);
              }}
            >
              {singUp ? "Sign In" : "Sign Up"}
            </span>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={SiginImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;
