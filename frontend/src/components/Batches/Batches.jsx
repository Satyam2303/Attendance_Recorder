import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import "../Teachers Dashboard/tdashboard.css";
import { BASE_URL } from "../../base";


function Batches() {
  //   const tofe = (divs) => {
  //     window.location.replace(`/division/subjects/${divs}`);
  //   };
  //   const divss = divs;
  const [batches, setBatches] = useState([]);

  const tobatchdashboard = (div, labname, batchname) => {
    window.location.replace(`/${div}/${batchname}/${labname}/dashboard/lab`);
  };

  var path = window.location.href;

  var details = path.split("/");
  var subjectname = details[4];
  var divname = details[3];
  var checklab = subjectname.split("%20");
  var labname = checklab[0] + checklab[1];
//   console.log(details);
  useEffect(() => {
    const divdata = async () => {
      const division = await axios.get(`${BASE_URL}/api/div/getdivname/${divname}`);
      setBatches(division.data[0].batches);
    };
    divdata();
  }, [divname]);
  return (
    <div>
      <Header />
      <div className="years subjects">
        {batches.map((d, i) => (
          <div
            className="yearbox subject division"
            onClick={() => tobatchdashboard(divname, labname, d.batchname)}
          >
            <p>{d.batchname}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Batches;
