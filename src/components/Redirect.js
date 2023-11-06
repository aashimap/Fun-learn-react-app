import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSuccess, setAuthToken, loginFailure } from "../store/userSlice";

function Redirect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const data = params.get("data");

      if (!data) {
        throw new Error("No data found in URL parameters");
      }

      const jsonData = JSON.parse(decodeURIComponent(data));

      dispatch(loginSuccess(jsonData));
      dispatch(setAuthToken(jsonData.accessToken));
      navigate("/activities");
    } catch (error) {
      console.error("Error handling redirect:", error);
      dispatch(loginFailure("Error handling redirect"));
    }
  }, [dispatch, navigate, location.search]);

  return <div>Redirect</div>;
}

export default Redirect;
