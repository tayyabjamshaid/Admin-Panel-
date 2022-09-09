import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const fetchUsers = createAsyncThunk(
  "users/userAuth", //unique
  async (dataEmail) => {
    try {
      const { email, password } = dataEmail;
      const { data } = await Axios.post(
        "https://defigram-app.herokuapp.com/adminAuthentication/api/adminAuth",
        { email, password }
      );
      localStorage.setItem("saved", new Date().getTime());
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error.response.data);
      toast.error("Invalid email or password");
      // return error;
    }
  }
);
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  error: "",
};

const userReducer = createSlice({
  name: "users", //unique
  initialState,
  reducers: {
    logout(state, action) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("allUsers");
      localStorage.removeItem("blockedUsers");
      localStorage.removeItem("reportedUsers");

      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = "Invalid email or password";
    });
  },
});
export const { logout } = userReducer.actions;

export default userReducer.reducer;
