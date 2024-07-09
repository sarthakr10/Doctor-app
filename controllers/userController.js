import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import  ErrorHandler from '../middlewares/errorMiddleware.js';
import { User } from '../models/userSchema.js';


export const patientRegister = catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,nic , dob,gender,password,role} = req.body;
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender|| 
        !password || !role) {
            return next(new ErrorHandler("Please fill all the fields",400));
    }
    let user = await User.findOne({email});
    if (user) {
        return next(new ErrorHandler('User already Registered!!',400));
    }
    user = await User.create({firstName,lastName,email,phone,nic , dob,gender,password,role})
    res.status(200).json({
        success:true,
        message: "User Registered"
        })
});


export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    if (password !== confirmPassword) {
      return next(
        new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
      );
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }
  
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler(`User Not Found With This Role!`, 400));
    }
    if (role !== user.role) {
        return next(new ErrorHandler(`User Not Found With This Role!`, 400));
      }
    res.status(200).json({
        success:true,
        message: "User Logged in Successfully!"
        })
})