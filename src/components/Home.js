//HomePage
import "./Home.css";
import LoginForm from "./LoginForm";
import CreateAccount from "./CreateAccount";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isLoginFormShown, setIsLoginFormShown] = useState(false);
  const [isCreateAccountShown, setIsCreateAccountShown] = useState(false);
  const authToken = localStorage.getItem("authToken");

  const handleSignInClick = () => {
    setIsLoginFormShown(true);
  };

  const handleSignUpClick = () => {
    setIsCreateAccountShown(true);
  };

  useEffect(() => {
    if (authToken !== null) {
      navigate("/activities");
    } else {
      navigate("/");
    }
  }, [navigate, authToken]);

  return (
    <>
      <div className="main-container">
        <div className="main-header">
          <h1>Fun Learn</h1>
          <div className="buttons-container">
            <button onClick={handleSignInClick}>SignIn</button>
            <button onClick={handleSignUpClick}>SignUp</button>
          </div>
        </div>

        <div className="image-container">
          <img src="../images/Home.jpeg" alt="Background" />
        </div>
        <p className="main-text">A Creative Learning For Little Ones</p>
        {isLoginFormShown && (
          <LoginForm onCancel={() => setIsLoginFormShown(false)} />
        )}
        {isCreateAccountShown && (
          <CreateAccount onCancel={() => setIsCreateAccountShown(false)} />
        )}
      </div>
    </>
  );
};

export default Home;
