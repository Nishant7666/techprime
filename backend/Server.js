import express from "express";
const app = express();
import mongoose from "mongoose";
app.use(express.urlencoded({ extended:true}))
app.use(express.json())
const mongoUrl="mongodb+srv://nishantchavan209:nishant@cluster0.ve0nhbs.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("Connection successfull");})
.catch((e)=>console.log(e))

const newSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports=collection

// line 3 : import Mongo db
// line 4 : 