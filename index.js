const express = require("express")
const path = require("path")
const hbs = require("hbs")
const bodyParser = require("body-parser")

const Employee = require("./models/Employee")

require("./db-connect")

const app = express()
const encoder = bodyParser.urlencoded()

app.set("view engine", "hbs")
app.use(express.static(path.join(__dirname, "views/public")))
hbs.registerPartials(path.join(__dirname, "views/partials"))

app.get("", async (req, res) => {
    try {
        let data = await Employee.find().sort({ _id: -1 })
        res.render("index", { data: data })
    } catch (error) {
        console.log(error)
    }
})

app.get("/add", (req, res) => {
    res.render("add", { errorMessage: {}, data: {} })
})

app.post("/add", encoder, async (req, res) => {
    try {
        var data = new Employee(req.body)
        await data.save()
        res.redirect("/")
    } catch (error) {
        var errorMessage = {
            email: error.keyValue?.email ? "Email Address Alrady Exist" : error.errors?.email ? error.errors.email.message : "",
            phone: error.keyValue?.phone ? "Phone Number Alrady Exist" : error.errors?.phone ? error.errors.phone.message : "",
            name: error.errors?.name ? error.errors.name.message : "",
            dsg: error.errors?.dsg ? error.errors.dsg.message : "",
            salary: error.errors?.salary ? error.errors.salary.message : ""
        }
        res.render("add", { errorMessage: errorMessage, data: data })
    }
})

app.get("/delete/:_id", async (req, res) => {
    try {
        let data = await Employee.findOne({ _id: req.params._id })
        if (data)
            await data.deleteOne()

        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})

app.get("/edit/:_id", async (req, res) => {
    try {
        let data = await Employee.findOne({ _id: req.params._id })
        if (data)
            res.render("edit", { errorMessage: {}, data: data })
        else
            res.redirect("/")
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})

app.post("/edit/:_id", encoder, async (req, res) => {
    try {
        var data = await Employee.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name
            data.email = req.body.email
            data.phone = req.body.phone
            data.dsg = req.body.dsg
            data.salary = req.body.salary
            data.city = req.body.city
            data.state = req.body.state
            await data.save()
        }
        res.redirect("/")
    } catch (error) {
        console.log(error);
        var errorMessage = {
            email: error.keyValue?.email ? "Email Address Alrady Exist" : error.errors?.email ? error.errors.email.message : "",
            phone: error.keyValue?.phone ? "Phone Number Alrady Exist" : error.errors?.phone ? error.errors.phone.message : "",
            name: error.errors?.name ? error.errors.name.message : "",
            dsg: error.errors?.dsg ? error.errors.dsg.message : "",
            salary: error.errors?.salary ? error.errors.salary.message : ""
        }
        res.render("edit", { errorMessage: errorMessage, data: data })
    }
})

app.get("/search", async (req, res) => {
    let search = req.query.search
    console.log(search);
    try {
        let data = await Employee.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { dsg: { $regex: search, $options: "i" } },
                { city: { $regex: search, $options: "i" } },
                { state: { $regex: search, $options: "i" } }
            ]
        }).sort({_id:-1})
        res.render("index", { data: data })
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})

app.listen(8000, () => {
    console.log(("Server Is Running at http://localhost:8000"))
})