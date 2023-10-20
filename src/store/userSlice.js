import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = {
  email: "",
  password: "",
  loading: false,
  user: null,
  error: null,
  authToken: localStorage.getItem("authToken") || null,
  userCreated: false,
  userLoggedIn: false,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    setUserCreated: (state, action) => {
      state.userCreated = action.payload;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message || "An error occurred";
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAdmin = action.payload.role === "admin";
      console.log(state.user);
    },
    setUserLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.authToken = null;
      state.userLoggedIn = false;
      localStorage.removeItem("authToken");
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";
    },
  },
});

//async thunk for sending userData to backend

export const signUp = (userData) => async (dispatch) => {
  console.log(userData);
  try {
    dispatch(signUpStart());

    const response = await fetch("https://fun-learn-node.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log(response);

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      const authToken = responseData.accessToken;
      const decodedtoken = jwt_decode(authToken);
      localStorage.setItem("decodedtoken", JSON.stringify(decodedtoken));
      dispatch(setAuthToken(authToken));
      dispatch(loginSuccess(responseData));
      dispatch(signUpSuccess(responseData));
      dispatch(setUserCreated(true));
      dispatch(setUserLoggedIn(true));
    }
  } catch (error) {
    console.log("Error during sign-up");
    dispatch(signUpFailure(error.message));
  }
};

//async thunk for logging in

export const signIn = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await fetch("https://fun-learn-node.onrender.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log(response);

    if (response.ok) {
      const responseData = await response.json();
      const authToken = responseData.accessToken;
      const decodedtoken = jwt_decode(authToken);
      localStorage.setItem("decodedtoken", JSON.stringify(decodedtoken));
      dispatch(setAuthToken(authToken));
      dispatch(loginSuccess(responseData));
      dispatch(setUserLoggedIn(true));
    } else {
      throw await response.json();
    }
  } catch (error) {
    dispatch(loginFailure(error.message || "An error occurred"));
  }
};

export const {
  signUpStart,
  signUpSuccess,
  setUserCreated,
  userCreated,
  signUpFailure,
  loginStart,
  loginSuccess,
  setAuthToken,
  logout,
  loginFailure,
  setUserLoggedIn,
  userLoggedIn,
  isAdmin,
} = userSlice.actions;

export default userSlice.reducer;
