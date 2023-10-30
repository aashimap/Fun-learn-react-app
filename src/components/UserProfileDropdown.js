import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetState } from "../store/userSlice";
import "./Activities.css";

const UserProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user.user);
  console.log(user);

  const { fullName, email } = user;

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    dispatch(logout());
    dispatch(resetState());

    navigate("/");
  };

  return (
    <div className="user-dropdown">
      <div>{fullName}</div>
      <div>{email}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfileDropdown;
