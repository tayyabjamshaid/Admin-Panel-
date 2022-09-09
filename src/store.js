import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userAuth";
import fetchAllUsersReducer from "./Reducers/fetchAllUsers";
import fetchReportedUsersReducer from "./Reducers/fetchReportedUsers";
import blockFromAllUserPage from "./Reducers/blockUsers";
import fetchPublicGroupReducer from "./Reducers/fetchPublicGroups";
import fetchPrivateGroupReducer from "./Reducers/fetchPrivateGroups";
import fetchReportedGroupReducer from "./Reducers/fetchReportedGroups";

const store = configureStore({
  reducer: {
    authData: userReducer,
    allUserData: fetchAllUsersReducer,
    reportedUsers: fetchReportedUsersReducer,
    blockedUsers: blockFromAllUserPage,
    allPublicGroups: fetchPublicGroupReducer,
    allPrivateGroups: fetchPrivateGroupReducer,
    allReportedGroups: fetchReportedGroupReducer,
  },
});
export default store;
