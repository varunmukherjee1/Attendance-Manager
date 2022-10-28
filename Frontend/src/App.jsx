import {Routes,Route} from "react-router-dom"

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

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
            <Login/>
          }
        />
        <Route
          path = "/register"
          element = {
            <Register/>
          }
        />
      </Routes>
    </>
  );
}

export default App;
