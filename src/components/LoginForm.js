// SignIn Component
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import "./ModalContainer.css";
import "./Home.module.css";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseData = useSelector((state) => state.user);

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };

    dispatch(signIn(userData));
  };

  useEffect(() => {
    if (responseData.user) {
      navigate("/activities");
    }
  }, [responseData, navigate]);

  return (
    <Modal>
      <div className="modal-container">
        <h1>Login</h1>
        <div>
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button onClick={handleLogin}>Login</button>
          {responseData.error && <p>{responseData.error}</p>}
          <button onClick={props.onCancel}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginForm;
