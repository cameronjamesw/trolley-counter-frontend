import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import TrolleyIndex from './components/TrolleyIndex';

function App() {
  return (
    <div className="App">
      < NavBar />
      <TrolleyIndex />
      <Container>
        <Routes>
        <Route path="/sign-in/" element={<SignInForm />} />
        <Route path="/sign-up/" element={<SignUpForm />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
