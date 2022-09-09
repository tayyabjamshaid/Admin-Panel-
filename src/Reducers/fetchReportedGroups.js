import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchReportedGroups = createAsyncThunk(
  "reportedGroups/fetchReportedGroups",
  async (_, { getState }) => {
    const getToken = getState();
    let { data } = await Axios.get(
      "https://defigram-app.herokuapp.com/admin/api/getAllReportedGroups",
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

    localStorage.setItem("reportedGroups", JSON.stringify(userArray));
    return userArray;
  }
);
export const blockFromAllGroupPage = createAsyncThunk(
  "blockReportedgroup/blockUnBlockStatusOfReportedGroup",
  async (dataBlock, { getState }) => {
    try {
      const getToken = getState();
      const { user_id, status, blocked_for, page, blocked_reason } = dataBlock;
      const { data } = await Axios.post(
        "https://defigram-app.herokuapp.com/admin/api/blockGrouoo", //change
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
  reportedGroups: localStorage.getItem("reportedGroups")
    ? JSON.parse(localStorage.getItem("reportedGroups"))
    : [],
  error: "",
};

const fetchReportedGroupReducer = createSlice({
  name: "ReportedGroups",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchReportedGroups.fulfilled, (state, action) => {
      state.reportedGroups = action.payload;
    });
    builder.addCase(fetchReportedGroups.rejected, (state, action) => {
      state.error = "All Reported Groups Data are not coming";
    });
    builder.addCase(blockFromAllGroupPage.fulfilled, (state, action) => {
      //////logic will be change here
      const index = state.reportedGroups.findIndex(
        (todo) => todo.reported.user_id === action.payload.user_id
      ); //finding index of the item
      const newArray = [...state.reportedGroups]; //making a new array
      newArray[index].reported.admin_approval = action.payload.status; //changing value in the new array
      state.reportedGroups = newArray;
    });
    builder.addCase(blockFromAllGroupPage.rejected, (state, action) => {
      state.error = "Block Api of Reported Group is not working";
    });
  },
});

export default fetchReportedGroupReducer.reducer;
