const exp = require('express');

const app = exp();
const PORT = 3000;

app.use(exp.json());

let students = [
  { id: 101, name: 'Alice', age: 21, branch: 'CSE' },
  { id: 102, name: 'Bob', age: 20, branch: 'IT' }
];

const findStudentById = (id) => {
  return students.find((student) => student.id === id);
};

app.get('/', (req, res) => {
  res.send('Student CRUD API is running');
});

app.get('/students', (req, res) => {
  res.status(200).json(students);
});

app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id);

  const student = findStudentById(id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.status(200).json(student);
});

app.post('/students', (req, res) => {
  const { name, age, branch } = req.body;

  if (!name || !age || !branch) {
    return res
      .status(400)
      .json({ message: 'Name, Age and Branch are required' });
  }

  const id = students.length
    ? students[students.length - 1].id + 1
    : 1;

  const newStudent = {
    id,
    name,
    age,
    branch
  };

  students.push(newStudent);

  res.status(201).json({
    message: 'Student added successfully',
    newStudent
  });
});

app.put('/students/:id', (req, res) => {
  const id = Number(req.params.id);

  const student = findStudentById(id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const { name, age, branch } = req.body;

  if (!name || !age || !branch) {
    return res
      .status(400)
      .json({ message: 'Name, Age and Branch are required' });
  }

  student.name = name;
  student.age = age;
  student.branch = branch;

  res.status(200).json({
    message: 'Student updated successfully',
    student
  });
});

app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);

  const student = findStudentById(id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  students = students.filter((s) => s.id !== id);

  res.status(200).json({
    message: 'Student deleted successfully'
  });
});

app.listen(PORT, () => {
  console.log(`Server currently running at http://localhost:${PORT}`);
});



/* get http://localhost:3000/ output:student crud api is running
get requests (all students) http://localhost:3000/students
GET Request (Get Student by ID) http://localhost:3000/students/101
(Invalid GET Request Validation) http://localhost:3000/students/110
post reuqest {"name": "crs", "age": 18,"branch":"cse"} hit send
PUT Request (Update Student Details) Invalid Request:http://localhost:3000/students/104
PUT request correct:http://localhost:3000/students/102
{"name": "rps", "age": 18,"branch":"it"}
delete http://localhost:3000/students/103
get http://localhost:3000/students/103 not found */