import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import "./Activities.css";

const UserProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseData = useSelector((state) => state.user.user);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");

    dispatch(logout());

    navigate("/");
  };

  useEffect(() => {
    if (!responseData.user) {
      navigate("/");
    }
  }, [responseData, navigate, dispatch]);

  return (
    <div className="user-dropdown">
      <div>{responseData.user.fullName}</div>
      <div>{responseData.user.email}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfileDropdown;
