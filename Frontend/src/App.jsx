import {Routes,Route} from "react-router-dom"

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard"
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";

function App() {
  return (
    <>
      {/* <h1>Home</h1> */}
      <Routes>
        <Route
          path = "/"
          element = {
            <Home/>
          }
        />
        <Route
          path = "/dashboard"
          element = {
            <Dashboard/>
          }
        />
        <Route
          path = "/student"
          element = {
            <StudentDashboard/>
          }
        />
        <Route
          path = "/admin"
          element = {
            <AdminDashboard/>
          }
        />
        <Route
          path = "/info"
          element = {
            <div>Info</div>
          }
        />
        <Route
          path = "/login"
          element = {
            <div>Login</div>
          }
        />
        <Route
          path = "/register"
          element = {
            <div>Register</div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
