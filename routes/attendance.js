const router = require("express").Router();
const Attendance = require("../models/Attendance");

let timeout;
let deleid;
router.post("/takeattendance", async (req, res) => {
  try {
    const { div, subject, teacher, lectureno, generatedcode, batch } = req.body;
    const newAttendance = new Attendance({
      div,
      subject,
      teacher,
      lectureno,
      generatedcode,
      batch,
    });
    const attendance = await newAttendance.save();
    // deleid = attendance.id;
    res.status(200).json(attendance);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/afd/:id", async (req, res) => {
  const attendacneid = req.params.id;

  const attendance = await Attendance.findById(attendacneid);
  await attendance.updateOne({
    $push: {
      students: {
        rollno: 32301,
        status: "A",
      },
    },
  });
  // atte.updateOne({
  //   $push: {
  //     students: {
  //       rollno: 32301,
  //       status: "A",
  //     },
  //   }
  // });
  res.status(200).json(attendance);
});

router.put("/deletecode/:id", async (req, res) => {
  try {
    const attendacneid = req.params.id;
    await Attendance.findByIdAndUpdate(attendacneid, {
      generatedcode: "",
    });
    const attdata = [];
    const attendance = await Attendance.findById(attendacneid);
    const ul = req.body.ul;
    const ll = req.body.ll;
    let n = attendance.students.length;
    for (let j = 0; j < n; j++) {
      attdata.push({ rollno: attendance.students[j].rollno, status: "P" });
    }
    for (let i = ll; i <= ul; i++) {
      attdata.push({ rollno: i, status: "A" });
    }
    attdata.sort((a, b) => a.rollno - b.rollno);
    for (let k = 0; k < attdata.length - 1; k++) {
      if (attdata[k].rollno == attdata[k + 1].rollno) {
        const index = attdata.indexOf(attdata[k + 1]);
        attdata.splice(index, 1);
      }
    }

    await Attendance.findByIdAndUpdate(attendacneid, { attdata });
    attendance.students.sort((a, b) => a.rollno - b.rollno);
    for (let k = 0; k < attendance.students.length - 1; k++) {
      if (attendance.students[k].rollno == attendance.students[k + 1].rollno) {
        const index = attendance.students.indexOf(attendance.students[k + 1]);
        attendance.students.splice(index, 1);
      }
    }
    attendance.save();
    res.status(200).json(attendance);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// router.put("/deletecode/:id", async (req, res) => {
//   try {
//     const codeid = req.params.id;
//     const att = await Attendance.findByIdAndUpdate(codeid, {
//       generatedcode: "",
//     });
//     const attendacneid = att.id;

//     const attendance = await Attendance.findById(attendacneid);

//     attendance.students.sort((a, b) => a.rollno - b.rollno);
//     const atte = await Attendance.findById(attendacneid);
//     let N = atte.students.length;
//     let diff = atte.students[0].rollno - 0;

//     for (let i = 0; i < N; i++) {
//       if (atte.students[i].rollno - i != diff) {
//         while (diff < atte.students[i].rollno - i) {
//           await atte.updateOne({
//             $push: {
//               students: {
//                 rollno: diff + i,
//                 status: "A",
//               },
//             },
//           });
//           diff++;
//         }
//       }
//     }

//     attendance.students.sort((a, b) => a.rollno - b.rollno);
//     attendance.save();
//     res.status(200).json(attendance);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

const deletecode = async () => {};
//find by id
router.put("/giveattendace/:id", async (req, res) => {
  const attendacneid = req.params.id;
  const attendacecode = req.body.code;

  const attendance = await Attendance.findById(attendacneid);
  try {
    if (attendacecode == attendance.generatedcode) {
      await attendance.updateOne({ $push: req.body });
      const attend = await Attendance.findById(attendacneid);
      attend.students.sort((a, b) => a.rollno - b.rollno);
      attend.save();
      res.status(200).json(attend);
    } else {
      res.status(404).json("Code is expired or wrong");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// find by code and update
router.put("/giveattendace", async (req, res) => {
  const attendancecode = req.body.code;
  const attendance = await Attendance.find({ generatedcode: attendancecode });
  // console.log(attendance);
  if (attendance !== null) {
    try {
      const rid = attendance[0].id;
      const attbyid = await Attendance.findById(rid);
      await attbyid.updateOne({ $push: req.body });
      // console.log(attbyid);
      const updatedatt = await Attendance.findById(rid);
      updatedatt.students.sort((a, b) => a.rollno - b.rollno);
      updatedatt.save();
      res.status(200).json(updatedatt);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(404).json("Code is expired or wrong");
  }
});

//get attendance by id

router.get("/giveattendace/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    res.status(200).json(attendance);
  } catch (err) {
    console.log("Attendance is not found");
    res.status(404).json(err);
  }
});

// get attendance by code
router.get("/getbycode", async (req, res) => {
  try {
    const attendance = await Attendance.find({ generatedcode: req.body.code });
    res.status(200).json(attendance);
  } catch (err) {
    console.log("Teacher name is not found");
    res.status(404).json(err);
  }
});

// get all the  attendances
router.get("/getall", async (req, res) => {
  try {
    const data = await Attendance.find();
    data.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get attendance by division
router.get("/getbydiv/:divname", async (req, res) => {
  try {
    const div = req.params.divname;
    const data = await Attendance.find({ div });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/getbybatch/:batchname", async (req, res) => {
  try {
    const batch = req.params.batchname;
    const data = await Attendance.find({ batch });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getbydivid/:id", async (req, res) => {
  try {
    const div = req.params.id;
    const data = await Attendance.findById(div);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
