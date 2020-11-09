import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import Beranda from './Beranda';
import Detail from './Detail';
import MyPokemon from './MyPokemon';
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Pokedex by Reza Ararsy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/mypokemon/">My Pokemon</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <Route exact path="/" component={Beranda} />
          <Route path="/detail/:name" component={Detail} />
          <Route path="/mypokemon" component={MyPokemon} />
        </Container>
      </Router>
    );
  }
}

export default App;
