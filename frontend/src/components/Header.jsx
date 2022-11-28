import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <Navbar bg="info" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">Cocktail Express</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-5" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#link">Events</Nav.Link>
            <Nav.Link href="#link">Menus</Nav.Link>
            <Nav.Link href="#link">Items</Nav.Link>
          </Nav>
          {userInfo && (
            <Nav className="ms-auto mr-5">
              <NavDropdown
                title={userInfo.full_name}
                id="basic-nav-dropdown"
                className="m-0"
              >
                <NavDropdown.Item href="#action/3.1">
                  <i class="fas fa-edit" aria-hidden="true"></i>
                  <span className="ms-2">Edit profile</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  <span className="ms-2">Logout</span>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
