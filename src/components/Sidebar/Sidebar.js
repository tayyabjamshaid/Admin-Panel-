import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import "../../assets/css/SideBar.css";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import clsx from "clsx";
import { BsChevronCompactRight, BsChevronUp } from "react-icons/bs";

// reactstrap components
import { Nav, NavLink as ReactstrapNavLink, Collapse } from "reactstrap";
import {
  BackgroundColorContext,
  backgroundColors,
} from "contexts/BackgroundColorContext";

var ps;

function Sidebar(props) {
  const location = useLocation();
  const sidebarRef = React.useRef(null);
  const [subnav, setSubnav] = useState(false);
  const [showIndicator, setshowIndicator] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  const [invoicesOpen, setinvoicesOpen] = useState(false);
  const toggleinvoices = (event) => {
    setinvoicesOpen(!invoicesOpen);
    setshowIndicator(!showIndicator);
    event.preventDefault();
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active nav-link" : "nav-link";
  };
  useEffect(() => {
    if (
      location.pathname === "/admin/public" ||
      location.pathname === "/admin/private" ||
      location.pathname === "/admin/reportedGroups"
    ) {
      setinvoicesOpen(!invoicesOpen);
      setshowIndicator(!showIndicator);
    }
  }, []);
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  const linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  const { routes, rtlActive, logo } = props;
  let logoImg = null;
  let logoText = null;
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoText = (
        <a
          href={logo.outterLink}
          className="simple-text logo-normal"
          target="_blank"
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </a>
      );
    } else {
      logoImg = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-mini"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </Link>
      );
      logoText = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-normal"
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </Link>
      );
    }
  }
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="sidebar" data={color}>
          <div className="sidebar-wrapper" ref={sidebarRef}>
            <Nav>
              <li className={activeRoute("/admin/tables" ? " active-pro" : "")}>
                <NavLink activeClassName="active" to="/admin/tables">
                  <span className="sidebar-icon">
                    <i class="fa fa-user" aria-hidden="true"></i>
                  </span>{" "}
                  <span
                    style={{
                      "fontSize": "13px",
                      "color": "white",
                    }}
                  >
                    Users
                  </span>
                </NavLink>
              </li>
              <li>
                <Link
                  style={{ "marginLeft": "29px" }}
                  to="#/"
                  onClick={toggleinvoices}
                  className={clsx({ active: invoicesOpen })}
                >
                  <span className="sidebar-icon">
                    <i class="fa fa-users" aria-hidden="true"></i>
                  </span>
                  <span>
                    <span style={{ "fontSize": "13px" }}>Groups</span>
                    <span className="indicator" style={{ "fontSize": "17px" }}>
                      {showIndicator == false ? (
                        <BsChevronCompactRight />
                      ) : (
                        <BsChevronUp />
                      )}
                    </span>
                  </span>
                </Link>

                <Collapse isOpen={invoicesOpen}>
                  <li
                    className={activeRoute(
                      "/admin/public" ? " active-pro" : ""
                    )}
                  >
                    <NavLink activeClassName="active" to="/admin/public">
                      <span className="sidebar-icon">
                        <i class="fa fa-user" aria-hidden="true"></i>
                      </span>
                      <span
                        style={{
                          "fontSize": "10px",
                        }}
                      >
                        Public Groups
                      </span>
                    </NavLink>
                  </li>
                  <li
                    className={activeRoute(
                      "/admin/private" ? " active-pro" : ""
                    )}
                  >
                    <NavLink activeClassName="active" to="/admin/private">
                      <span className="sidebar-icon">
                        <i class="fa fa-user" aria-hidden="true"></i>
                      </span>
                      <span
                        style={{
                          "fontSize": "10px",
                        }}
                      >
                        Private Groups
                      </span>
                    </NavLink>
                  </li>
                  {/* <li
                    className={activeRoute(
                      "/admin/reportedGroups" ? " active-pro" : ""
                    )}
                  >
                    <NavLink
                      activeClassName="active"
                      to="/admin/reportedGroups"
                    >
                      <span className="sidebar-icon">
                        <i class="fa fa-user" aria-hidden="true"></i>
                      </span>
                      <span
                        style={{
                          "fontSize": "10px",
                        }}
                      >
                        Reported Groups
                      </span>
                    </NavLink>
                  </li> */}
                </Collapse>
              </li>

              <li
                className={activeRoute(
                  "/admin/reportedUsers" ? " active-pro" : ""
                )}
              >
                <NavLink activeClassName="active" to="/admin/reportedUsers">
                  <span className="sidebar-icon">
                    <i className="fas fa-exclamation-circle"></i>
                  </span>{" "}
                  <span
                    style={{
                      "fontSize": "13px",
                      "color": "white",
                    }}
                  >
                    Reported Users
                  </span>
                </NavLink>
              </li>
              <li
                className={activeRoute(
                  "/admin/blockedUsers" ? " active-pro" : ""
                )}
              >
                <NavLink activeClassName="active" to="/admin/blockedUsers">
                  <span className="sidebar-icon">
                    <i class="fa fa-ban" aria-hidden="true"></i>
                  </span>{" "}
                  <span
                    style={{
                      "fontSize": "13px",
                      "color": "white",
                    }}
                  >
                    Blocked Users
                  </span>
                </NavLink>
              </li>
            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    text: PropTypes.node,
    imgSrc: PropTypes.string,
  }),
};

export default Sidebar;
