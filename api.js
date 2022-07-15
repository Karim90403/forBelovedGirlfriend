const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const jsonParser = express.json();

let myData = []
let herData = []
let countDays = 0
let users = [
    { login: 'Karim', password: 'password-safetyTo-064f312' },
    { login: 'Anastasia', password: 'safety-Password-ae4b3c' }
]

app.post('/login', (req, res) => {

    for (let i = 0; i <= users.length; i++) {
        if (req.body.login == users[i].login && req.body.password == users[i].password) {
            res.status(200).json({ token: jwt.sign({ id: 1, user: users[i].login }, process.env.TOKEN), status: true, user: { id: 1, user: users[i].login } })
        } else { res.status(401).json({ message: "Invalid credentials", status: false }) }
    }

})

app.post("/verify", (req, res) => {
    jwt.verify(req.body.token, process.env.TOKEN, (err, user) => {
        if (err !== null) { res.status(401).json({ status: false, message: err.message }) } else {
            res.status(200).json({ status: true, user })
        }
    })
})

app.get("/list", (req, res) => {
    res.json({ myData, herData, countDays })
    console.log(`${myData}`)
})

app.post("/chengeCounter", (req, res) => {
    console.log(req.body);
    countDays = req.body.data
    res.status(201).json({ message: "success" })
})

app.post("/addToMy", (req, res) => {
    console.log(req.body);
    myData.push(req.body.data)
    res.status(201).json({ message: "success" })
})

app.post("/addToHer", (req, res) => {
    console.log(req.body);
    herData.push(req.body.data)
    res.status(201).json({ message: "success" })
})

app.post("/removeFromMy", (req, res) => {
    console.log(req.body);
    myData = myData.filter(function (value) {
        return value.text != req.body.data
    })
    res.status(201).json({ message: "success" })
})

app.post("/removeFromHer", (req, res) => {
    console.log(req.body);
    herData = herData.filter(function (value) {
        return value.text != req.body.data
    })
    res.status(201).json({ message: "success" })
})


module.exports = app