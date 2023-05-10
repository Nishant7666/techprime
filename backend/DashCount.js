const express = require("express")
const app = express();
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended:true}))
app.use(express.json())
const jwt = require("jsonwebtoken");
const JWT_SECRET = "djfldjf;ljdf82749283740001+_)90*&^acvnm";
const mongoUrl = "mongodb+srv://nishantchavan209:nishant@cluster0.ve0nhbs.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => {console.log("Connection successfull");})
.catch((e) => console.log(e))


require("./projectSave.js"); 
const Project = mongoose.model("Project");


app.get("/getAllCount", async (req, res) => {
    // const allpro = async () => {

        try
         {
            // count total projects
            const allProject = await Project.count();
            console.log(allProject);
            res.send({ status: "count", data: allProject });
    
            // count running projects
            // const running = await Project.find({status:"Running"}).count();
            // res.send({ status: "running", data: running });
    
            // count running projects
            // const closed = await Project.find({status:"Running"}).count();
            // res.send({ status: "running", data: closed });
    
            // count delayed projects
            // const delayed = await Project.find({}).count();
            // res.send({status:"delayed" , data : delayed})
    
        } catch (error) {
          console.log(error);
        }
    // }
});

const port = 9003;
app.listen(port,() => {
    console.log(`server started on ${port} port`);
});
