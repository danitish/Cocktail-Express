import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <Navbar bg="info" expand="sm">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-2" />
        <LinkContainer to="/">
          <Navbar.Brand>Cocktail Express</Navbar.Brand>
        </LinkContainer>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/events">
              <Nav.Link>Events</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/menus">
              <Nav.Link>Menus</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/items">
              <Nav.Link>Items</Nav.Link>
            </LinkContainer>
          </Nav>
          {userInfo && (
            <Nav className="ms-auto mr-5">
              <NavDropdown
                title={userInfo.full_name}
                id="basic-nav-dropdown"
                className="m-0 me-2"
              >
                <LinkContainer className="pe-0" to="/edit-profile">
                  <NavDropdown.Item>
                    <i className="fas fa-edit" aria-hidden="true"></i>
                    <span className="ms-1">Edit profile</span>
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
