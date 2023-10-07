import React, { useState } from "react";
import "./homepage.css";
import "animate.css";
import Header from "./Header";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../base";


function Homepage() {
  const [code, setCode] = useState("");
  const user = useSelector((state) => state.user.user.user);

  const handleSubmit = async () => {
    try {
      if(code!==""){
        const data = {
          code: code,
          students: {
            rollno: user.rollno,
            status: "P",
          },
        };
        const giveatt = await axios.put(BASE_URL+"/api/attendance/giveattendace", data);
        console.log(giveatt);
        window.alert("Attendance given successfully");
      }else{
        
        window.alert("Please Enter a Attendance Code");
      }
    } catch (err) {
      console.log(err);
      window.alert("Try Again");
    }
  };
  return (
    <div className="homepage">
      <Header />
      <div className="otpbox">
        <div className="otpcontainer">
          <div className="otphead">
            <p>Enter Attendance Code here</p>
            <i className="fa-solid fa-info"></i>
          </div>
          <input
            type="text"
            maxLength="6"
            onChange={(e) => setCode(e.target.value)}
          />
          <center>
            <button className="button-17" type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
