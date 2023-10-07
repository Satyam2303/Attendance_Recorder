const router = require("express").Router();
const Students = require("../models/Students");
const bcrypt = require("bcrypt");
const Teachers = require("../models/Teachers");

//get all students and sort them

// router.get("/all", async (req, res) => {
//   try {
//     const students = await Students.find();
//     students.sort((a, b) => a.rollno - b.rollno);
//     students.save();
//     res.status(200).json(students);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// //get students by their div

// router.get("/all/:div",async(req,res)=>{
//   try{
//     div = req.params.div;
//     const students = await Students.find({div});
//     // students.sort((a,b)=>a.rollno - b.rollno);
//     res.status(200).json(students);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json(err);
//   }
// })

router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password, rollno, div, batch } = req.body;
    const emailRegex = /@ms.pict.edu|@pictsctr.onmicrosoft.com|@pict.edu/;
    if (!emailRegex.test(email)) throw "Email is not supported";
    if (password.length < 6) {
      res.status(500).json("Password must be of atleast 6 characters");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    const newStudent = new Students({
      fullname,
      email,
      password: hashedpass,
      rollno,
      div,
      batch
    });
    const student = await newStudent.save();
    //get all the students and then sort them

    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const student = await Students.findOne({ email: req.body.email });
  if (!student) {
    try {
      const teacher = await Teachers.findOne({ email: req.body.email });
      if (!teacher) {
        errors.email = "teacher/student not found";
        res.status(404).json({ errors });
        return;
      }
      const validpassword = await bcrypt.compare(
        req.body.password,
        teacher.password
      );
      if (!validpassword) {
        errors.validpassword = "Wrong Credentials";
        res.status(400).json({ errors });
        return;
      }
      res.status(200).json(teacher);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (student !== null) {
    const validpassword = await bcrypt.compare(
      req.body.password,
      student.password
    );
    if (!validpassword) {
      errors.validpassword = "Wrong Credentials";
      res.status(400).json({ errors });
      return;
    }
    res.status(200).json(student);
  }
});

// get all students
router.get("/allstudents", async (req, res) => {
  //   const students = await Students.find();
  const students = await Students.find().sort({ rollno: 1 });
  res.status(200).json(students);
});

//get all students by division
router.get("/allstudents/:div", async (req, res) => {
  //   const students = await Students.find();
  try {
    const division = req.params.div;
    const students = await Students.find({ div: division });
    res.status(200).json(students);
  } catch (err) {
    res.status(200).json(err);
  }
});

module.exports = router;
