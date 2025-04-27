const express = require('express');
const { Student } = require('../models/Student');

const router = express.Router();

// Query 1: Find all students in the CS department
router.get('/students/cs', async (req, res) => {
  const students = await Student.find({ department: 'CS' });
  res.json(students);
});

// Query 2: Find all students older than 25
router.get('/students/age/25', async (req, res) => {
  const students = await Student.find({ age: { $gt: 25 } });
  res.json(students);
});

// Query 3: Find students with CGPA >= 2.7
router.get('/students/cgpa/2.7', async (req, res) => {
  const students = await Student.find({ CGPA: { $gte: 2.7 } });
  res.json(students);
});

// Query 4: Find students in Math or Physics department
router.get('/students/departments', async (req, res) => {
  const students = await Student.find({ department: { $in: ['Math', 'Physics'] } });
  res.json(students);
});

// Query 5: Find students whose name starts with 'A'
router.get('/students/name/a', async (req, res) => {
  const students = await Student.find({ name: { $regex: /^A/, $options: 'i' } });
  res.json(students);
});

// Query 6: Count students in each department
router.get('/students/count', async (req, res) => {
  try {
    const counts = await Student.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $project: { _id: 0, department: '$_id', count: 1 } }
    ]);
    res.json(counts);
  } catch (error) {
    console.error('Error in /students/count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Query 7: Sort students by CGPA descending order
router.get('/students/sort/cgpa', async (req, res) => {
  const students = await Student.find().sort({ CGPA: -1 });
  res.json(students);
});

// Route to fetch all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from the database
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

module.exports = router;