import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchReportedUsers = createAsyncThunk(
  "reportedUsers/fetchReportedUsers",
  async (_, { getState }) => {
    try {
      const getToken = getState();
      let { data } = await Axios.get(
        "https://defigram-app.herokuapp.com/admin/api/getAllReportedUsers",
        {
          headers: { Authorization: `${getToken.authData.userInfo.data}` },
        }
      );
      //Logic to stop repitation of users which have same ids
      let userArray = Array.from(data.data);
      const ids = userArray.map((o) => o.reported.user_id);
      userArray = userArray.filter(
        (data, index) => !ids.includes(data.reported.user_id, index + 1)
      );

      //end here

      localStorage.setItem("reportedUsers", JSON.stringify(userArray));
      return userArray;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const blockFromAllUserPage = createAsyncThunk(
  "blockReporteduser/blockUnBlockStatusOfReporter",
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
        if (page == "REPORT_PAGE") {
          return { user_id, status };
        }
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

const initialState = {
  reportedUsers: localStorage.getItem("reportedUsers")
    ? JSON.parse(localStorage.getItem("reportedUsers"))
    : [],
  error: "",
};

const fetchReportedUsersReducer = createSlice({
  name: "ReportedUsers",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchReportedUsers.fulfilled, (state, action) => {
      state.reportedUsers = action.payload;
    });
    builder.addCase(fetchReportedUsers.rejected, (state, action) => {
      state.error = "All Reported Users Data are not coming";
    });
    builder.addCase(blockFromAllUserPage.fulfilled, (state, action) => {
      const index = state.reportedUsers.findIndex(
        (todo) => todo.reported.user_id === action.payload.user_id
      ); //finding index of the item
      const newArray = [...state.reportedUsers]; //making a new array
      newArray[index].reported.admin_approval = action.payload.status; //changing value in the new array
      state.reportedUsers = newArray;
    });
    builder.addCase(blockFromAllUserPage.rejected, (state, action) => {
      state.error = "Block Api of Reported is not working";
    });
  },
});

export default fetchReportedUsersReducer.reducer;
