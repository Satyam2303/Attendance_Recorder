import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment-timezone";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";

function BasicTable({ attenddata, filter , divdata}) {
  const _export = React.useRef(null);
  console.log(filter);
  const exportExport = (students) => {
    if (_export.current !== null) {
      _export.current.save(students);
    }
  };
  return (
    <TableContainer component={Paper} style={{backgroundColor: "transparent"}}>
     <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell style={{color: "white"}}>Subject Name</TableCell>
            <TableCell style={{color: "white"}} align="right">Teacher Name</TableCell>
            <TableCell style={{color: "white"}} align="right">Lecture No.</TableCell>
            <TableCell style={{color: "white"}} align="right">Div</TableCell>
            <TableCell style={{color: "white"}} align="right">Date</TableCell>
            <TableCell style={{color: "white"}} align="right">Excel</TableCell>
            {/* <TableCell style={{color: "white"}} align="right">PDF</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {attenddata.map((row) => ( row.div === filter && 
            (<TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell style={{color: "white"}} component="th" scope="row">
                {row.subject}
              </TableCell>
              <TableCell style={{color: "white"}} align="right">{row.teacher}</TableCell>
              <TableCell style={{color: "white"}} align="right">{row.lectureno}</TableCell>
              <TableCell style={{color: "white"}} align="right">{row.div}</TableCell>
              <TableCell style={{color: "white"}} align="right">
                {moment(row.date).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell style={{color: "white"}} align="right">
                <label
                  htmlFor="export"
                  className="download"
                  onClick={() => exportExport(row.students)}
                >
                  Download
                </label>
                <ExcelExport ref={_export}>
                  <Grid
                    style={{
                      display: "none",
                    }}
                    data={row.students}
                  >
                    <GridToolbar>
                      <button
                        title="Export Excel"
                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                        id="export"
                      >
                        Download
                      </button>
                    </GridToolbar>
                    <GridColumn
                      className="data"
                      field="rollno"
                      title="Roll no."
                      width="50px"
                    />
                    <GridColumn
                      className="data"
                      field="studentname"
                      title="Student Name"
                      width="350px"
                    />
                    {/* <GridColumn field="UnitPrice" title="Price" /> */}
                    {/* <GridColumn field="UnitsInStock" title="In stock" /> */}
                    {/* <GridColumn field="Discontinued" title="Discontinued" /> */}
                  </Grid>
                </ExcelExport>
              </TableCell>
              {/* <TableCell style={{color: "white"}} align="right"><button>Download</button></TableCell> */}
            </TableRow>) 
          ) )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;
