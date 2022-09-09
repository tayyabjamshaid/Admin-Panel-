import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../assets/img/def.png";
import RenderSearch from "./DataTable/RenderSearch";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
import RenderPagination from "./DataTable/RenderPagination";
import "../assets/css/TableList.css";
import { fetchReportedGroups } from "../Reducers/fetchReportedGroups";
import Loading from "./DataTable/Loading";
import Dropdown from "./DataTable/Dropdown";

function Tables() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userArray, setUserArray] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(50);

  const { reportedGroups, error } = useSelector(
    (state) => state.allReportedGroups
  );

  useEffect(() => {
    dispatch(fetchReportedGroups());
  }, [dispatch]);
  const userArrayMethod = useMemo(() => {
    setUserArray(reportedGroups);

    let computedUsers = userArray;
    if (!error) {
      if (search) {
        computedUsers = computedUsers.filter(
          (users) =>
            users.reported.username.toLowerCase().includes(search.toLowerCase())

          // users.birthday.toLowerCase().includes(search.toLowerCase())
        );
      }
      setTotalItems(computedUsers.length);
      return computedUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    } else {
      return <h1>NO TABLE DATA</h1>;
    }
  }, [userArray, currentPage, search, reportedGroups, ITEMS_PER_PAGE]);

  return (
    <>
      <div className="content">
        <RenderSearch setSearch={setSearch} setCurrentPage={setCurrentPage} />
        <Row>
          {" "}
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Reported Users</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive hover>
                  <thead
                    style={{
                      "backgroundColor": "#247bf7",
                      "height": "61px",
                    }}
                  >
                    <tr>
                      <th>Picture</th>
                      <th>Creator Name</th>
                      <th>Total Reports</th>
                      <th>Reported By</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {" "}
                    {userArrayMethod.length > 0 ? (
                      userArrayMethod.map((userAllData) => {
                        return (
                          <tr key={userAllData?.reported?.user_id}>
                            <td
                              onClick={() => {
                                history.push(
                                  `/admin/userDetail/${userAllData?.reported?.user_id}/reportList`
                                );
                              }}
                            >
                              <div className="d-flex align-items-center p-2">
                                {userAllData?.reported?.my_gallery_pictures
                                  ?.length > 0 ? (
                                  <div className="d-flex align-items-center p-2">
                                    <img
                                      src={
                                        userAllData?.reported
                                          ?.my_gallery_pictures[0].picture_url
                                      }
                                      className="rounded-circle sd"
                                      alt="avatar"
                                      width="55"
                                      height="55"
                                    />
                                  </div>
                                ) : (
                                  <img
                                    src={logo}
                                    className="rounded-circle sd"
                                    alt="avatar"
                                    width="55"
                                    height="55"
                                  />
                                )}
                              </div>
                            </td>
                            <td
                              onClick={() => {
                                history.push(
                                  `/admin/userDetail/${userAllData?.reported?.user_id}/reportList`
                                );
                              }}
                            >
                              {userAllData?.reported?.username}
                            </td>

                            <td
                              onClick={() => {
                                history.push(
                                  `/admin/userDetail/${userAllData?.reported?.user_id}/reportList`
                                );
                              }}
                            >
                              {userAllData?.reported?.user_report_me?.length}
                            </td>
                            <td>
                              <button
                                className="btnn succcess"
                                onClick={() => {
                                  history.push(
                                    `/admin/checkReporters/${userAllData?.reported?.user_id}`
                                  );
                                }}
                                style={{
                                  "width": "140px",
                                  "height": "40px",
                                }}
                              >
                                View
                              </button>
                            </td>
                            <td>
                              {userAllData?.reported?.admin_approval ===
                              "APPROVED" ? (
                                <Button
                                  className="btn-fill"
                                  color="primary"
                                  style={{
                                    "width": "140px",
                                    "height": "40px",
                                  }}
                                  // onClick={() => {
                                  //   dispatch(
                                  //     BlockPageUser(
                                  //       userAllData?.reported?.user_id,
                                  //       "BLOCKED",
                                  //       "FOR_REPORT",
                                  //       "REPORT_PAGE"
                                  //     )
                                  //   );
                                  // }}
                                >
                                  Block
                                </Button>
                              ) : (
                                <Button
                                  className="btn-fill"
                                  color="primary"
                                  style={{ "width": "140px", height: "40px" }}
                                  // onClick={() =>
                                  //   dispatch(
                                  //     BlockPageUser(
                                  //       userAllData?.reported?.user_id,
                                  //       "APPROVED",
                                  //       "STATIC",
                                  //       "REPORT_PAGE"
                                  //     )
                                  //   )
                                  // }
                                >
                                  UnBlock
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <Loading purpose="NO USERS FOUND" />
                    )}
                  </tbody>
                </Table>
                <div className="paginationSet">
                  <RenderPagination
                    totalItems={totalItems}
                    ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                  <Dropdown
                    setITEMS_PER_PAGE={setITEMS_PER_PAGE}
                    ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                  />{" "}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
