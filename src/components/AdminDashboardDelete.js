import "./AdminDashboardDelete.css";
import React, { useState } from "react";
import Modal from "../UI/Modal";

const AdminDashboardDelete = (props) => {
  const [activityId, setActivityId] = useState("");
  const authToken = localStorage.getItem("authToken");

  const deleteActivity = async () => {
    try {
      if (!activityId) {
        alert("Please enter the Activity ID");
        return;
      }

      const response = await fetch(
        `https://fun-learn-node.onrender.com/activities/delete/${activityId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response) {
        console.error("No response received");
        alert("Error deleting activity. Please try again.");
        return;
      }

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("ERROR:", errorMessage);
        alert(`ERROR: ${errorMessage}`);
        return;
      }

      setActivityId("");
      alert("Activity deleted successfully!");
    } catch (error) {
      console.error("Caught an error:", error);
      alert("Error deleting activity. Please try again.");
    }
  };

  return (
    <Modal>
      <div className="delete-activity">
        <h2>Delete Activity</h2>
        <div>
          <label>Activity ID:</label>
          <input
            type="text"
            value={activityId}
            onChange={(e) => setActivityId(e.target.value)}
          />
        </div>
        <button onClick={deleteActivity}>Delete</button>{" "}
        <button onClick={props.onCancel}>Back</button>
      </div>
    </Modal>
  );
};

export default AdminDashboardDelete;
