import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp, setUserCreated } from "../store/userSlice";
import Modal from "../UI/Modal";
import "./ModalContainer.css";

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

  const loading = useSelector((state) => state.user.loading);
  const userCreated = useSelector((state) => state.user.userCreated);

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
    if (userCreated) {
      dispatch(setUserCreated(false));
    }
  }, [userCreated, dispatch]);

  return (
    <Modal>
      <div className="modal-container">
        <h1>Create Account</h1>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderColor: inputTouched.email ? inputBorders.email : "gray",
            }}
          />
          {inputTouched.email && !validateEmail(email) && (
            <p style={{ color: "red" }}>Please enter a valid email.</p>
          )}
        </div>
        <div>
          <label>Username:</label>
          <input
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
            <p style={{ color: "red" }}>
              Username must be at least 3 characters.
            </p>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
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
            <p style={{ color: "red" }}>
              Password must be at least 6 characters.
            </p>
          )}
        </div>
        <button onClick={handleCreate} disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
        <button onClick={props.onCancel}>Cancel</button>
      </div>
    </Modal>
  );
};

export default CreateAccount;
