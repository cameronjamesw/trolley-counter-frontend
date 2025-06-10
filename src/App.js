import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import HomePage from "./pages/HomePage";
import AddTrolleyForm from "./pages/trollies/AddTrolleyForm";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/sign-in/" element={<SignInForm />} />
          <Route path="/sign-up/" element={<SignUpForm />} />
          <Route exact path="/add-trolley/" element={<AddTrolleyForm />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
