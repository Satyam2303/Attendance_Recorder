import React from "react";
import Header from "../HomePage/Header";
import profilepic from "./profile.webp";
import "./profile.css";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../base";



function Profile() {
  const user = useSelector((state)=>state.user.user.user);
  console.log(user);
  return (
    <div>
      <Header />
      <div className="profilebox">
        <div className="box profile">
          <center>
            <div className="userimg">
              <img src={profilepic} alt="" />
            </div>
            <p>{user.fullname}</p>
            {user.rollno && <p>Roll No. {user.rollno}</p>}
            {user.uniqueID && <p>Unique ID {user.uniqueID}</p>}
            {user.department && <p>Department: {user.department}</p>}
            {/* <p>{user.email}</p> */}
            <p> {user.email}</p>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Profile;
