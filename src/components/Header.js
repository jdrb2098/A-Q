import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { userLogoutAction } from "../actions/userActions";
import Logo from "../assets/logos/LogoHAQ.png";

function Header() {
    const userInfo = useSelector((state) => state.user.user);

    const dispatch = useDispatch();
  
    const logoutHandler = () => {
      dispatch(userLogoutAction());
    };

  return (
    <header>
      <Navbar expand="lg"  className collapseOnSelect>
        <Container>
          <LinkContainer to="/"style={{ width: "20%" }} >
            <Navbar.Brand>
              <img alt="ISAMC" src={Logo} />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto d-flex w-100 justify-content-around navbarLinks">
              <LinkContainer to="/">
                <Nav.Link>
               <h5>Beneficios</h5> 
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/getting_started">
                <Nav.Link>
                <h5>Planes</h5>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/gitflow">
                <Nav.Link>
                <h5>Preguntas Frecuentes</h5>
                </Nav.Link>
              </LinkContainer>
              {userInfo.token ? (
                <NavDropdown title={userInfo.email} id="email">
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                  <h5>Login</h5>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr style={{padding: 0, margin: 0}} />
    </header>
  );
}

export default Header;