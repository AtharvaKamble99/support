const express = require("express");
const path = require("path");
const Students = require("./studentMarks");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const mongoUrl = "mongodb://0.0.0.0:27017/stud";
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is listing on port ${PORT} `);
});

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

app.post("/add", async (req, res) => {
  const { Name, Roll_no, CC, WAD, CNS, DSBDA, AI } = req.body;
  const student = await Students.create({
    Name,
    Roll_no,
    CC,
    WAD,
    CNS,
    AI,
    DSBDA,
  });
  res.send({ message: "Student inserted successfully", student });
});

app.get("/showStudents", async (req, res) => {
  const students = await Students.find();
  res.send({ "total count": students.length, students });
});

app.get("/DSBDA_20", async (req, res) => {
  const students = await Students.find({ DSBDA: { $gt: 20 } });
  res.send(students);
});

app.get("/morethan25inall", async (req, res) => {
  const students = await Students.find(
    {
      DSBDA: { $gt: 25 },
      CC: { $gt: 25 },
      CNS: { $gt: 25 },
      WAD: { $gt: 25 },
      AI: { $gt: 25 },
    },
    {
      Roll_no: true,
    }
  );
  res.send(students);
});

app.get("/lessthan40", async (req, res) => {
  const students = await Students.find(
    {
      DSBDA: { $lt: 40 },
      WAD: { $lt: 40 },
    },
    { Name: true }
  );
  res.send(students);
});

app.delete("/deleteStudents/:student_id", async (req, res) => {
  const student_id = req.params.student_id;
  const student = await Students.findByIdAndDelete({ _id: student_id });
  //     res.send({meassage: "Student is deleted successfully",
  // student});

  res.send({ meassage: "Student is deleted successfully" });
});

app.get("/showTable", async (req, res) => {
  const students = await Students.find();

  let html = "<table border=1, style='border-collapse: collapse'>";
  html =
    html +
    `<tr>
        <th>Name</th>
        <th>Roll_No</th>
        <th>WAD</th>
        <th><CC</th>
        <th>DSBDA</th>
        <th>CNS</th>
        <th>AI</th>
    </tr>`;

  students.map((student) => {
    html = html + "<tr>";

    html = html + "<td>" + student.Name + "</td>";
    html = html + "<td>" + student.Roll_no + "</td>";
    html = html + "<td>" + student.WAD + "</td>";
    html = html + "<td>" + student.CC + "</td>";
    html = html + "<td>" + student.DSBDA + "</td>";
    html = html + "<td>" + student.CNS + "</td>";
    html = html + "<td>" + student.AI + "</td>";

    html = html + "</tr>";
  });
  html = html + "</table>";
  res.send(html);
});

app.put("/update_marks/:student_id", async (req, res) => {
  const student_id = req.params.student_id;
  const stud = await Students.findById({ _id: student_id });
  if (stud) {
    const students = await Students.findOneAndUpdate(
      { _id: student_id },
      {
        $inc: {
          CC: 10,
          DSBDA: 10,
          CNS: 10,
          WAD: 10,
        },
      },
      { new: true }
    );
    res.send("Student updated Successfully");
  } else {
    res.send("student not found");
  }
});
