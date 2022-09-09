import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as moment from "moment";
import { useHistory } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Modal,
  Input,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
import RenderPagination from "./DataTable/RenderPagination";
import RenderSearch from "./DataTable/RenderSearch";
import "../assets/css/TableList.css";
import logo from "../assets/img/def.png";
import Loading from "./DataTable/Loading";
import { fetchallUsers, blockUserPage } from "Reducers/fetchAllUsers";
import Dropdown from "./DataTable/Dropdown";

function Tables() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userArray, setUserArray] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [reason, setReason] = useState("");
  const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(50);

  const { allUsers, error } = useSelector((state) => state.allUserData);

  const toggle = () => setModal(!modal);
  useEffect(() => {
    dispatch(fetchallUsers());
  }, [dispatch]);
  const userArrayMethod = useMemo(() => {
    setUserArray(allUsers);

    let computedUsers = userArray;
    if (!error) {
      if (search) {
        computedUsers = computedUsers.filter(
          (users) =>
            users.username.toLowerCase().includes(search.toLowerCase()) ||
            users.phone.includes(search)
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
  }, [userArray, currentPage, search, allUsers, ITEMS_PER_PAGE]);
  const blockUser = () => {
    let user_id = localStorage.getItem("userId");
    if (!reason) {
      dispatch(
        blockUserPage({
          user_id,
          status: "BLOCKED",
          blocked_for: "FOR_OTHER",
          page: "TABLE_PAGE",
          blocked_reason: ".....",
        })
      );
    } else {
      dispatch(
        blockUserPage({
          user_id,
          status: "BLOCKED",
          blocked_for: "FOR_OTHER",
          page: "TABLE_PAGE",
          blocked_reason: reason,
        })
      );
    }
    toggle();
    setReason("");
  };

  return (
    <>
      <div className="content">
        <RenderSearch setSearch={setSearch} setCurrentPage={setCurrentPage} />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">All Users</CardTitle>
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
                      <th>Birthday</th>
                      <th>Creation Date</th>
                      <th>Phone</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userArrayMethod.length > 0 ? (
                      userArrayMethod.map((userAllData, i) => {
                        return (
                          <tr key={userAllData.user_id}>
                            <td
                              onClick={() => {
                                history.push(
                                  `/admin/userDetail/${userAllData.user_id}/allUsers`
                                );
                              }}
                            >
                              <div className="d-flex align-items-center p-2">
                                {userAllData.my_gallery_pictures.length > 0 ? (
                                  <div className="d-flex align-items-center p-2">
                                    <img
                                      src={
                                        userAllData.my_gallery_pictures[0]
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
                                  `/admin/userDetail/${userAllData.user_id}/allUsers`
                                );
                              }}
                            >
                              {userAllData.username}
                            </td>

                            {userAllData.birthday == null ? (
                              <td
                                onClick={() => {
                                  history.push(
                                    `/admin/userDetail/${userAllData.user_id}/allUsers`
                                  );
                                }}
                              >
                                August 14,1996
                              </td>
                            ) : (
                              <td
                                onClick={() => {
                                  history.push(
                                    `/admin/userDetail/${userAllData.user_id}/allUsers`
                                  );
                                }}
                              >
                                {userAllData.birthday}
                              </td>
                            )}
                            <td
                              onClick={() => {
                                history.push(
                                  `/admin/userDetail/${userAllData.user_id}/allUsers`
                                );
                              }}
                            >
                              {moment(userAllData.created_at).format(
                                "MMMM Do ,YYYY"
                              )}
                            </td>
                            <td
                              onClick={() => {
                                history.push(
                                  `/admin/userDetail/${userAllData.user_id}/allUsers`
                                );
                              }}
                            >
                              {userAllData.phone}
                            </td>
                            <td className="text-center">
                              {userAllData?.admin_approval === "APPROVED" ? (
                                <>
                                  <Button
                                    className="btn-fill"
                                    color="primary"
                                    style={{
                                      "width": "140px",
                                      "height": "40px",
                                    }}
                                    onClick={() => {
                                      toggle();
                                      localStorage.setItem(
                                        "userId",
                                        userAllData.user_id
                                      );
                                    }}
                                  >
                                    Block
                                  </Button>
                                  <Modal
                                    isOpen={modal}
                                    toggle={toggle}
                                    style={{ "marginTop": "14%" }}
                                  >
                                    <ModalHeader toggle={toggle}>
                                      <span style={{ "fontSize": "30px" }}>
                                        Block Reason:
                                      </span>
                                    </ModalHeader>

                                    <ModalBody>
                                      <Input
                                        style={{
                                          "fontSize": "20px",
                                          "color": "black",
                                        }}
                                        type="textarea"
                                        onChange={(e) => {
                                          setReason(e.target.value);
                                        }}
                                      />
                                    </ModalBody>
                                    <ModalFooter
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginBottom: "2%",
                                      }}
                                    >
                                      <Button
                                        color="primary"
                                        onClick={() => {
                                          blockUser();
                                        }}
                                      >
                                        Block
                                      </Button>
                                    </ModalFooter>
                                  </Modal>
                                </>
                              ) : (
                                <Button
                                  className="btn-fill"
                                  color="primary"
                                  style={{ "width": "140px", height: "40px" }}
                                  onClick={() =>
                                    dispatch(
                                      blockUserPage({
                                        user_id: userAllData?.user_id,
                                        status: "APPROVED",
                                        blocked_for: "STATIC",
                                        page: "TABLE_PAGE",
                                      })
                                    )
                                  }
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
                </Table>{" "}
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
                  />
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
