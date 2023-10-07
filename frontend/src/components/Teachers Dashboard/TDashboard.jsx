import React from "react";
import Header from "../HomePage/Header";
import "./tdashboard.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../Subjects/subjects.css";
// import { useEffect } from "react";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../../base";


function TDashboard() {
  const [divname, setDivname] = React.useState("");
  const [batchname, setBatchname] = React.useState("");
  // const [divid, setDivid] = React.useState("");
  const [ulimit, setUlimit] = React.useState("");
  const [llimit, setLlimit] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tofe = (div) => {
    window.location.replace(`/divisions/${div}`);
  };

  useEffect(() => {
    const divdata = async () => {
      let division;
      if (batchname !== "") {
        division = await axios.get(`${BASE_URL}/api/batch/getbatchname/${batchname}`);
      } else {
        division = await axios.get(`${BASE_URL}/api/div/getdivname/${divname}`);
      }
      // console.log(division.data);
      setLlimit(division.data[0].ll);
      setUlimit(division.data[0].ul);
    };
    divdata();
  }, [divname,batchname]);

  const handleUpdate = async () => {
    const data = {
      ll: llimit,
      ul: ulimit,
    };

    try {
      if (batchname !== "") {
        await axios.put(`${BASE_URL}/api/batch/updatell_ul/${batchname}`, data);
      } else {
        await axios.put(`${BASE_URL}/api/div/updatell_ul/${divname}`, data)
      }

      
      window.alert("Data Updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      {/* <h2>Years</h2> */}
      <center>
        <div className="subsdiv">
          <h3>Years</h3>
          <div className="editsubject" onClick={handleOpen}>
            <i class="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
      </center>
      <div className="tdash">
        <div className="years tdashboard">
          <div onClick={() => tofe("FE")} className="yearbox">
            <p>FE</p>
          </div>
          <div className="yearbox" onClick={() => tofe("SE")}>
            <p>SE</p>
          </div>
          <div className="yearbox" onClick={() => tofe("TE")}>
            <p>TE</p>
          </div>
          <div className="yearbox" onClick={() => tofe("BE")}>
            <p>BE</p>
          </div>
        </div>
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
            <input
              className="inputclass"
              type="text"
              placeholder="Enter a Div Name"
              onChange={(e) => setDivname(e.target.value)}
            />
            <p>OR</p>
            <input
              className="inputclass"
              type="text"
              placeholder="Enter a Batch Name"
              onChange={(e) => setBatchname(e.target.value)}
            />
            <center>
              <p>{divname}</p>
            </center>
            {(divname !== "" || batchname !== "") && (
              <>
                <div className="limits">
                  <input
                    type="text"
                    className="inputclass"
                    placeholder="Lower Limit"
                    value={llimit}
                    onChange={(e) => setLlimit(e.target.value)}
                  />
                  <input
                    type="text"
                    className="inputclass"
                    placeholder="Upper Limit"
                    value={ulimit}
                    onChange={(e) => setUlimit(e.target.value)}
                  />
                </div>
                <button
                  className="button-17 sbtn"
                  onClick={() => handleUpdate()}
                >
                  Update
                </button>
              </>
            )}
          </center>
        </Box>
      </Modal>
    </div>
  );
}

export default TDashboard;
