import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import "./login.css";
import { BASE_URL } from "../../base";


function Login() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL+"/api/student/login", {
        email: mail,
        password: pass,
      });
      // const teachersres= await axios.post(BASE_URL+"/api/teacher/login", {
      //   email: mail,
      //   password: pass,
      // });

      dispatch(
        login({
          user: res.data,
          loggedIn: true,
        })
      );
    } catch (err) {
      console.log(err);
      document.getElementById("errdiv").innerHTML = "Wrong Credentials";
      // setTimeout(document.getElementById("errdiv").innerHTML = null,30000)
    }
  };
  return (
    <div className="loginpage">
      <h1>ATTENDANCE TAKER</h1>
      <div className="otpbox loginbox">
        <div className="otpcontainer logincontainer">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="otphead loginhead">
              <p>Login</p>
            </div>
            <input
              type="email"
              placeholder="Email(...@ms.pict.edu)"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <center>
              <button className="button-17" type="submit">
                Submit
              </button>
              <br />
              <div className="alert" id="errdiv"></div>
              <br />
              Don't have an account ? <a href="/signup">SignUp</a>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
