const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const User2 = require("../DB/lost-itemsdb");


// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  },
});

const upload = multer({ storage });

// POST /api/register
// Register a new user
router.post("/register", upload.single("image"), async (req, res) => {
  const { username, email, password,objectName, location, date} = req.body;
  const image = req.file;

  try {
    // Check if user already exists
    let user = await User2.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User2({
      username,
      email,
      password,
      image: image ? image.filename : null,
      objectName,
      location,
      date,
    });

    // Save user to the database
    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error submitting lost item details'})
};

})
module.exports = router;
