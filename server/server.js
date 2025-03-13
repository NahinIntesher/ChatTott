const express = require("express");
// const connection = require("./Database/connection");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const verifyToken = require("./Middlewares/middleware");

// Middleware
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methds: ["GET", "POST"],
    credentials: true,
  })
);

// Connect to the database
// connection.connect((error) => {
//   if (error) {
//     console.error("Database connection failed: " + error.stack);
//     return;
//   }
//   console.log("Connected to database.");
// });

// app.post("/signup", (req, res) => {
//   const token = req.cookies.userRegistered;
//   if (token) {
//     return res.json({ status: "Success" });
//   }
//   const { email, password } = req.body;

//   bcrypt
//     .hash(password, 10)
//     .then((hashedPassword) => {
//       // Insert the user into the user table
//       connection.query(
//         "INSERT INTO user (email, password) VALUES (?, ?)",
//         [email, hashedPassword],
//         (err, results) => {
//           if (err) {
//             return res.status(500).json({ Error: "Error registering admin" });
//           }
//           return res.json({ status: "Success" });
//         }
//       );
//     })
//     .catch((error) => {
//       return res.json({ Error: "Error hashing password" });
//     });
// });

// app.post("/login", (req, res) => {
//   const token = req.cookies.userRegistered;
//   if (token) {
//     return res.json({ status: "Success" });
//   }
//   const { email, password } = req.body;
//   connection.query(
//     "SELECT * FROM user WHERE email = ?",
//     [email],
//     (err, results) => {
//       if (err) {
//         throw err;
//       }
//       if (results.length > 0) {
//         bcrypt.compare(
//           password.toString(),
//           results[0].admin_password,
//           (err, response) => {
//             if (err) return res.json({ Error: "Error comparing password" });
//             if (response) {
//               const uid = results[0].admin_id;

//               const token = jwt.sign({ id: uid, type: "admin" }, "1234", {
//                 expiresIn: "1d",
//               });
//               const cookieOptions = {
//                 expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
//                 httpOnly: true,
//               };

//               res.cookie("userRegistered", token, cookieOptions);
//               return res.redirect("/");
//             } else {
//               return res.json({ Error: "Password incorrect" });
//             }
//           }
//         );
//       } else {
//         res.json({ Error: "No email exists" });
//       }
//     }
//   );
// });


// app.get("/s", verifyToken, (req, res) => {
//   const userId = req.userId;
//   const userType = req.userType;
//   let query = `SELECT u.id, u.email, FROM user AS u WHERE u.id = ?`;
  
//   connection.query(query, [userId], (err, results) => {
//     if (err) {
//       console.error("Error fetching user data:", err);
//       return res.status(500).json({ Error: "Error fetching user data" });
//     }
    
//     if (results.length === 0) {
//       return res.status(404).json({ Error: "User not found" });
//     }
    
//     const user = results[0];
//     const interests = user.interests ? user.interests.split(",") : [];
    
//     return res.json({
//       status: "Success",
//       user: {
//         ...user,
//         interests,
//         type: userType,
//       },
//     });
//   });
// });

// app.get("/logout", (req, res) => {
//   res.clearCookie("userRegistered");
//   res.json({ status: "Success" });
// });

app.get("/", (req, res) => {
  res.send("Hello World");
});
const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
