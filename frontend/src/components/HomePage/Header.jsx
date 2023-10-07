import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./homepage.css";
import { logout } from "../../redux/userSlice";
import { BASE_URL } from "../../base";


function Header() {
  const user = useSelector((state) => state.user.user.user);
  // const [vadmin, setVadmin] = useState(null);
  // const authenticate = async (e) => {
  //   try {
  //     const admin = await axios.get(`/teacher/getbyuid/${user.uniqueID}`);
  //     setVadmin(admin.data);
  //     // console.log(admin.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // authenticate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout({ user: null, loggedIn: false }));
  };
  // console.log(vadmin);
  const showitems = () => {
    document.getElementById("menuitem1").className =
      "menuicon menuicon2 animate__animated animate__fadeInRight";
    document.getElementById("menuitem2").className =
      "menuicon menuicon2 animate__animated animate__fadeInRight";
    document.getElementById("menuitem3").className =
      "menuicon menuicon2 animate__animated animate__fadeInRight";
    document.getElementById("menuitem4").className =
      "menuicon menuicon2 animate__animated animate__fadeInRight";
    document.getElementById("menuitem5").className =
      "menuicon menuicon2 animate__animated animate__fadeInRight";
    {user.role === "teacher" && (document.getElementById("menuitem2").className =
      "menuicon menuicon2 animate__animated animate__fadeInRight")}
  };

  return (
    <div className="homepageheader">
      <div className="headername">
        <p>ATTENDANCE TAKER</p>
      </div>

      <div className="menu">
        <div className="menuicon" onClick={() => showitems()}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="menuitems" id="menuitem4">
          <a href="/">
            {" "}
            <i className="fa-solid fa-house-chimney"></i>
          </a>
        </div>
        <div className="menuitems" id="menuitem1">
          <a href="/profile">
            {" "}
            <i className="fa-solid fa-user"></i>
          </a>
        </div>
        <div className="menuitems " id="menuitem2">
          <a href="/dashboard">
            <i className="fa-solid fa-server"></i>
          </a>
        </div>
        <div className="menuitems" id="menuitem3" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </div>
      </div>
    </div>
  );
}

export default Header;
