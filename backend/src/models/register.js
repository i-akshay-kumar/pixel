const mongoose = require("mongoose");

const imageSearchAppUserSchema = new mongoose.Schema({
    fullname : {
        type : String, 
        required : true
    }, 

    mobilenumber : {
        type : Number, 
        required : true, 
        unique : true
    }, 

    email : {
        type: String, 
        required : true, 
        unique : true
    }, 

    password : {
        type : String, 
        requried : true
    }
})

const Register = new mongoose.model("Register", imageSearchAppUserSchema) ; 

module.exports = Register ; 
