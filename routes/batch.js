const router = require("express").Router();
const Batch = require("../models/Batch");
const Students = require("../models/Students");

router.post("/addbatch", async (req, res) => {
  try {
    const { batchname } = req.body;
    const newBatch = new Batch({
      batchname,
    });
    const batch = await newBatch.save();
    res.status(200).json(batch);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/updatell_ul/:batch", async (req, res) => {
  try {
    const name = req.params.batch;
    const ul = req.body.ul;
    const ll = req.body.ll;
    const batch = await Batch.findOneAndUpdate({ batchname: name }, {ul,ll});
    console.log(batch);
    // await batch.updateOne({ ul: ul, ll:ll });
    res.status(200).json(batch);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// add many students by finding
router.put("/addstds/:id", async (req, res) => {
  try {
    const batchid = req.params.id;
    const fbatch = req.body.fbatch;
    const batch = await Batch.findById(batchid);
    const students = await Students.find({ batch: fbatch });
    await batch.updateOne({ students: students });
    res.status(200).json(batch);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add a student
router.put("/addstudent/:id", async (req, res) => {
  try {
    const batchid = req.params.id;
    const batch = await Batch.findById(batchid);
    await batch.updateOne({ $push: { students: req.body } });
    const sortedbatch = await Batch.findById(batchid);
    sortedbatch.students.sort((a, b) => a.rollno - b.rollno);
    sortedbatch.save();
    res.status(200).json(sortedbatch);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get batch
router.get("/getbatch/:id", async (req, res) => {
  try {
    const batchid = req.params.id;
    // const subjectname = req.body.subjectname;
    const batch = await Batch.findById(batchid);
    // await batch.updateOne({$push: { subjects: req.body }});
    res.status(200).json(batch);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all batchers

router.get("/getallbatches", async (req, res) => {
  try {
    const batches = await Batch.find();
    res.status(200).json(batches);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//find batch by batch name

router.get("/getbatchname/:batch", async (req, res) => {
  try {
    const name = req.params.batch;
    // console.log(req.params.batch)
    const batch = await Batch.find({ batchname: name });
    res.status(200).json(batch);
  } catch (err) {
    s;
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
