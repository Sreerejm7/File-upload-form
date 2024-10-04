const express = require("express");
const path = require("path");
const multer = require("multer");
const mongoose = require('./Database/database')
const format = require('./Schema/User_schema')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'views')));


// app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

var sin_upload= upload.fields([{name:'photo'},{name:'proof'}])

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.post("/uploadfile", sin_upload, async (req, res) => {
  try {
    const { name, branch } = req.body;
    const photo = req.files['photo'] ? req.files['photo'][0].path : null;
    const proof = req.files['proof'] ? req.files['proof'][0].path : null;
    
    
    // Check if all required fields are provided
    if (!name || !branch || !photo || !proof) {
      console.log("missing fields:", { Name, Branch, photo, proof });
      return res.status(400).send("All Fields are Required!"); // Send and stop further execution
    }

    // Save the data to the database
    const newFormat = new format({
      Name:name,
      Branch:branch,
      Photo: photo, 
      Proof: proof
    });

    await newFormat.save();
    console.log(req.body,req.files);
    console.log("Photo Details:"+photo);
    console.log("proof Details:"+proof);

    // Send success response
    res.send("Data is stored in the database successfully...");
  } catch (error) {
    console.log("Error while saving...", error);
    res.status(500).send("Failed to store data in the database!");
  }
});

app.listen(5000, () => {
  console.log("app is listening  to port 5000");
});
