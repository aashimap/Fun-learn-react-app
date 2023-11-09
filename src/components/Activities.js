// Activities.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Activities.css";
import UserProfileDropdown from "./UserProfileDropdown";
import AdminDashboardAdd from "./AdminDashboardAdd";
import AdminDashboardDelete from "./AdminDashboardDelete";
import jwt_decode from "jwt-decode";

const Activities = () => {
  console.log("ACTIVIITIES");
  const authToken = localStorage.getItem("authToken");
  const decodedToken = jwt_decode(authToken);
  const [activities, setActivities] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

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
    const checkSessionExpiration = () => {
      //if (decodedToken !== null && decodedToken !== undefined)
      if (authToken !== null) {
        const expirationTime = decodedToken.exp * 10000;
        console.log(expirationTime);

        if (Date.now() > expirationTime) {
          localStorage.removeItem("authToken");
          navigate("/");
        }
      }
    };
    const fetchActivities = async () => {
      console.log("ACTIVITIES PAGE");
      try {
        if (authToken) {
          const response = await fetch(
            "http://localhost:8080/activities/fetch",
            //"https://fun-learn-node.onrender.com/activities/fetch",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          if (!response.ok) {
            const errorMessage = await response.text();
            console.error("ERROR:", errorMessage);
            alert(`Error fetching activities`);
            return;
          }

          const data = await response.json();
          setActivities(data.activities);
        }
      } catch (error) {
        console.error("Caught an error:", error);
        alert("Error fetching activity. Please try again.");
      }
      checkSessionExpiration();
    };

    if (authToken !== null) {
      fetchActivities();
      console.log(authToken);

      const userRole = decodedToken.role;
      setIsAdmin(userRole === "admin");

      const intervalId = setInterval(checkSessionExpiration, 300000);
      return () => clearInterval(intervalId);
    } else {
      navigate("/");
    }
  }, [authToken, navigate, decodedToken.role, decodedToken.exp]);

  return (
    <>
      <div className="main-container">
        <div className="main-header">
          <h1>{isAdmin ? "Admin Dashboard" : "Fun Learn - Activities"}</h1>
          <div className="actions">
            {isAdmin && (
              <Button className="add" onClick={showAddActivity}>
                Add Activity
              </Button>
            )}
            {isAdmin && (
              <Button className="delete" onClick={showDeleteActivity}>
                Delete Activity
              </Button>
            )}
            <Button className="user-icon" onClick={handleProfile}>
              👤
            </Button>
          </div>

          {isVisible && <UserProfileDropdown />}
        </div>
        <Container>
          <Row>
            {activities.map((activity, index) => (
              <Col key={activity.id} md={3} className="activity-item">
                <img src={activity.image} alt="" />
                <p className="activity-label">{activity.name}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      {addShow && <AdminDashboardAdd onCancel={showAddActivity} />}
      {deleteShow && <AdminDashboardDelete onCancel={showDeleteActivity} />}
    </>
  );
};

export default Activities;
