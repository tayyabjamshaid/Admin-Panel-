import React, { useState, useMemo } from "react";
import RenderPagination from "./DataTable/RenderPagination";
import RenderSearch from "./DataTable/RenderSearch";
import * as moment from "moment";

// reactstrap components
import {
  CardTitle,
  Table,
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";

// import AdaptiveImage from "react-adaptive-image";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/img/def.png";
import Dropdown from "./DataTable/Dropdown";

function CheckReporters() {
  const params = useParams();
  const history = useHistory();
  const [userArray, setUserArray] = useState([]);
  const [search, setSearch] = useState("");

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(50);

  const { id: checkReporterId } = params;
  const { reportedUsers, error } = useSelector((state) => state.reportedUsers);

  const item = reportedUsers.find(
    (item) => item.reported.user_id === checkReporterId
  );
  const userArrayMethod = useMemo(() => {
    setUserArray(item.reported.user_report_me);
    let computedUsers = userArray;
    if (!error) {
      if (search) {
        computedUsers = computedUsers.filter(
          (users) =>
            users.reporter.username.toLowerCase().includes(search.toLowerCase())
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
  }, [userArray, currentPage, search, item, ITEMS_PER_PAGE]);

  return (
    <>
      <div className="content">
        <RenderSearch setSearch={setSearch} setCurrentPage={setCurrentPage} />

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Reporters</CardTitle>
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
                      <th>Reported Date</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userArrayMethod.length > 0 ? (
                      userArrayMethod.map((userAllData, i) => {
                        return (
                          <tr key={userAllData.reporter.user_id}>
                            <td
                              onClick={() => {
                                history.push(
                                  `/admin/userDetail/${userAllData.reporter.user_id}/reporters/${checkReporterId}`
                                );
                              }}
                            >
                              <div className="d-flex align-items-center p-2">
                                {userAllData.reporter.my_gallery_pictures
                                  .length > 0 ? (
                                  <div className="d-flex align-items-center p-2">
                                    <img
                                      src={
                                        userAllData.reporter
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
                            <td
                              onClick={() => {
                                history.push(
                                  `/admin/userDetail/${userAllData.reporter.user_id}/reporters/${checkReporterId}`
                                );
                              }}
                            >
                              {userAllData.reporter.username}
                            </td>

                            <td
                              onClick={() => {
                                history.push(
                                  `/admin/userDetail/${userAllData.reporter.user_id}/reporters/${checkReporterId}`
                                );
                              }}
                            >
                              {moment(userAllData.created_at).format(
                                "MMMM Do ,YYYY"
                              )}
                            </td>
                            <td
                              style={{ "width": "500px" }}
                              onClick={() => {
                                history.push(
                                  `/admin/userDetail/${userAllData.reporter.user_id}/reporters/${checkReporterId}`
                                );
                              }}
                            >
                              {userAllData.report_reason}
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
        <Button
          className="btn-fill"
          color="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            history.push(`/admin/reportedUsers`);
          }}
        >
          Go Back
        </Button>
      </div>
    </>
  );
}

export default CheckReporters;
