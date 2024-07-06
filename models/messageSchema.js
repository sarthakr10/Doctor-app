import mongoose from "mongoose";
import validator from "validator";


const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength: [3,"First name must have 3 Character"]
    },
    lastName:{
        type:String,
        required:true,
        minLength: [3,"Last name must have 3 Character"]
    },
    email:{
        type:String,
        required:true,
        validate: [validator.isEmail,"Please provide a valid email!"]
    },
    phone:{
        type:String,
        required:true,
        minLength: [11,"Phone number must have 11 digits"],
        maxLength: [11,"Phone number must have 11 digits"],
    },
    message:{
        type:String,
        required:true,
        minLength: [10,"Message must have 10 Character"],
    },
})
export const Message = mongoose.model("Message",messageSchema);
