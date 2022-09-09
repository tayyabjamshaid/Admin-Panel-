import React, { useState, useMemo } from "react";
import * as moment from "moment";
import RenderPagination from "./DataTable/RenderPagination";

// reactstrap components
import {
  CardTitle,
  Table,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Row,
  Badge,
  Col,
} from "reactstrap";

import "../assets/css/GroupProfile.css";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/img/def.png";
import Dropdown from "./DataTable/Dropdown";

function GroupProfile() {
  const params = useParams();
  const history = useHistory();
  const [userArray, setUserArray] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(50);

  const { id: groupId, type } = params;

  const { publicGroups } = useSelector((state) => state.allPublicGroups);

  const item = publicGroups.find((item) => item.group_id === groupId);
  let members = item.group_members;

  const userArrrayMethod = useMemo(() => {
    setUserArray(members);

    let computedUsers = userArray;
    setTotalItems(computedUsers.length);
    return computedUsers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [userArray, currentPage, members, ITEMS_PER_PAGE]);

  return (
    <>
      <div className="content">
        <Button
          className="btn-fill"
          color="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            {
              type == "public"
                ? history.push("/admin/public")
                : history.push("/admin/private");
            }
          }}
        >
          Go Back
        </Button>
        <h2 className="text-center">Group Detail</h2>
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  {item.group_image == null ? (
                    <img
                      alt="..."
                      className="avatar"
                      style={{ "objectFit": "cover" }}
                      src={logo}
                    />
                  ) : (
                    <>
                      <img
                        alt="..."
                        id="df"
                        className="avatar mm"
                        style={{ "objectFit": "cover" }}
                        src={item.group_image}
                      />
                    </>
                  )}

                  <h5 className="title"> {item.group_name}</h5>
                  <p className="description" style={{ "color": "#d94fd3" }}>
                    {type == "public" ? "Public" : "Private"}
                  </p>

                  <div className="container">
                    <div className="text-center row justify-content-center my-4">
                      <div className="md-3">
                        <p className="text mx-1 mb-1" style={{ fontSize: 18 }}>
                          Members
                        </p>
                        <Badge
                          pill
                          style={{ "fontSize": "15px" }}
                          color="neutral-danger"
                          className="text-danger mx-1"
                        >
                          {members.length}
                        </Badge>
                      </div>
                      <div className="md-2"></div>
                      <div className="md-3">
                        <p className="text mx-1 mb-1" style={{ fontSize: 18 }}>
                          Created
                        </p>
                        <Badge
                          pill
                          style={{ "fontSize": "15px" }}
                          color="neutral-warning"
                          className="text-warning mx-1"
                        >
                          {moment(item.created_at).format("Do MMMM YYYY")}
                        </Badge>
                      </div>
                      <div className="md-2"></div>
                      <div className="md-2">
                        <p className="text mx-1 mb-1" style={{ fontSize: 18 }}>
                          Created By
                        </p>
                        <Badge
                          style={{ "fontSize": "15px", "cursor": "pointer" }}
                          onClick={() => {
                            history.push(
                              `/admin/userDetail/${item.group_creator.user_id}/${type}/${groupId}`
                            );
                          }}
                          pill
                          color="neutral-danger"
                          className="text-danger mx-1"
                        >
                          {item.group_creator.username}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h2">Members</CardTitle>
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
                      <th>No</th>
                      <th>Picture</th>
                      <th>User Name</th>
                      <th>Birthday</th>
                      <th>Creation Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userArrrayMethod?.length !== 0 ? (
                      userArrrayMethod.map((userAllData, i) => {
                        return (
                          <tr
                            key={userAllData.user_id}
                            onClick={() => {
                              history.push(
                                `/admin/userDetail/${userAllData.member.user_id}/${type}/${groupId}`
                              );
                            }}
                          >
                            <td>{i + 1}</td>
                            <td>
                              <div className="d-flex align-items-center p-2">
                                {userAllData.member.my_gallery_pictures.length >
                                0 ? (
                                  <div className="d-flex align-items-center p-2">
                                    <img
                                      src={
                                        userAllData.member
                                          .my_gallery_pictures[0].picture_url
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
                            <td>{userAllData.member.username}</td>

                            {userAllData.birthday == null ? (
                              <td>August 14,1996</td>
                            ) : (
                              <td>{userAllData.birthday}</td>
                            )}
                            <td>
                              {moment(userAllData.created_at).format(
                                "MMMM Do ,YYYY"
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <h1>No Table Data</h1>
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

export default GroupProfile;
