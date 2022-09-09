import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchPrivateGroups = createAsyncThunk(
  "privateGroups/fetchPrivateGroups",
  async (_, { getState }) => {
    try {
      const getToken = getState();
      let { data } = await Axios.get(
        "https://defigram-app.herokuapp.com/admin/api/allGroups",
        {
          headers: { Authorization: `${getToken.authData.userInfo.data}` },
        }
      );
      let userArray = Array.from(data.data);

      localStorage.setItem("privateGroups", JSON.stringify(userArray));
      return userArray;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

const initialState = {
  privateGroups: localStorage.getItem("privateGroups")
    ? JSON.parse(localStorage.getItem("privateGroups"))
    : [],
  error: "",
};

const fetchPrivateGroupReducer = createSlice({
  name: "fetchPrivateGroups",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchPrivateGroups.fulfilled, (state, action) => {
      state.privateGroups = action.payload;
    });
    builder.addCase(fetchPrivateGroups.rejected, (state, action) => {
      state.error = "All Private Groups are not coming";
    });
  },
});

export default fetchPrivateGroupReducer.reducer;
