import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import Errorhandler from "./errorMiddleware.js";
import  jwt from 'jsonwebtoken';

export const isAdminAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.adminToken;
    if(!token){
        return next(new Errorhandler("Admin Not Authenticated!",400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Admin") {
        return next(new Errorhandler(`${req.user.role} not Authenticated for this resources!`,403))
    }
    next();
})

export const isPatientAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next(new Errorhandler("Patient Not Authenticated!",400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
        return next(new Errorhandler(`${req.user.role} not Authenticated for this resources!`,403))
    }
    next();
})