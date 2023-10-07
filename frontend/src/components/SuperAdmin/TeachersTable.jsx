import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { BASE_URL } from "../../base";


export default function TeachersTable({teachers}) {
    const handleDelete = async(id)=>{
        try{
            await axios.delete(`${BASE_URL}/api/teacher/delete/${id}`);
            window.alert("Teacher Deleted Successfully");
        }
        catch(err){
            console.log(err);
            window.alert(err);
        }
    }
  return (
    <TableContainer component={Paper} style={{backgroundColor: "transparent" , boxShadow: "rgba(0, 0, 0, 0.438) 0px 5px 15px"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{color: "white"}}>Name</TableCell>
            <TableCell style={{color: "white"}} align="right">Email</TableCell>
            <TableCell style={{color: "white"}} align="right">Department</TableCell>
            {/* <TableCell style={{color: "white"}} align="right">Password</TableCell> */}
            <TableCell style={{color: "white"}} align="right">Unique ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.map((row) => (
            <TableRow
            //   key={row.fullname}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{color: "white"}} component="th" scope="row">
                {row.fullname}
              </TableCell>
              <TableCell style={{color: "white"}} align="right">{row.email}</TableCell>
              <TableCell style={{color: "white"}} align="right">{row.department}</TableCell>
              {/* <TableCell style={{color: "white"}} align="right">{row.password}</TableCell> */}
              <TableCell style={{color: "white"}} align="right">{row.uniqueID}</TableCell>
              <TableCell style={{color: "white"}} align="right"><button onClick={()=>handleDelete(row._id)} style={{backgroundColor: 'gray', color: 'white' , cursor: 'pointer'}}>Delete</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
