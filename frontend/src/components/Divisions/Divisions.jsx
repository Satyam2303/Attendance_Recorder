import React from "react";
import Header from "../HomePage/Header";
import "../Teachers Dashboard/tdashboard.css";
import { BASE_URL } from "../../base";


function Divisions({divs}) {
  const tofe = (divs) => {
    window.location.replace(`/division/subjects/${divs}`);
  };
  const divss = divs;
  // divs.length = 11;
  // console.log(window.location.href)
  var path = window.location.href;
  var div = path.split("/");
  // console.log(div[4]);
  return (
    <div>
      <Header />
      <div className="years subjects">
        {divss.map((d, i) => (
          <div className="yearbox subject division" onClick={() => tofe(`${div[4]}${i + 1}`)}>
            <p>{div[4]} {i + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Divisions;
