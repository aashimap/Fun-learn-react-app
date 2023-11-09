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
      state.error = null;
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
      "http://localhost:8080/signup",
      //"https://fun-learn-node.onrender.com/signup",
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
      "http://localhost:8080/signin",
      //"https://fun-learn-node.onrender.com/signin",
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
    dispatch(loginFailure("An error occurred"));
    console.log(console.log(error.message));
  }
};

// Client-side actions
// export const googleSignIn = () => async (dispatch) => {
//   console.log("Dispatched googleSignIn");
//   try {
//     // Open Google Sign-In popup
//     const googleSignInPopup = window.open(
//       "http://localhost:8080/auth/google",
//       "GoogleSignIn",
//       "width=600,height=600"
//     );

//     const result = await new Promise((resolve, reject) => {
//       const checkPopupClosed = setInterval(() => {
//         if (googleSignInPopup.closed) {
//           clearInterval(checkPopupClosed);
//           reject({ error: "popup_closed_by_user" });
//         }
//       }, 500);

//       window.addEventListener("message", (event) => {
//         if (event.origin === window.location.origin) {
//           resolve(event.data);
//         }
//       });
//     });

//     // Handle the result (user data or error) here
//     console.log("Google Sign-In Result:", result);
//   } catch (error) {
//     console.error("Google Sign-In error:", error);
//   }
// };

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
