import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as moment from "moment";
import { useHistory } from "react-router-dom";
import logo from "../assets/img/def.png";
// reactstrap components
import "../assets/css/PublicGroup.css";
import Loading from "./DataTable/Loading";
import RenderSearch from "./DataTable/RenderSearch";

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

import { fetchPublicGroups } from "Reducers/fetchPublicGroups";
import Dropdown from "./DataTable/Dropdown";

function PublicGroup() {
  const dispatch = useDispatch();
  const [userArray, setUserArray] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(50);
  const history = useHistory();

  const { publicGroups, error } = useSelector((state) => state.allPublicGroups);

  useEffect(() => {
    dispatch(fetchPublicGroups());
  }, [dispatch]);

  const userArrayMethod = useMemo(() => {
    setUserArray(publicGroups);

    let computedUsers = userArray;
    if (!error) {
      if (search) {
        computedUsers = computedUsers.filter((users) =>
          users.group_name.toLowerCase().includes(search.toLowerCase())
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
  }, [userArray, currentPage, search, publicGroups, ITEMS_PER_PAGE]);

  return (
    <>
      <div className="content">
        <RenderSearch setSearch={setSearch} setCurrentPage={setCurrentPage} />
        <Row>
          {" "}
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Public Groups</CardTitle>
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
                      <th>Name</th>
                      <th>Created</th>
                      <th>Type</th>
                      <th>Total Members</th>
                    </tr>
                  </thead>

                  <tbody>
                    {" "}
                    {userArrayMethod.length > 0 ? (
                      userArrayMethod.map((userAllData, i) => {
                        return (
                          <tr
                            key={userAllData.group_id}
                            onClick={() => {
                              history.push(
                                `/admin/groupDetail/${userAllData.group_id}/public`
                              );
                            }}
                          >
                            <td>
                              <div className="d-flex align-items-center p-2">
                                {userAllData.group_image == null ? (
                                  <img
                                    src={logo}
                                    className="rounded-circle sd"
                                    alt="avatar"
                                    width="55"
                                    height="55"
                                  />
                                ) : (
                                  <div className="d-flex align-items-center p-2">
                                    <img
                                      src={userAllData.group_image}
                                      className="rounded-circle sd"
                                      alt="avatar"
                                      width="55"
                                      height="55"
                                    />
                                  </div>
                                )}
                              </div>
                            </td>

                            <td>
                              {userAllData.group_name?.length > 10
                                ? userAllData.group_name.substr(0, 10 - 1) +
                                  "..."
                                : userAllData.group_name}
                            </td>
                            <td>
                              {moment(userAllData.created_at).format(
                                "Do MMMM YYYY"
                              )}
                            </td>
                            <td>Public</td>
                            <td>{userAllData.group_members.length}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <Loading purpose="NO GROUPS FOUND" />
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

export default PublicGroup;
