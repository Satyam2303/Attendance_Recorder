import "./App.css";
import Homepage from "./components/HomePage/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/userSlice";
import SuperAdmin from "./components/SuperAdmin/SuperAdmin";
import { useState } from "react";
import axios from "axios";
import Header from "./components/HomePage/Header";
import TDashboard from "./components/Teachers Dashboard/TDashboard";
import Subjects from "./components/Subjects/Subjects";
import Divisions from "./components/Divisions/Divisions";
import Batches from "./components/Batches/Batches";
import MainAdmin from "./components/SuperAdmin/MainAdmin";
import DivData from "./components/SuperAdmin/DivData";
import { BASE_URL } from "./base";


function App() {
  const user = useSelector(selectUser);
  const [vadmin, setVadmin] = useState(null);
  // console.log(user.user.user);
  // console.log();
  const authenticate = async (e) => {
    try {
      const admin = await axios.get(
        `${BASE_URL}/api/teacher/getbyuid/${user.user.user.uniqueID}`
      );
      // console.log(admin);
      setVadmin(admin.data);
    } catch (err) {
      console.log(err);
    }
  };
  authenticate();
  const divs = [1,2,3,4,5,6,7,8,9,10,11];
  const bdivs = [1,2,3,4];
  
  return (
    <>
      {user.user ? (
        <Router>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route
              exact
              path="/dashboard"
              element={
                vadmin !== null ? (
                  <TDashboard />
                ) : (
                  <>
                    <Header />{" "}
                    <div className="errdiv">
                      <center>
                        <h2>Sorry ,You are not a teacher or admin</h2>
                      </center>
                    </div>
                  </>
                )
              }
            />
            <Route exact path="/divisions/:year" element={<Divisions divs={divs}/>} />
            <Route exact path="/:div/:labname/dashboard" element={<Batches/>} />
            <Route
              exact
              path="/division/subjects/:div"
              element={
                vadmin !== null ? (
                  <Subjects />
                ) : (
                  <>
                    <Header />{" "}
                    <div className="errdiv">
                      <center>
                        <h2>Sorry ,You are not a teacher or admin</h2>
                      </center>
                    </div>
                  </>
                )
              }
            />
            <Route
              exact
              path="/:div/subjects/:subjectname/dashboard"
              element={
                vadmin !== null ? (
                  <Dashboard />
                ) : (
                  <>
                    <Header />{" "}
                    <div className="errdiv">
                      <center>
                        <h2>Sorry ,You are not a teacher or admin</h2>
                      </center>
                    </div>
                  </>
                )
              }
            />
            <Route
              exact
              path="/:div/:batch/:lab/dashboard/lab"
              element={
                vadmin !== null ? (
                  <Dashboard />
                ) : (
                  <>
                    <Header />{" "}
                    <div className="errdiv">
                      <center>
                        <h2>Sorry ,You are not a teacher or admin</h2>
                      </center>
                    </div>
                  </>
                )
              }
            />
            <Route exact path="/profile" element={<Profile />} />

            <Route
              exact
              path="/admin"
              element={
                user.user.user.superadminid === "5432112345" ? (
                  <MainAdmin />
                ) : (
                  <>
                    <Header />{" "}
                    <div className="errdiv">
                      <h2>Sorry ,You are not a teacher or admin</h2>
                    </div>
                  </>
                )
              }
            />
            <Route
              exact
              path="/admin/teachers"
              element={
                user.user.user.superadminid === "5432112345" ? (
                  <SuperAdmin />
                ) : (
                  <>
                    <Header />{" "}
                    <div className="errdiv">
                      <h2>Sorry ,You are not a teacher or admin</h2>
                    </div>
                  </>
                )
              }
            />
            <Route
              exact
              path="/admin/divisions"
              element={
                user.user.user.superadminid === "5432112345" ? (
                  <DivData />
                ) : (
                  <>
                    <Header />{" "}
                    <div className="errdiv">
                      <h2>Sorry ,You are not a teacher or admin</h2>
                    </div>
                  </>
                )
              }
            />
            <Route
              exact
              path="/admin/batches"
              element={
                user.user.user.superadminid === "5432112345" ? (
                  <MainAdmin />
                ) : (
                  <>
                    <Header />{" "}
                    <div className="errdiv">
                      <h2>Sorry ,You are not a teacher or admin</h2>
                    </div>
                  </>
                )
              }
            />
            <Route exact path="*" element={<Homepage />} />
            {/* <Route exact path="/signup" element={<SignUp />} /> */}
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route exact path="*" element={<Login />} />
            {/* <Route exact path="/profile" element={<Login />} />
            <Route exact path="/admin" element={<Login />} />
            <Route exact path="/dashboard" element={<Login />} /> */}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
