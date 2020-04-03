const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    empId: {
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    DOB:{
        type: Date,
        required: false
    },
    mobile:{
        type: Number,
        required: false
    },
    gender:{
        type: String,
        required: false
    },
    Address:{
        type: String,
        required: false
    }
});


const Employee = module.exports = mongoose.model('Employee', employeeSchema)
