const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  department: String,
  CGPA: Number,
});

const Student = mongoose.model('Student', studentSchema);

// Modify seedData to insert dummy data only if the database is empty
const seedData = async () => {
  try {
    const count = await Student.countDocuments();
    if (count > 0) {
      console.log('Database already populated. Skipping seeding.');
      return;
    }

    const students = [
      { name: 'Taaha', age: 22, department: 'CS', CGPA: 3.5 },
      { name: 'Bilal', age: 26, department: 'Math', CGPA: 2.8 },
      { name: 'Danial', age: 24, department: 'Physics', CGPA: 3.0 },
      { name: 'Anss', age: 28, department: 'CS', CGPA: 2.5 },
      { name: 'Asad', age: 23, department: 'Math', CGPA: 3.2 },
      { name: 'Usman', age: 27, department: 'Physics', CGPA: 2.7 },
      { name: 'Hammad', age: 21, department: 'CS', CGPA: 3.8 },
      { name: 'Abdul rehman', age: 25, department: 'Math', CGPA: 2.9 },
    ];

    await Student.insertMany(students);
    console.log('Dummy data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = { Student, seedData };