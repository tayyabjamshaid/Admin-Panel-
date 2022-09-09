import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../assets/img/def.png";

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
import RenderSearch from "./DataTable/RenderSearch";
import { fetchBlockedUsers, blockFromAllBlockPage } from "Reducers/blockUsers";
import "../assets/css/TableList.css";
import Loading from "./DataTable/Loading";
import Dropdown from "./DataTable/Dropdown";

function BlockedUsers() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userArray, setUserArray] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(50);

  const { blockedUsers, error } = useSelector((state) => state.blockedUsers);
  useEffect(() => {
    dispatch(fetchBlockedUsers());
  }, [dispatch]);
  const userArrayMethod = useMemo(() => {
    setUserArray(blockedUsers);

    let computedUsers = userArray;
    if (!error) {
      if (search) {
        computedUsers = computedUsers.filter(
          (users) =>
            users.username.toLowerCase().includes(search.toLowerCase()) ||
            users.phone.includes(search)
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
  }, [userArray, currentPage, search, blockedUsers, ITEMS_PER_PAGE]);

  return (
    <>
      <div className="content">
        <RenderSearch setSearch={setSearch} setCurrentPage={setCurrentPage} />
        <Row>
          {" "}
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Blocked Users</CardTitle>
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
                      <th>User Name</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Blocked By</th>
                      <th>Blocked Reason</th>
                    </tr>
                  </thead>

                  <tbody>
                    {" "}
                    {userArrayMethod.length > 0 ? (
                      userArrayMethod.map((userAllData) => {
                        return (
                          <tr key={userAllData.user_id}>
                            <td
                              onClick={() => {
                                history.push(
                                  `/admin/userDetail/${userAllData?.user_id}/blocked`
                                );
                              }}
                            >
                              <div className="d-flex align-items-center p-2">
                                {userAllData?.my_gallery_pictures?.length >
                                0 ? (
                                  <div className="d-flex align-items-center p-2">
                                    <img
                                      src={
                                        userAllData?.my_gallery_pictures[0]
                                          .picture_url
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
                                  `/admin/userDetail/${userAllData?.user_id}/blocked`
                                );
                              }}
                            >
                              {userAllData?.username}
                            </td>

                            <td
                              onClick={() => {
                                history.push(
                                  `/admin/userDetail/${userAllData?.user_id}/blocked`
                                );
                              }}
                            >
                              {userAllData?.phone}
                            </td>
                            <td>
                              <Button
                                onClick={() =>
                                  dispatch(
                                    blockFromAllBlockPage({
                                      user_id: userAllData?.user_id,
                                      status: "APPROVED",
                                      blocked_for: "STATIC",
                                      page: "BLOCK_PAGE",
                                    })
                                  )
                                }
                                className="btn-fill"
                                color="primary"
                                style={{ "width": "140px", height: "40px" }}
                              >
                                UnBlock
                              </Button>
                            </td>
                            <td
                              onClick={() => {
                                history.push(
                                  `/admin/userDetail/${userAllData?.user_id}/blocked`
                                );
                              }}
                              style={{ "fontSize": "50px" }}
                            >
                              {userAllData?.blocked_for === "FOR_OTHER" ? (
                                <i class="fa fa-user" aria-hidden="true"></i>
                              ) : (
                                <i className="fas fa-exclamation-circle"></i>
                              )}
                            </td>
                            <td style={{ "width": "290px" }}>
                              {userAllData.blocked_reason == null ? (
                                <span>Reporting Reason</span>
                              ) : (
                                <span>{userAllData.blocked_reason}</span>
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

export default BlockedUsers;
