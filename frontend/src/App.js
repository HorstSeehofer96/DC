import PirateForm from "./components/PirateForm"
import DisplayPirates from "./components/DisplayPirates";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, Container } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import PirateView from "./components/PirateView";

import './App.css'

function App() {

 

  return (

    <div  className="App">
      <header className="App-header">
      <Router>
        <Navbar expand="lg" style={
          {
            backgroundColor: '#783f04'
            
          }
          }>
          <Container>
            <Navbar.Brand style={{color: "white"}} href="/">Pirate Crew</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link style={{color: "white"}} href="/">Home</Nav.Link>
                <Nav.Link style={{color: "white"}} href="/addPirate">Create Pirate</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<DisplayPirates className="displayPirates" />} />
          <Route exact path="/addPirate" element={<PirateForm />} />
          <Route exact path="/pirate/:id" element={<PirateView />} />
        </Routes>
      </Router>
      </header>
    </div>

  );
}

export default App;
