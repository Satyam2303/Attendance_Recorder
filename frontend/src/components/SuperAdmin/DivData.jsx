import React from "react";
import Header from "../HomePage/Header";

function DivData() {
  const divisions = [
    { div: "All" },
    { div: "FE1" },
    { div: "FE2" },
    { div: "FE3" },
    { div: "FE4" },
    { div: "FE5" },
    { div: "FE6" },
    { div: "FE7" },
    { div: "FE8" },
    { div: "FE9" },
    { div: "FE10" },
    { div: "FE11" },
    { div: "SE1" },
    { div: "SE2" },
    { div: "SE3" },
    { div: "SE4" },
    { div: "SE5" },
    { div: "SE7" },
    { div: "SE8" },
    { div: "SE9" },
    { div: "SE10" },
    { div: "SE11" },
    { div: "TE1" },
    { div: "TE2" },
    { div: "TE3" },
    { div: "TE4" },
    { div: "TE5" },
    { div: "TE6" },
    { div: "TE7" },
    { div: "TE8" },
    { div: "TE9" },
    { div: "TE10" },
    { div: "TE11" },
    { div: "BE1" },
    { div: "BE2" },
    { div: "BE3" },
    { div: "BE4" },
    { div: "BE5" },
    { div: "BE6" },
    { div: "BE7" },
    { div: "BE8" },
    { div: "BE9" },
    { div: "BE10" },
    { div: "BE11" },
  ];
  return (
    <div>
      <Header />
      <div className="divinput">
        {/* <input type="text" /> */}
        {/* <select name="" id="" className="selectdiv">
            {divisions.map((d)=>(
                <option value={d.div}>{d.div}</option>
            ))}
        </select> */}
        <input type="text" className="selectdiv" placeholder="Division" autoFocus/>
        <input type="button" className="selectdiv sbutton" value="Search"/>
      </div>
      <br />
      <hr />
    </div>
  );
}

export default DivData;
