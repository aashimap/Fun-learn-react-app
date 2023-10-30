import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import "./Home.css";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseData = useSelector((state) => state.user);
  const loading = useSelector((state) => state.user.loading);
  const authToken = localStorage.getItem("authToken");

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };

    dispatch(signIn(userData));
  };

  const handleCancel = () => {
    setShowModal(false);
    if (props.onCancel) {
      props.onCancel();
    }
  };

  useEffect(() => {
    console.log("authToken:", authToken);
    if (authToken !== null) {
      console.log("Navigating to /activities");
      navigate("/activities");
      setShowModal(false);
    } else {
      navigate("/");
    }
  }, [authToken, navigate, dispatch]);

  return (
    <Modal show={showModal} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              {responseData.error && (
                <p className="text-danger">{responseData.error}</p>
              )}
              <Button variant="primary" onClick={handleLogin}>
                Login
              </Button>
            </>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginForm;
