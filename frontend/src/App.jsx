import "./App.css";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./common/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Logout from "./screens/Logout";
import { useSelector } from "react-redux";

function App() {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <div className="App d-flex flex-column min-vh-100">
      {userInfo && <Header />}
      <main className="flex-fill py-3">
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/logout"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </main>
      {userInfo && <Footer />}
    </div>
  );
}

export default App;
