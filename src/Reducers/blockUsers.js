import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchBlockedUsers = createAsyncThunk(
  "blockedUsers/fetchBlockedUsers",
  async (_, { getState }) => {
    try {
      const getToken = getState();

      let { data } = await Axios.get(
        "https://defigram-app.herokuapp.com/admin/api/get_blocked_users",
        {
          headers: { Authorization: `${getToken.authData.userInfo.data}` },
        }
      );
      let userArray = Array.from(data.data);

      localStorage.setItem("blockedUsers", JSON.stringify(userArray));

      return userArray;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const blockFromAllBlockPage = createAsyncThunk(
  "blockerUser/blockUnBlockStatusFromBlock",
  async (dataBlock, { getState }) => {
    try {
      const getToken = getState();
      const { user_id, status, blocked_for, page, blocked_reason } = dataBlock;
      const { data } = await Axios.post(
        "https://defigram-app.herokuapp.com/admin/api/blockUser",
        { user_id, blocked_for, blocked_reason },
        {
          headers: { Authorization: `${getToken.authData.userInfo.data}` },
        }
      );
      if (data.code == 200) {
        if (page == "BLOCK_PAGE") {
          return { user_id, status };
        }
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

const initialState = {
  blockedUsers: localStorage.getItem("blockedUsers")
    ? JSON.parse(localStorage.getItem("blockedUsers"))
    : [],
  error: "",
};

const fetchBlockedUsersReducer = createSlice({
  name: "BlockedUsers",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchBlockedUsers.fulfilled, (state, action) => {
      state.blockedUsers = action.payload;
    });
    builder.addCase(fetchBlockedUsers.rejected, (state, action) => {
      state.error = "All Blocked Users Data are not coming";
    });
    builder.addCase(blockFromAllBlockPage.fulfilled, (state, action) => {
      let newArray = state.blockedUsers.filter(
        (data) => data.user_id !== action.payload.user_id
      );
      state.blockedUsers = newArray;
      localStorage.setItem("blockedUsers", JSON.stringify(state.blockedUsers));
    });
    builder.addCase(blockFromAllBlockPage.rejected, (state, action) => {
      state.error = "Block Api in blocked is not working";
    });
  },
});

export default fetchBlockedUsersReducer.reducer;
