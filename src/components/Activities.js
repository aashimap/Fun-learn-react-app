// Activities.js

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Activities.css";
import UserProfileDropdown from "./UserProfileDropdown";
import AdminDashboardAdd from "./AdminDashboardAdd";
import AdminDashboardDelete from "./AdminDashboardDelete";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const [isVisible, setIsVisible] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await fetch("http://localhost:8080/activities/fetch", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("ERROR:", errorMessage);
        alert(`ERROR: ${errorMessage}`);
        return;
      }

      const data = await response.json();
      setActivities(data.activities);
    } catch (error) {
      console.error("Caught an error:", error);
      alert("Error fetching activity. Please try again.");
    }
  };

  const handleProfile = () => {
    setIsVisible(!isVisible);
  };

  const showAddActivity = () => {
    setAddShow(!addShow);
  };

  const showDeleteActivity = () => {
    setDeleteShow(!deleteShow);
  };

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/");
    }
    fetchActivities();
  }, [userLoggedIn, navigate, fetchActivities]);

  return (
    <>
      <div className="container">
        <div className="header">
          <div>{isAdmin ? "Admin Dashboard" : "Fun Learn - Activities"}</div>
          <div>
            <button className="add-activity" onClick={showAddActivity}>
              Add Activity
            </button>
            <button className="delete" onClick={showDeleteActivity}>
              Delete Activity
            </button>
            <button className="user-icon" onClick={handleProfile}>
              👤
            </button>
          </div>
          {isVisible && <UserProfileDropdown />}
        </div>
        <div className="activities-container">
          {activities.map((activity, index) => (
            <div key={activity.id} className="activity-item">
              <img src={activity.image} alt="" />
              <p className="activity-label">{activity.name}</p>
            </div>
          ))}
        </div>
      </div>
      {addShow && <AdminDashboardAdd onCancel={showAddActivity} />}
      {deleteShow && <AdminDashboardDelete onCancel={showDeleteActivity} />}
    </>
  );
};

export default Activities;
