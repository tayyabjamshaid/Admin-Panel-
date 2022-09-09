import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchPublicGroups = createAsyncThunk(
  "publicGroups/fetchPublicGroups",
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

      localStorage.setItem("publicGroups", JSON.stringify(userArray));
      return userArray;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

const initialState = {
  publicGroups: localStorage.getItem("publicGroups")
    ? JSON.parse(localStorage.getItem("publicGroups"))
    : [],
  error: "",
};

const fetchPublicGroupReducer = createSlice({
  name: "fetchPublicGroups",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchPublicGroups.fulfilled, (state, action) => {
      state.publicGroups = action.payload;
    });
    builder.addCase(fetchPublicGroups.rejected, (state, action) => {
      state.error = "All Public Groups are not coming";
    });
  },
});

export default fetchPublicGroupReducer.reducer;

// export const publicGroupsReducer = (state = { publicGroups: [] }, action) => {
//   switch (action.type) {
//     case "FETCH_ALL_PUBLIC_GROUPS":
//       return { ...state, publicGroups: action.payload };

//     case "ERROR_PUBLIC_GROUPS_FETCH_USERS":
//       return { error: action.payload };
//     default:
//       return state;
//   }
// };
// export const privateGroupsReducer = (state = { privateGroups: [] }, action) => {
//   switch (action.type) {
//     case "FETCH_ALL_PRIVATE_GROUPS":
//       return { ...state, privateGroups: action.payload };

//     case "ERROR_PRIVATE_GROUPS_FETCH_USERS":
//       return { error: action.payload };
//     default:
//       return state;
//   }
// };
