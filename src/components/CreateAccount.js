import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import "./Home.css";

const CreateAccount = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [inputBorders, setInputBorder] = useState({
    email: "blue",
    username: "blue",
    password: "blue",
  });
  const [inputTouched, setInputTouched] = useState({
    email: false,
    username: false,
    password: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.user.loading);
  const authToken = useSelector((state) => state.user.authToken);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateUsername = (username) => username.length >= 3;
  const validatePassword = (password) => password.length >= 6;

  const handleCreate = () => {
    const isEmailValid = validateEmail(email);
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);

    setInputBorder({
      email: isEmailValid ? "green" : "red",
      username: isUsernameValid ? "green" : "red",
      password: isPasswordValid ? "green" : "red",
    });

    setInputTouched({
      email: true,
      username: true,
      password: true,
    });

    const userData = {
      username,
      password,
      email,
    };
    if (isEmailValid && isPasswordValid && isUsernameValid) {
      dispatch(signUp(userData));
    }
  };

  useEffect(() => {
    if (authToken !== null) {
      navigate("/activities");
    } else {
      navigate("/");
    }
  }, [authToken, navigate, dispatch]);

  return (
    <Modal show={true} onHide={props.onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                borderColor: inputTouched.email ? inputBorders.email : "gray",
              }}
            />
            {inputTouched.email && !validateEmail(email) && (
              <Form.Text style={{ color: "red" }}>
                Please enter a valid email.
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                borderColor: inputTouched.username
                  ? inputBorders.username
                  : "gray",
              }}
            />
            {inputTouched.username && !validateUsername(username) && (
              <Form.Text style={{ color: "red" }}>
                Username must be at least 3 characters.
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderColor: inputTouched.password
                  ? inputBorders.password
                  : "gray",
              }}
            />
            {inputTouched.password && !validatePassword(password) && (
              <Form.Text style={{ color: "red" }}>
                Password must be at least 6 characters.
              </Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" onClick={handleCreate} disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" />
                {" Creating..."}
              </>
            ) : (
              "Create"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAccount;
