import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; 
import { auth } from '../../firebase';
import { setUser } from '../../pages/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';

const Header = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.user)
  const logOut=()=>{
    signOut(auth).then(() => {
      //reste user state
      dispatch(setUser({}));
    })
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav>
              {
                user?.uid ?
              <Nav>
                  <NavDropdown title={user.email && user.email.split("@")[0]} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Dashboard</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/login" onClick={logOut}>LogOut</NavDropdown.Item>
            </NavDropdown>
              </Nav>
                :
                <Nav>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </Nav>
              }
             
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
