import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginSuccess, setAuthToken, loginFailure } from "../store/userSlice";

function Redirect() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    console.log("redirecting");

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/googleUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const googleUser = await response.json();
        console.log("Google User Data:", googleUser);
        dispatch(setAuthToken(googleUser.user.accessToken));
        dispatch(loginSuccess(googleUser.user));
        navigate("/activities");
      } catch (error) {
        console.error("Error handling redirect:", error);
        dispatch(loginFailure("Error handling redirect"));
      }
    };

    fetchData();
  }, [dispatch, navigate, location]);

  return <div>Redirect</div>;
}

export default Redirect;
