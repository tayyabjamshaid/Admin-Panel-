import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchallUsers = createAsyncThunk(
  "allusers/fetchAllUsers",
  async (_, { getState }) => {
    try {
      const getToken = getState();
      let { data } = await Axios.get(
        "https://defigram-app.herokuapp.com/admin/api/getAllRegisteredUsers",
        {
          headers: { Authorization: `${getToken.authData.userInfo.data}` },
        }
      );

      let userArray = Array.from(data.data);
      localStorage.setItem("allUsers", JSON.stringify(userArray));
      return userArray;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const blockUserPage = createAsyncThunk(
  "blockAlluser/blockUnBlockStatusFromAllUsers",
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
        if (page == "TABLE_PAGE") {
          return { user_id, status };
        }
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

const initialState = {
  allUsers: localStorage.getItem("allUsers")
    ? JSON.parse(localStorage.getItem("allUsers"))
    : [],
  error: "",
};

const fetchAllUsersReducer = createSlice({
  name: "fetchAllUsers",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchallUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
    });
    builder.addCase(fetchallUsers.rejected, (state, action) => {
      state.error = "All Users Data are not coming";
    });
    builder.addCase(blockUserPage.fulfilled, (state, action) => {
      const index = state.allUsers.findIndex(
        (todo) => todo.user_id === action.payload.user_id
      ); //finding index of the item
      const newArray = [...state.allUsers]; //making a new array
      newArray[index].admin_approval = action.payload.status; //changing value in the new array
      state.allUsers = newArray;
    });
    builder.addCase(blockUserPage.rejected, (state, action) => {
      state.error = "Block Api is not coming";
    });
  },
});

export default fetchAllUsersReducer.reducer;
