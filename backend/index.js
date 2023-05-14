const express = require("express");
const dbConnect = require("./db/dbConnect.js");
const bcrypt = require("bcrypt");
const authModel = require("./model/authModel.js");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const auth = require("./middleware/authentication");
const router = express.Router();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);
dbConnect(); // calling the mongodb connection function

// app.get("/", (req, res) => {
//   res.send("hello");
// });

router.post("/register", async (request, response) => {
  const { name, email, password } = request.body;

  try {
    if (name && email && password) {
      const isUser = await authModel.findOne({ email: email });
      if (isUser) {
        return response.status(400).json({ message: "user already exist" });
      } else {
        //password hasing
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //generateToken

        // const secretKey = "parvezAhmedAnsari";

        // const token = jwt.sign({ email: email }, secretKey, { expiresIn: "10m" });

        //save the user

        const newUser = authModel({
          name,
          email,
          password: hashPassword,
        });

        const resUser = await newUser.save();

        if (resUser) {
          return response
            .status(201)
            .json({ message: "registered successfully", user: resUser });
        }
      }
    } else {
      return response.status(400).json({ message: "all fields are required" });
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  try {
    if (email && password) {
      const isUser = await authModel.findOne({ email: email });
      if (isUser) {
        // Check is User Verified

        if (
          email === isUser.email &&
          bcrypt.compare(password, isUser.password)
        ) {
          // Generate token
          const token = jwt.sign({ userID: isUser._id }, "parvezAhmedAnsari", {
            // parvezAhmedAnsari == the secret key argument
            expiresIn: "2d",
          });
          return response.status(200).json({
            message: "Login Successfully",
            token,
            name: isUser.name,
          });
          // res.cookie('username', username);
          // response.cookie('userName', isUser.name)
        } else {
          return response.status(400).json({ message: "Invalid Credentials!" });
        }
      } else {
        return response.status(400).json({ message: "user Not Registered!!" });
      }
    } else {
      return response.status(400).json({ message: "all fields are required" });
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

// free endpoint
router.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
router.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

// Start the server
app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
