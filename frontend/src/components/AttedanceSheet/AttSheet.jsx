import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import moment from "moment-timezone";
import { BASE_URL } from "../../base";


export default function AttSheet({ numof_students }) {
  // const [students, setStudents] = useState([]);
  const [attendances, setAttendances] = useState([]);

  var path = window.location.href;
  var details = path.split("/");
  // console.log(details);
  var subjectname = details[5];

  var checklab = subjectname.split("%20");
  if (checklab.length > 1) {
    subjectname = checklab[0] + " " + checklab[1];
  }
  // useEffect(() => {
  //   const divdata = async () => {
  //     if (details.length === 8) {
  //       const batchname = details[4];
  //       const batch = await axios.get(`${BASE_URL}/api/batch/getbatchname/${batchname}`);
  //       setStudents(batch.data[0].students);
  //     } else {
  //       const divname = details[3];
  //       const division = await axios.get(`${BASE_URL}/api/div/getdivname/${divname}`);
  //       setStudents(division.data[0].students);
  //     }
  //   };
  //   divdata();
  // }, [details]);

  let attarr = [{}];
  useEffect(() => {
    const divdata = async () => {
      if (details.length === 8) {
        const batchname = details[4];
        const batch = await axios.get(
          `${BASE_URL}/api/attendance/getbybatch/${batchname}`
        );
        for (let i = 0; i < batch.data.length; i++) {
          if (batch.data[i].subject === subjectname) {
            attarr.push(batch.data[i]);
          }
        }
        // console.log(attarr);
        setAttendances(attarr);
        // console.log(batch.data);
      } else {
        const divname = details[3];
        const division = await axios.get(`${BASE_URL}/api/attendance/getbydiv/${divname}`);
        for (let i = 0; i < division.data.length; i++) {
          if (division.data[i].subject === subjectname) {
            attarr.push(division.data[i]);
          }
        }
        // console.log(attarr);
        setAttendances(attarr);
        // console.log(division.data);
      }
    };
    divdata();
  }, [attarr, details, subjectname]);

  const NUMBER_OF_attdata_PER_BRANCH = numof_students; // this is the max number of attdata per branch
  let sturollno = [];
  for (let i = 0; i <= numof_students; i++) {
    sturollno.push(i + 1);
  }

  // const NUMBER_OF_attdata_PER_BRANCH = 3; // this is the max number of attdata per branch
  let arrLp = [];
  for (let j = 0; j <= NUMBER_OF_attdata_PER_BRANCH; j++) {
    let arrayLookup = [];
    for (let i = 1; i < attendances.length; i++) {
      arrayLookup.push(attendances[i].attdata[j].status);
    }
    arrLp.push(arrayLookup);
  }
  // console.log(arrLp);

  const backup = console.warn;

  console.warn = function filterWarnings(msg) {
    const supressedWarnings = ["warning text", "other warning text"];

    if (!supressedWarnings.some((entry) => msg.includes(entry))) {
      backup.apply(console, arguments);
    }
  };

  console.warn("I'll appear as a warning");

  console.warn("warning text - I will not");
  return (
    <TableContainer
      component={Paper}
      style={{
        backgroundColor: "transparent",
        boxShadow: "rgba(0, 0, 0, 0.438) 0px 5px 15px",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "white", width: "100px" }}>
              <TableRow>
                <TableCell style={{ color: "white", width: "70px" }}>
                  <center>Roll No</center>
                </TableCell>
              </TableRow>
            </TableCell>

            <TableCell>
              {attendances.map(
                (a) =>
                  a.subject === subjectname && (
                    <TableCell style={{ color: "white", width: "80px" }}>
                      {moment(a.date).format("YYYY-MM-DD")}
                    </TableCell>
                  )
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <div className="tableclass">
              <TableRow>
                {sturollno.map((s) => (
                  <>
                    <TableRow>
                      <TableCell
                        style={{
                          color: "white",
                          width: "70px",
                          textAlign: "center",
                        }}
                      >
                        {s}
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableRow>
            </div>
            <TableCell style={{ paddingTop: "0px" }}>
              <TableRow>
                {arrLp.map((a, i) => (
                  <TableRow>
                    {a.map((x) => (
                      <TableCell
                        style={{
                          width: "80px",
                          textAlign: "center",
                          height: "10px",
                          paddingTop: "1px",
                          paddingBottom: "1px",
                        }}
                      >
                        <center>
                          <p
                            style={
                              x === "A"
                                ? {
                                    color: "red",
                                    border: "1px solid red",
                                    borderRadius: "50%",
                                    width: "20px",
                                    height: "20px",
                                    textAlign: "center",
                                  }
                                : {
                                    color: "green",
                                  }
                            }
                          >
                            {" "}
                            {x}
                          </p>
                        </center>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableRow>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
