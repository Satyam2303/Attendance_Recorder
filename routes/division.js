const router = require("express").Router();
const Divisions = require("../models/Division");
const Students = require("../models/Students");

router.post("/adddiv", async (req, res) => {
  try {
    const { divname, cc , ul,ll} = req.body;
    const newDiv = new Divisions({
      divname,
      cc,
      ul,
      ll
    });
    const div = await newDiv.save();
    res.status(200).json(div);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update upper and lower limit of students roll no by name

router.put("/updatell_ul/:div", async (req, res) => {
  try {
    const name = req.params.div;
    const ul = req.body.ul;
    const ll = req.body.ll;
    const div = await Divisions.findOneAndUpdate({ divname: name }, {ul,ll});
    console.log(div);
    // await div.updateOne({ ul: ul, ll:ll });
    res.status(200).json(div);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/addbatches/:id", async (req, res) => {
  try {
    const divid = req.params.id;
    // const subjectname = req.body.subjectname;
    const div = await Divisions.findById(divid);
    await div.updateOne({ $push: { batches: req.body } });
    res.status(200).json(div);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.put("/addsubject/:id", async (req, res) => {
  try {
    const divid = req.params.id;
    // const subjectname = req.body.subjectname;
    const div = await Divisions.findById(divid);
    await div.updateOne({ $push: { subject: req.body } });
    res.status(200).json(div);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.put("/addlabs/:id", async (req, res) => {
  try {
    const divid = req.params.id;
    // const subjectname = req.body.subjectname;
    const div = await Divisions.findById(divid);
    await div.updateOne({ $push: { labs: req.body } });
    res.status(200).json(div);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add many students by finding

router.put("/addstds/:id", async (req, res) => {
  try {
    const divid = req.params.id;
    const fdiv = req.body.fdiv;
    const div = await Divisions.findById(divid);
    const students = await Students.find({ div: fdiv });
    await div.updateOne({ students: students });
    res.status(200).json(div);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add student

router.put("/addstudent/:id", async (req, res) => {
  try {
    const divid = req.params.id;
    const div = await Divisions.findById(divid);
    await div.updateOne({ $push: { students: req.body } });
    const sorteddiv = await Divisions.findById(divid);
    sorteddiv.students.sort((a, b) => a.rollno - b.rollno);
    sorteddiv.save();
    res.status(200).json(sorteddiv);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//create new attendance
router.put("/create_att/:id", async (req, res) => {
  try {
    const divid = req.params.id;
    var subject_name = req.body.subject;
    // const code = req.body.code;
    const div = await Divisions.findById(divid);
    let i;
    let lengths = div.subject.length;
    const data = req.body.dates;
    // console.log(data);
    // console.log(subject_name);
    for (i = 0; i < lengths; i++) {
      // console.log("HELLO");
      var sub = div.subject[i].sub_name;
      if (sub === subject_name) {
        // console.log(sub + " " + subject_name);
        const subjectarr = div.subject[i];
        // console.log(data  );
        try {
          await div.updateOne({ $push: { subject: data } });
          res.status(200).json(div);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      }
      // console.log(div.subject[i].sub_name)
    }
    // res.status(404).json("Division Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get div
router.get("/getdiv/:id", async (req, res) => {
  try {
    const divid = req.params.id;
    // const subjectname = req.body.subjectname;
    const div = await Divisions.findById(divid);
    // await div.updateOne({$push: { subjects: req.body }});
    res.status(200).json(div);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all divs

router.get("/getalldiv", async (req, res) => {
  try {
    const div = await Divisions.find();
    const divarr = [];
    for(let i=0;i<div.length;i++){
      divarr.push(div[i].divname);
    }
    res.status(200).json(div);
    // res.status(200).json(divarr);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//find div by div name

router.get("/getdivname/:div", async (req, res) => {
  try {
    const name = req.params.div;
    // console.log(req.params.div)
    const div = await Divisions.find({ divname: name });
    res.status(200).json(div);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
