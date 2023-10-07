const router = require("express").Router();
const Teachers = require("../models/Teachers");
const bcrypt = require("bcrypt");

router.post("/addteacher", async (req, res) => {
  try {
    const { fullname, email, password, department, uniqueID } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    const newTeacher = new Teachers({
      fullname,
      email,
      password: hashedpass,
      department,
      uniqueID,
    });

    const teacher = await newTeacher.save();
    res.status(200).json(teacher);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get all teachers

router.get("/getall", async (req, res) => {
  try {
    const teachers = await Teachers.find();
    res.status(200).json(teachers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// teacher login
// router.post("/login", async (req, res) => {
//     try {
//       const teacher = await Teachers.findOne({ email: req.body.email });
//       if (!teacher) {
//         errors.email = "teacher not found";
//         res.status(404).json({ errors });
//         return;
//       }
//       const validpassword = await bcrypt.compare(
//         req.body.password,
//         teacher.password
//       );
//       if (!validpassword) {
//         errors.validpassword = "Wrong Credentials";
//         res.status(400).json({ errors });
//         return;
//       }
//       res.status(200).json(teacher);
//       // console.log(teacher);
//     } catch (err) {
//       res.status(500).json(err);
//       console.log(err);
//     }
//   });
// delete a teacher
router.delete("/delete/:id", async (req, res) => {
  try {
    const tid = req.params.id;
    await Teachers.findByIdAndDelete(tid);
    res.status(200).json("Teacher Deleted Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get a teacher
router.get("/getateacher", async (req, res) => {
  try {
    const teachername = req.body.teacher;
    const teacher = await Teachers.find({ fullname: teachername });
    res.status(200).json(teacher);
  } catch (err) {
    res.status(404).json("Teacher not found");
  }
});

router.get("/getbyuid/:id", async (req, res) => {
  try {
    const uid = req.params.id;
    const teacher = await Teachers.findOne({ uniqueID: uid });
    res.status(200).json(teacher);
  } catch (err) {
    res.status(404).json("Teacher not found");
  }
});

// get teachers by department
router.get("/getbydepart", async (req, res) => {
  try {
    const department = req.body.department;
    const teacher = await Teachers.find({ department });
    res.status(200).json(teacher);
  } catch (err) {
    res.status(404).json("Department not found");
  }
});

module.exports = router;
