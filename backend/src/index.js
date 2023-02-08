const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./database/connect");
const Register = require("./models/register");
const { default: mongoose } = require('mongoose');


app.get("/api/register", (req, res) => {
    res.send("registered user page");
})
app.post("/api/register", async (req, res) => {
    try {
        const registerUser = new Register({
            fullname: req.body.fullname,
            mobilenumber: req.body.mobilenumber,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })

        const registeredUser = await registerUser.save();
        res.status(200).json({
            title: "user registered successfully",
            isUserRegistered : true 
        })
    } catch (err) {
        res.status(400).json({
            title: "error",
            error: "user already exists"
        })
    }
})


app.post("/api/login", async (req, res) => {
    try {

        Register.findOne({ email: req.body.email }, (err, user) => {
            if (err) return res.status(500).json({
                title: "server error",
                error: err
            })

            if (!user) {
                return res.status(401).json({
                    title: "user not found",
                    error: "invalid credentials", 
                    isInvaidCredential : true 
                })
            }

            //incorrect password

            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).json({

                    title: "login failed",
                    error: "invalid credentials",
                    isInvaidCredential : true 
                })
            }

            //no error
            else {
                return res.status(200).json({
                    title: "login successful", 
                    isAuthUser : true,
                    userData : [user._id, user.fullname]
                })
            }
        })
    } catch (err) {
        console.log(err); 
    }
})


app.listen(3000, () => {
    console.log("server is listening to port 3000");
});

