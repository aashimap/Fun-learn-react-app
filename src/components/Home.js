//HomePage
import classes from "./Home.module.css";
import LoginForm from "./LoginForm";
import CreateAccount from "./CreateAccount";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isLoginFormShown, setIsLoginFormShown] = useState(false);
  const [isCreateAccountShown, setIsCreateAccountShown] = useState(false);
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);

  const showLoginForm = () => {
    setIsLoginFormShown(true);
    setIsCreateAccountShown(false);
  };

  const showCreateAccount = () => {
    setIsCreateAccountShown(true);
    setIsLoginFormShown(false);
  };

  const hideForms = () => {
    setIsLoginFormShown(false);
    setIsCreateAccountShown(false);
  };

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/activities");
    }
  }, [navigate, userLoggedIn]);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <h1>Fun Learn</h1>
          <div className={classes.buttonscontainer}>
            <button onClick={showLoginForm}>SignIn</button>
            {isLoginFormShown && <LoginForm onCancel={hideForms} />}
            <button onClick={showCreateAccount}>SignUp</button>
            {isCreateAccountShown && <CreateAccount onCancel={hideForms} />}
          </div>
        </div>

        <div className={classes.content}>
          <div className={classes.main}></div>
        </div>
        <div className={classes.imagecontainer}>
          <img src="../images/Home.jpeg" alt="Background" />
        </div>
        <p className={classes.text}>A Creative Learning For Little Ones</p>
      </div>
    </>
  );
};

export default Home;
