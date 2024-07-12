const mongoose = require("mongoose")

const EmployeeShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Field Must Required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email Address Field Must Required"]
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Phone Number Field Must Required"]
    },
    dsg: {
        type: String,
        required: [true, "Designation Field Must Required"]
    },
    salary: {
        type: Number,
        required: [true, "Salary Field Must Required"]
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
})
const Empployee = new mongoose.model("Employee", EmployeeShema)

module.exports = Empployee