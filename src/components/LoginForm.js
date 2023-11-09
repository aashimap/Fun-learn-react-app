import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState, signIn } from "../store/userSlice";
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
  const [responseError, setResponseError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const authToken = localStorage.getItem("authToken");

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };
    dispatch(signIn(userData));
  };

  const handleGoogleLogin = () => {
    window.open(
      "https://fun-learn-node.onrender.com/auth/google",
      "_self"
      //"http://localhost:8080/auth/google",
      //"_self"
    );
  };

  const handleCancel = () => {
    dispatch(resetState());
    setShowModal(false);
    if (props.onCancel) {
      props.onCancel();
    }
  };

  useEffect(() => {
    if (error) {
      setResponseError(true);
    } else if (authToken !== null) {
      console.log("Navigating to /activities");
      navigate("/activities");
      setShowModal(false);
    } else {
      navigate("/");
    }
  }, [authToken, navigate, dispatch, error]);
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
              {responseError ? <p className="text-danger">{error}</p> : null}
              <div className="d-flex justify-content-center align-items-center">
                <Button variant="primary" onClick={handleLogin}>
                  Login
                </Button>
                <div style={{ margin: "5px" }}>
                  <Button
                    variant="primary"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                  >
                    {/* Replace the image URL with your custom Google image */}
                    <img
                      src="images/google_icon.jpeg"
                      alt="Sign In with Google"
                      style={{
                        width: "38px",
                        height: "20px",
                        marginRight: "5px",
                      }}
                    />
                    Sign In with Google
                  </Button>
                </div>
              </div>
            </>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginForm;
