import {Routes,Route, useNavigate} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
// import {URL} from "./constants/backend"

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard"
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Info from "./pages/AboutUs/Info"
import AboutUs from "./pages/AboutUs/AboutUs"
import ContactUs from "./pages/Contactus/ContactUs"
import Loader from "./components/Loader/Loader";
import NoMatch from "./pages/NoMatch/NoMatch";
import Profile from "./pages/Profile/Profile";
import AttendancePage from "./pages/AttendancePage/AttendancePage"

import {userActions} from "./store/userSlice"
import {loadingActions} from "./store/loadingSlice"

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const getUserData = async () => {
    try{
      
      dispatch(loadingActions.showLoading())
      const res = await axios.get("/api/getCookieDetails")
      dispatch(loadingActions.hideLoading())
      
      // console.log('App.js')
      // console.log(res.data);
      
      if(res.data.success){
        dispatch(userActions.setUser(res.data.data.user))
        navigate("/")
      }
      else{
        dispatch(userActions.setUser(null))
      }

      
    }catch(err){
      console.log("App.js Error");
      console.log(err)
      dispatch(loadingActions.hideLoading())
    }
  }
   
  useEffect(() => {
    getUserData();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  // getUserData();
  
  const loading = useSelector(state => state.loading.loading)
  const user = useSelector(state => state.user.user)
  // setUser(user)

  // console.log("In App");
  // console.log(user)
  // console.log(user?.user.userType);

  return (
    <>
      {loading && <Loader/>}
      <Toaster position="top-center"/>
      {(user === null) && (
          <Routes>
            <Route
              path = "/"
              element = {
                <Home/>
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
            <Route
              path = "/contactus"
              element = {
                <ContactUs/>
              }
            />
            <Route
              path = "*"
              element = {
                <NoMatch/>
              }
            />
        </Routes>
      )}
      {(user?.userType === "student") && (
        <Routes>
          <Route
            path = "/"
            element = {
              <StudentDashboard/>
            }
          />
          <Route
            path = "/contactus"
            element = {
              <ContactUs/>
            }
          />
          <Route
            path = "/profile"
            element = {
              <Profile/>
            }
          />
          <Route
              path = "/AboutUs"
              element ={
                <AboutUs/>
              }
            />
          <Route
              path = "/info"
              element = {
                <Info/>
              }
            /> 
          <Route
              path = "/seeAttendance/:cid"
              element = {
                <AttendancePage/>
              }
            />
          <Route
            path = "*"
            element = {
              <NoMatch/>
            }
          />
        </Routes>
      )}
      {(user?.userType === "admin") && (
        <Routes>
          <Route
            path = "/"
            element = {
              <AdminDashboard/>
            }
          />
          <Route
            path = "/contactus"
            element = {
              <ContactUs/>
            }
          />
          <Route
              path = "/AboutUs"
              element ={
                <AboutUs/>
              }
            />
          <Route
            path = "/profile"
            element = {
              <Profile/>
            }
          />
          <Route
              path = "/info"
              element = {
                <Info/>
              }
            />
          <Route
            path = "*"
            element = {
              <NoMatch/>
            }
          />
        </Routes>
      )}
      {(user?.userType === "teacher") && (
        <Routes>
          <Route
            path = "/"
            element = {
              <TeacherDashboard/>
            }
          />
          <Route
            path = "/contactus"
            element = {
              <ContactUs/>
            }
          />
          <Route
            path = "/profile"
            element = {
              <Profile/>
            }
          />
          <Route
              path = "/AboutUs"
              element ={
                <AboutUs/>
              }
            />
          <Route
              path = "/info"
              element = {
                <Info/>
              }
            />
          <Route
              path = "/seeAttendance/:cid"
              element = {
                <AttendancePage/>
              }
            />
          <Route
            path = "*"
            element = {
              <NoMatch/>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
