import "./App.css";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./screens/Login";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill py-3">
        <Container>
          <h1>MAIN</h1>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
