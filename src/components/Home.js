//HomePage
import classes from "./Home.module.css";
import LoginForm from "./LoginForm";
import CreateAccount from "./CreateAccount";
import { useState } from "react";

const Home = () => {
  const [isLoginFormShown, setIsLoginFormShown] = useState(false);
  const [isCreateAccountShown, setIsCreateAccountShown] = useState(false);

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
          <img src="../images/Home.jpeg" alt="Background Image" />
        </div>
      </div>
    </>
  );
};

export default Home;
