const express = require("express");
const connection = require("./Database/connection");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const verifyToken = require("./Middlewares/middleware");
require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connection
  .connect()
  .then((res) => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      connection.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        [name, email, hashedPassword],
        (err, results) => {
          if (err) {
            return res.status(500).json({ Error: "Error registering user" });
          }
          return res.json({ status: "Success" });
        }
      );
    })
    .catch((error) => {
      return res.json({ Error: "Error hashing password" });
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ Error: "Error during query" });
      }
      if (results.rows.length > 0) {
        bcrypt.compare(password, results.rows[0].password, (err, response) => {
          if (err) return res.json({ Error: "Error comparing password" });
          if (response) {
            const uid = results.rows[0].id;
            const userType = "user";
            const token = jwt.sign(
              { id: uid, type: "user" },
              `${process.env.JWT_SECRET}`,
              {
                expiresIn: `${process.env.JWT_EXPIRES_IN}`,
              }
            );

            const cookieOptions = {
              expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
              httpOnly: true,
              secure: process.env.NODE_ENV === "development",
              sameSite: "Lax",
              path: "/",
            };

            res.cookie(`${process.env.COOKIE_NAME}`, token, cookieOptions);

            return res.json({ status: "Success" });
          } else {
            return res.json({ Error: "Password incorrect" });
          }
        });
      } else {
        res.json({ Error: "No email exists" });
      }
    }
  );
});

app.get("/", verifyToken, (req, res) => {
  const userId = req.userId;
  const userType = req.userType;
  let query = `SELECT u.id, u.name, u.email FROM users AS u WHERE u.id = $1`;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ Error: "Error fetching user data" });
    }

    if (results.rows.length === 0) {
      return res.status(404).json({ Error: "User not found" });
    }

    const user = results.rows[0];

    return res.json({
      status: "Success",
      user: { user },
    });
  });
});

app.get("/allusers", async (req, res) => {
  let query = `SELECT u.id, u.name, u.email FROM users AS u`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ Error: "Error fetching user data" });
    }

    if (results.rows.length === 0) {
      return res.status(404).json({ Error: "User not found" });
    }
    return res.json({
      status: "Success",
      users: results.rows,
    });
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({ status: "Success" });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
