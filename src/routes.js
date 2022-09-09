import GroupProfile from "views/GroupProfile";
import PrivateGroup from "views/PrivateGroup";
import PublicGroup from "views/PublicGroup";
import CheckReporters from "views/CheckReporters";
import ReportedTableList from "views/ReportedTableList";
import TableList from "views/TableList.js";
import UserProfile from "views/UserProfile.js";
import BlockedUsers from "views/BlockedUsers";
import ReportedGroupsList from "views/ReportedGroupsList";

var routes = [
  {
    isProfile: false,
    path: "/tables",
    name: "Users",

    component: TableList,
    layout: "/admin",
  },
  {
    isProfile: false,
    path: "/reportedGroups",
    name: "Reported Groups",

    component: ReportedGroupsList,
    layout: "/admin",
  },
  {
    isProfile: false,
    path: "/private",
    name: "Private Group",

    component: PrivateGroup,
    layout: "/admin",
  },
  {
    isProfile: false,
    path: "/public",
    name: "Public Group",
    component: PublicGroup,
    layout: "/admin",
  },
  {
    isProfile: false,
    path: "/blockedUsers",
    name: "Blocked Users",
    component: BlockedUsers,
    layout: "/admin",
  },

  {
    isProfile: false,
    path: "/reportedUsers",
    name: "Reported Users",
    component: ReportedTableList,
    layout: "/admin",
  },

  {
    isProfile: true,
    path: "/userDetail/:id/:page?/:linkId?",
    name: "User Profile",
    component: UserProfile,
    layout: "/admin",
  },

  {
    isProfile: true,
    path: "/groupDetail/:id/:type?",
    name: "Group Profile",
    component: GroupProfile,
    layout: "/admin",
  },
  {
    isProfile: true,
    path: "/checkReporters/:id",
    name: "Reported By Details",
    component: CheckReporters,
    layout: "/admin",
  },
];
export default routes;
