import React, { useState } from "react";
import "./AdminDashboardAdd.css";
import Modal from "../UI/Modal";

const AdminDashboardAdd = (props) => {
  const [newActivity, setNewActivity] = useState("");
  const [image, setImage] = useState(null);
  const authToken = localStorage.getItem("authToken");
  const addActivity = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newActivity);
      formData.append("image", image);
      console.log("image :", image);
      if (!image) {
        alert("Please select an Image File");
      }
      const response = await fetch("http://localhost:8080/activities/add", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response) {
        console.error("No response received");
        alert("Error adding activity. Please try again.");
        return;
      }

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("ERROR:", errorMessage);
        alert(`ERROR: ${errorMessage}`);
        return;
      }

      setNewActivity("");
      setImage(null);
      alert("Activity added successfully!");
    } catch (error) {
      console.error("Caught an error:", error);
      alert("Error adding activity. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    console.log("e.target.files[0] :", e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <Modal>
      <div className="admin-dashboard">
        <h2>Add New Activity</h2>
        <div>
          <label>Activity Name:</label>
          <input
            type="text"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button onClick={addActivity}>Add</button>{" "}
        <button onClick={props.onCancel}>Back</button>
      </div>
    </Modal>
  );
};

export default AdminDashboardAdd;
