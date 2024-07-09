import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import {Message} from "../models/messageSchema.js"
import  Errorhandler  from '../middlewares/errorMiddleware.js';

export const sendMessage = catchAsyncErrors(async(req,res,next)=>{
    const {firstName , lastName,email,phone,message} = req.body;
    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new Errorhandler("PLease fil full form"));
    }

    await Message.create({firstName , lastName,email,phone,message});
    res.status(200).json({
        success: true,
        message: "Message sent successfully",
     })
});