import React, { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import "./dashboard.css";
import axios from "axios";
import AttSheet from "../AttedanceSheet/AttSheet";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../Subjects/subjects.css";
import Defaulttable from "../Table/Defaulttable";
import { BASE_URL } from "../../base";


function Dashboard() {
  const [teacher, setTeacher] = useState("");
  const [lectureno, setLectureno] = useState(0);
  const [code, setCode] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  const [ulimit, setUlimit] = useState();
  const [llimit, setLlimit] = useState();
  var path = window.location.href;

  var details = path.split("/");
  var subjectname = details[5];
  var divname = details[3];
  var batchname = details[4];
  var checklab = subjectname.split("%20");
  if (checklab.length > 1) {
    subjectname = checklab[0] + " " + checklab[1];
  }
  useEffect(() => {
    const fetchdiv = async () => {
      if (details.length === 8) {
        const divs = await axios.get(`${BASE_URL}/api/batch/getbatchname/${batchname}`);
        setUlimit(divs.data[0].ul);
        setLlimit(divs.data[0].ll);
        // console.log(divs.data)
      } else {
        const divs = await axios.get(`${BASE_URL}/api/div/getdivname/${divname}`);
        setUlimit(divs.data[0].ul);
        setLlimit(divs.data[0].ll);
      }
      // console.log(div);
    };
    fetchdiv();
    // attendances();
  });
  const [fetching, setFetching] = useState(false);
  const handleSubmit = async (e) => {
    const data = {
      div: divname,
      subject: subjectname,
      teacher,
      lectureno,
      generatedcode: code,
      batch: batchname,
    };
    // console.log(data);
    // const limitdata =[];
    let div;
    if (details.length === 8) {
      div = await axios.get(`${BASE_URL}/api/batch/getbatchname/${batchname}`);
    } else {
      div = await axios.get(`${BASE_URL}/api/div/getdivname/${divname}`);
    }
    const limitdata = {
      ul: div.data[0].ul,
      ll: div.data[0].ll,
    };
    try {
      // console.log(data);
      const attdata = await axios.post(BASE_URL+"/api/attendance/takeattendance", data);
      // attendances();
      sleep(7000);
      axios.put(`${BASE_URL}/api/attendance/deletecode/${attdata.data._id}`, limitdata);
      setFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

  const submitfunc = () => {
    setFetching(true);
    handleOpen();
    sleep(1000);
    handleSubmit();
  };
  const numof_students = ulimit - llimit;
  return (
    <div>
      <Header />
      {/* <form onSubmit={handleSubmit}> */}
      <div className="dashboardcontents">
        <div className="sessiondetails">
          <input
            type="text"
            placeholder="Subject Name"
            // onChange={(e) => setSubject(subjectname)}
            value={subjectname}
            disabled
          />
          <input
            type="text"
            placeholder="Teacher Name"
            onChange={(e) => setTeacher(e.target.value)}
          />
          <input
            type="number"
            placeholder="Lecture Number"
            onChange={(e) => setLectureno(e.target.value)}
          />
        </div>
        <div className="generator">
          <input
            type="text"
            placeholder="Division"
            // onChange={(e) => setDiv(divname)}
            value={divname}
            disabled
          />
          {details.length === 8 && (
            <input
              type="text"
              placeholder="Division"
              value={batchname}
              disabled
            />
          )}
          <input
            type="Number"
            placeholder="Generate Code"
            onChange={(e) => setCode(e.target.value)}
            maxLength="6"
          />
          <button type="submit" className="button" onClick={submitfunc}>
            Generate
          </button>
        </div>
        <p className="code">
          <b>Code : {code}</b>
        </p>
      </div>
      {/* </form> */}
      <hr className="horizontalline" />
      <div className="dashboardtable">
        <h3>Dashboard</h3>

        <AttSheet numof_students={numof_students} />
        {/* <Defaulttable/> */}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        class="editmodal"
      >
        <Box className="modalclass">
          <center>
            {fetching
              ? "Getting Attendance..."
              : "Attendance Taken Successfully"}
          </center>
        </Box>
      </Modal>
    </div>
  );
}

export default Dashboard;
