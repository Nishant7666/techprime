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
const mongoUrl = "mongodb+srv://nishantchavan209:nishant@cluster0.ve0nhbs.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => {console.log("Connection successfull");})
.catch((e) => console.log(e))

const userSchema = new mongoose.Schema(
  {
      email:{type:String, unique:true},
      password:String
  },
  {
      collection:"User",
  }
); 
const User = new mongoose.model("User",userSchema);

app.post("/Register", async (req, res) => {
    const { email, password} = req.body
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {   
      const oldUser = await User.findOne({ email });

      if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
        email,
        password: encryptedPassword        
    });
    res.send({ status: "ok" })
    } 
    catch (error) {
      res.send({ status: "error" });
    }
  })

  app.post("/login-user",async(req,res) => 
{
  const {email,password} = req.body;

  const user = await User.findOne({ email });
  if (!user) 
  {
    return res.json({ error: "User Not found" });
  }
  if(await bcrypt.compare(password, user.password)) 
  {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {expiresIn: "15m",});

    if (res.status(201)) 
    {
      return res.json({ status: "ok", data: token });
    } 
    else 
    {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

const port = 9002;
app.listen(port,() => {
    console.log(`server started on ${port} port`);
});
