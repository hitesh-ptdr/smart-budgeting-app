import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mynavbar from "./Components/Mynavbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";  

function App() {
  return (
    <Router>
      <Mynavbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <div className="container mt-4">
              <Dashboard />
            </div>
          }
        />

        <Route
          path="/login"
          element={
            <div className="container mt-4">
              <Login />
            </div>
          }
        />

        <Route
          path="/register"
          element={
            <div className="container mt-4">
              <Register />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
