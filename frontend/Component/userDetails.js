const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        email:{type:String, unique:true},
        password:String
    },
    {
        collection:"User",
    }
);

mongoose.model("User",userSchema)
// module.exports=collection