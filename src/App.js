import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar';
import SignInSignUp from './auth/SignInSignUp';
import { Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      < NavBar />
      <Container>
        <Routes>
        <Route path="/sign-in/" element={<SignInSignUp />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
