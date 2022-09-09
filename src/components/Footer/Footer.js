import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink>
              <Link to="/admin/tables">Defigram</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to="/admin/tables"> About Us</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to="/admin/tables"> Blog</Link>
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} made with{" "}
          <i className="tim-icons icon-heart-2" /> by{" "}
          <Link to="/admin/tables">Defigram</Link> for a better web.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
