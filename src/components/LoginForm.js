import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, googleSignIn } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import "./Home.css";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseData = useSelector((state) => state.user);
  const loading = useSelector((state) => state.user.loading);
  const authToken = localStorage.getItem("authToken");

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  //const scopes = "https://www.googleapis.com/auth/userinfo.email";

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };

    dispatch(signIn(userData));
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login success:", response);
    dispatch(googleSignIn());
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login error:", error);
  };

  const handleCancel = () => {
    setShowModal(false);
    if (props.onCancel) {
      props.onCancel();
    }
  };

  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: clientId,
      plugin_name: "chat",
    });
  });

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
              <div className="d-flex justify-content-center align-items-center">
                <Button variant="primary" onClick={handleLogin}>
                  Login
                </Button>
                <div style={{ margin: "5px" }}>
                  <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In with Google"
                    onSuccess={handleGoogleLoginSuccess}
                    onFailure={handleGoogleLoginFailure}
                    cookiePolicy={"single_host_origin"}
                    autoLoad={false}
                    className="btn-primary custom-btn"
                  />
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
