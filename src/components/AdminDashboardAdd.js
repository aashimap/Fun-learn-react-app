import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AdminDashboardAdd = (props) => {
  const [newActivity, setNewActivity] = useState("");
  const [image, setImage] = useState(null);
  const authToken = localStorage.getItem("authToken");

  const addActivity = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newActivity);
      formData.append("image", image);

      if (!image) {
        alert("Please select an Image File");
        return;
      }

      const response = await fetch(
        //"http://localhost:8080/activities/add",
        "https://fun-learn-node.onrender.com/activities/add",
        {
          method: "POST",
          body: formData,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response || !response.ok) {
        console.error("Error adding activity.");
        alert("Error adding activity. Please try again.");
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
    setImage(e.target.files[0]);
  };

  return (
    <Modal show={true} onHide={props.onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="activityName">
            <Form.Label>Activity Name:</Form.Label>
            <Form.Control
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="uploadImage">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={addActivity}>
          Add
        </Button>
        <Button variant="secondary" onClick={props.onCancel}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminDashboardAdd;
