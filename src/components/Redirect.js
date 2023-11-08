import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, setAuthToken, loginFailure } from "../store/userSlice";

function Redirect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fun-learn-node.onrender.com/googleUser",
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch google user data");
        }

        const googleUser = await response.json();

        dispatch(loginSuccess(googleUser));
        dispatch(setAuthToken(googleUser.accessToken));
        navigate("/activities");
      } catch (error) {
        console.error("Error handling redirect:", error);
        dispatch(loginFailure("Error handling redirect"));
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  return <div>Redirect</div>;
}

export default Redirect;
