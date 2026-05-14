require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const {
        fullname,
        dob,
        gender,
        marital_status,
        email,
        phone,
        address,
        city,
        state,
        qualification,
        occupation,
        age,
        password
    } = req.body;

    const sql = `
    INSERT INTO users
    (fullname, dob, gender, marital_status, email, phone, address, city, state, qualification, occupation, age, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        fullname, dob, gender, marital_status, email, phone,
        address, city, state, qualification, occupation, age, password
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error");
        } else {
            res.send("Registered Successfully");
        }
    });
});

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) res.send(err);
        else res.json(result);
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});