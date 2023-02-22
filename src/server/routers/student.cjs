const express = require("express");
const Student = require("../model/student.cjs");
const router = express.Router();

router.get("/students", async (req, res) => {
  try {
    const students = await Student.find({});
    res.send(students);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/students/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const student = await Student.findById(_id);
    if (!student) {
      return res.status(404).send();
    }
    res.send(student);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/students", async (req, res) => {
  const student = new Student(req.body);

  try {
    await student.save();
    res.status(201).send(student);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch("/students/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "major", "college"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.student[update] = req.body[update]));
    await req.student.save();
    res.send(req.student);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/students/:id", async (req, res) => {
  try {
    await req.student.remove();
    res.send(req.student);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
