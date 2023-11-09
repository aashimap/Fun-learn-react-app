import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AdminDashboardDelete = (props) => {
  const [activityName, setActivityName] = useState("");
  const authToken = localStorage.getItem("authToken");

  const deleteActivity = async () => {
    try {
      if (!activityName) {
        alert("Please enter the Activity Name");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/activities/delete",
        //"https://fun-learn-node.onrender.com/activities/delete",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: activityName }),
        }
      );

      if (!response || !response.ok) {
        console.error("Error deleting activity");
        alert("Error deleting activity. Please try again.");
        return;
      }

      setActivityName("");
      alert("Activity deleted successfully!");
    } catch (error) {
      console.error("Caught an error:", error);
      alert("Error deleting activity. Please try again.");
    }
  };

  return (
    <Modal show={true} onHide={props.onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="activityName">
            <Form.Label>Activity Name:</Form.Label>
            <Form.Control
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={deleteActivity}>
          Delete
        </Button>
        <Button variant="secondary" onClick={props.onCancel}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminDashboardDelete;
