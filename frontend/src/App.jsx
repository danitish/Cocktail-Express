import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./common/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Logout from "./screens/Logout";
import Items from "./screens/Items";
import Menus from "./screens/Menus";
import Menu from "./screens/Menu";

import { useSelector } from "react-redux";

function App() {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <div className="App d-flex flex-column min-vh-100">
      <ToastContainer />
      {userInfo && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      {userInfo && (
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
              {/* <Route path="/login" element={<Login />} /> */}
              <Route
                path="/logout"
                element={
                  <ProtectedRoute>
                    <Logout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/items"
                element={
                  <ProtectedRoute>
                    <Items />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/menus"
                element={
                  <ProtectedRoute>
                    <Menus />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/menus/:id"
                element={
                  <ProtectedRoute>
                    <Menu />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
        </main>
      )}
      {userInfo && <Footer />}
    </div>
  );
}

export default App;
