const express = require("express");
const multer = require("multer");
const Course = require("../models/Course");
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, price } = req.body;
    const image = req.file ? req.file.path : "";
    const newCourse = new Course({ title, price, image });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, price } = req.body;
    const image = req.file ? req.file.path : undefined;
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, price, ...(image && { image }) },
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
