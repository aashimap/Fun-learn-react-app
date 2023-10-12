// Activities.js

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Activities.css";
import UserProfileDropdown from "./UserProfileDropdown";

const Activities = () => {
  const [isVisible, setIsVisible] = useState(false);
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  const images = [
    {
      url: "../images/knowledge.jpg",
      label: "Knowledge",
    },
    { url: "../images/literacy.jpeg", label: "Literacy" },
    { url: "../images/numeracy.jpeg", label: "Numeracy" },
    { url: "../images/shapes.jpeg", label: "Shapes" },
    {
      url: "../images/value-education.jpeg",
      label: "Value Education",
    },
  ];
  const handleProfile = () => {
    console.log("USERPROFILE");
    setIsVisible(!isVisible);
    console.log(isVisible);
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div>Fun Learn - Activities</div>
          <button className="user-icon" onClick={handleProfile}>
            👤
          </button>
          {isVisible && <UserProfileDropdown />}
        </div>

        <div className="activities-container">
          {images.map((image, index) => (
            <div key={index} className="activity-item">
              <img src={image.url} alt={`Image ${index + 1}`} />
              <p className="activity-label">{image.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Activities;
