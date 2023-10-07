import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Header from "../HomePage/Header";
import "../Teachers Dashboard/tdashboard.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./subjects.css";
import { BASE_URL } from "../../base";




function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [labs, setLabs] = useState([]);
  const tosubject = (div, subjectname) => {
    window.location.replace(`/${div}/subjects/${subjectname}/dashboard`);
  };
  const tolab = (div, lab) => {
    window.location.replace(`/${div}/${lab}/dashboard`);
  };
  var path = window.location.href;
  var div = path.split("/");
  var divname = div[5];
  const [divid, setDivid] = useState("");
  // const divid = useRef(0);
  // console.log(divname);
  useEffect(() => {
    const divdata = async () => {
      const division = await axios.get(`${BASE_URL}/api/div/getdivname/${divname}`);
      setDivid(division.data[0]._id);
      setSubjects(division.data[0].subject);
      setLabs(division.data[0].labs);
    };
    divdata();
  }, [divname]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [updatedSub, setUpdatedSub] = useState("");
  const [updatedlab, setUpdatedlab] = useState("");
  const [updatedbatch, setUpdatedbatch] = useState("");
  const handleUpdate = async () => {
    const subdata = {
      sub_name: updatedSub,
    };
    const labdata = {
      labname: updatedlab,
    };
    const batchdata = {
      batchname: updatedbatch,
    };
    try {
      if (subdata.sub_name !== "") {
        await axios.put(`${BASE_URL}/api/div/addsubject/${divid}`, subdata);
      }
      if (labdata.labname !== "") {
        await axios.put(`${BASE_URL}/api/div/addlabs/${divid}`, labdata);
      }

      if (batchdata.batchname !== "") {
        await axios.put(`${BASE_URL}/api/div/addbatches/${divid}`, batchdata);
      }
      window.alert("Data Updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <center>
        <div className="subsdiv">
          <h3>Subjects</h3>
          <div className="editsubject" onClick={handleOpen}>
            <i class="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
      </center>
      <div className="years subjects">
        {subjects.map((s) => (
          <div
            className="yearbox subject"
            onClick={() => tosubject(divname, s.sub_name)}
          >
            <p>{s.sub_name}</p>
          </div>
        ))}
      </div>
      <br />
      <center>
        <div className="subsdiv">
          <h3>Labs</h3>
          <div className="editsubject" onClick={handleOpen}>
            <i class="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
      </center>
      <div className="years subjects labs">
        {labs.map((s) => (
          <div
            className="yearbox subject"
            onClick={() => tolab(divname, s.labname)}
          >
            <p>{s.labname}</p>
          </div>
        ))}
      </div>
      <br />
      <br />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        class="editmodal"
      >
        <Box className="modalclass">
          <center>
            <h3>{divname}</h3>
            <hr />
            {/* <input class="inputclass" type="text" placeholder="TE7" disabled/> */}
            <p>Add a subject</p>
            <input
              class="inputclass"
              type="text"
              placeholder="Subject Name"
              onChange={(e) => setUpdatedSub(e.target.value)}
            />
            <p>Add a lab</p>
            <input
              class="inputclass"
              type="text"
              placeholder="Lab Name"
              onChange={(e) => setUpdatedlab(e.target.value)}
            />
            <p>Add a batch</p>
            <input
              class="inputclass"
              type="text"
              placeholder="Batchname"
              onChange={(e) => setUpdatedbatch(e.target.value)}
            />
            <button className="button-17 sbtn" onClick={() => handleUpdate()}>
              Submit
            </button>
          </center>
        </Box>
      </Modal>
    </div>
  );
}

export default Subjects;
