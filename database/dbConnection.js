import mongoose from "mongoose";

export const dbCollection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "doctorapp"
    }).then(()=>{
        console.log("Connected to DB");
    }).catch((err) =>{
        console.log(`Some error occured while connecting to database: ${err}`);
    })
}