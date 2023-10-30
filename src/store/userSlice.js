import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  loading: false,
  user: null,
  error: null,
  authToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: (state) => {
      state = initialState;
    },

    setAuthToken: (state, action) => {
      state.authToken = action.payload;
      localStorage.setItem("authToken", action.payload);
    },

    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.authToken = null;
      localStorage.removeItem("authToken");
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";
    },
  },
});

//async thunk for sending userData to backend
// In userSlice.js

export const signUp = (userData) => async (dispatch) => {
  console.log(userData);
  try {
    dispatch(loginStart());

    const response = await fetch(
      //"http://localhost:8080/signup", //
      "https://fun-learn-node.onrender.com/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      dispatch(loginSuccess(responseData));
      const authToken = responseData.accessToken;
      dispatch(setAuthToken(authToken));
    }
  } catch (error) {
    console.log("Error during sign-up");
    dispatch(loginFailure(error.message));
  }
};

//async thunk for logging in

export const signIn = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await fetch(
      //"http://localhost:8080/signin",//
      "https://fun-learn-node.onrender.com/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      const authToken = responseData.accessToken;
      dispatch(setAuthToken(authToken));
      dispatch(loginSuccess(responseData));
    } else {
      throw await response.json();
    }
  } catch (error) {
    dispatch(loginFailure(error.message || "An error occurred"));
  }
};

export const {
  loading,
  authToken,
  resetState,
  loginStart,
  loginSuccess,
  setAuthToken,
  logout,
  loginFailure,
} = userSlice.actions;

export default userSlice.reducer;
