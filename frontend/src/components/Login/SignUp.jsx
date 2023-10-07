import React, { useRef, useState } from "react";
import "./login.css";
import axios from "axios";
import { BASE_URL } from "../../base";


function SignUp() {
  const fullname = useRef();
  const email = useRef();
  const password = useRef();
  const rollno = useRef();
  const div = useRef();
  const batch = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      fullname: fullname.current.value,
      div: div.current.value,
      email: email.current.value,
      password: password.current.value,
      rollno: rollno.current.value,
      batch: batch.current.value,
    };
    if (!fullname || !email || !password || !rollno || !div || !batch) {
      document.getElementById("alert").innerHTML = "All Fields Are required.";
    }
    if (password.current.value.length < 6) {
      document.getElementById("alert").innerHTML =
        "Password Should be Minimum of 6 Characters";
    } else {
      try {
        const student = await axios.post(BASE_URL+"/api/student/signup", data);
        const divisionname = await axios.get(
          `${BASE_URL}/api/div/getdivname/${div.current.value}`
        );
        const batchname = await axios.get(
          `${BASE_URL}/api/batch/getbatchname/${batch.current.value}`
        );
        // console.log(divisionname.data);
        const didata = divisionname.data;
        const batchdata = batchname.data;
        // console.log(didata[0]._id);
        await axios.put(`${BASE_URL}/api/div/addstudent/${didata[0]._id}`, student.data);
        await axios.put(`${BASE_URL}/api/batch/addstudent/${batchdata[0]._id}`, student.data);
        setLoading(false);
        window.alert("SignUp Successfull");
        window.location.replace("/login");
      } catch (err) {
        // console.log(err);
        setLoading(false);
        window.alert("Something wents wrong");
      }
    }
  };
  return (
    <div className="loginpage">
      <h1>ATTENDANCE TAKER</h1>
      <form onSubmit={handleSubmit}>
        <div className="otpbox loginbox">
          <div className="otpcontainer logincontainer">
            <div className="otphead loginhead signuphead">
              <p>Sign Up</p>
            </div>
            <input
              required
              type="text"
              placeholder="Full Name(As Per College Id Card)"
              ref={fullname}
            />
            <input
              required
              type="mail"
              placeholder="Email(...@ms.pict.edu)"
              ref={email}
            />
            <input
              required
              type="Password"
              placeholder="Password (Min 6 Characters)"
              minLength="6"
              maxLength="10"
              ref={password}
            />
            <input required type="text" placeholder="Roll No." ref={rollno} />
            <input
              required
              type="text"
              placeholder="Divsion(eg.TE7)"
              ref={div}
            />
            <input
              required
              type="text"
              placeholder="Batch(eg.L7)"
              ref={batch}
            />
            <center>
              <button className="button-17" type="submit">
                {loading ? "loading..." : "Submit"}
              </button>
              <br />
              <div className="alert" id="errdiv"></div>
              <br />
              Already have an account ? <a href="/login">Login</a>
            </center>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
