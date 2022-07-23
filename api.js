const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const entrySchema = require('./assets/schemas/entrySchema')

let users = [
    { login: 'Anastasia', password: 'safety-Password-ae4b3c' },
    { login: 'Karim', password: 'password-safetyTo-064f312' }
]

const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb+srv://admin:!EotU322@cluster0.kcwdz.mongodb.net/myapp").then(err => {
    try {
        console.log("Connected to MongoDB");
    } catch {
        console.log(err);
    }
})


app.get('/test', async (req, res) => {
    try {
        try {
            await new entrySchema({
                myData: ['TestMe'],
                herData: ['TestHer'],
                countDays: 0
            }).save()
            res.json({ message: await entrySchema.findOne({}) })
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(err);
        res.json({ message: "Bye" })
    }
})

app.post('/login', (req, res) => {
    let isLoginned = false;
    users.forEach(people => {
        if (req.body.login == people.login && req.body.password == people.password) {
            res.status(200).json({ token: jwt.sign({ id: 1, user: people.login }, process.env.TOKEN), status: true, user: { id: 1, user: people.login } })
            isLogined = true;
        } else { isLoginned = false }
    })
    if (isLoginned == false) { res.status(401).json({ message: "Invalid credentials", status: false }) }
})

app.post("/verify", (req, res) => {
    jwt.verify(req.body.token, process.env.TOKEN, (err, user) => {
        if (err !== null) { res.status(401).json({ status: false, message: err.message }) } else {
            res.status(200).json({ status: true, user })
        }
    })
})

app.get("/list", async (req, res) => {
    try {
        let allData = await entrySchema.findOne({})
        res.status(200).json({ myData: allData.myData, herData: allData.herData, countDays: allData.countDays })
    } catch (e) {
        throw e
    }

})


app.post("/updateData", async (req, res) => {
    try {
        let resultData = await entrySchema.updateOne({}, { myData: req.body.myData, herData: req.body.herData, countDays: req.body.countDays });
        res.status(200).json({ myData: resultData.myData, herData: resultData.herData, countDays: resultData.countDays })
    } catch (error) {
        throw error
    }
})


module.exports = app