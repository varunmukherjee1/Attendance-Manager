import {Routes,Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard"
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Info from "./pages/AboutUs/Info"
import AboutUs from "./pages/AboutUs/AboutUs"
import ContactUs from "./pages/Contactus/ContactUs"

function App() {
  return (
    <>
      {/* <h1>Home</h1> */}
      <Toaster position="top-center"/>
      <Routes>
        <Route
          path = "/"
          element = {
            <Home/>
          }
        />
        <Route
          path = "/student"
          element = {
            <StudentDashboard/>
          }
        />
        <Route
          path = "/teacher"
          element = {
            <TeacherDashboard/>
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
            <Info/>
          }
        />

        <Route
        
        path = "/AboutUs"
        element ={
          <AboutUs/>
        }/>

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

        <Route
          path = "/contactus"
          element = {
            <ContactUs/>
          }
        />
      </Routes>
    </>
  );
}

export default App;
