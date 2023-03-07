import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import "../style/header.css";

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const navItems = [
    { name: "Events", url: "/events" },
    { name: "Menus", url: "/menus" },
    { name: "Items", url: "/items" },
  ];
  return (
    <Navbar bg="primary" expand="sm">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-2" />
        <LinkContainer to="/">
          <Navbar.Brand className="text-secondary">
            Cocktail Express
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navItems.map((item) => (
              <LinkContainer key={item.name} to={item.url}>
                <Nav.Link className="text-secondary">{item.name}</Nav.Link>
              </LinkContainer>
            ))}
          </Nav>
          {userInfo && (
            <Nav className="ms-auto mr-5">
              <NavDropdown
                className="m-0 me-2 custom-color"
                title={userInfo.full_name}
                id="basic-nav-dropdown"
              >
                <LinkContainer className="pe-0" to="/profile">
                  <NavDropdown.Item>
                    <i
                      className="fas fa-edit text-black"
                      aria-hidden="true"
                    ></i>
                    <span className="ms-1 text-black">Profile</span>
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer className="pe-0" to="/logout">
                  <NavDropdown.Item>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span className="ms-1">Logout</span>
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
