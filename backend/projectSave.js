const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const mongoUrl = "mongodb+srv://nishantchavan209:nishant@cluster0.ve0nhbs.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl , {useNewUrlParser : true , useUnifiedTopology : true})
.then(() =>
{
  console.log("Connection successfull");
})
.catch((e) => console.log(e));

const projectSchema = new mongoose.Schema
(
  {
    texthere:String,
    reason:String,
    type:String,
    division:String,
    category:String,
    priority:String,
    department:String,
    startDate:String,
    endDate:String,
    currentStatus:String,
    location:String,
  },
  {
    collection:"Project",
  },
);

const Project = new mongoose.model("Project",projectSchema);
module.exports = mongoose.model("Project",projectSchema);

app.post("/CreateProject",async(req,res) => 
{
  const 
  {
    texthere,
    reason,
    type,
    division,
    category,
    priority,
    department,
    startDate,
    endDate,
    currentStatus,
    location,
  } = req.body;

  try {
    await Project.create
    ({
        texthere,
        reason,
        type,
        division,
        category,
        priority,
        department,
        startDate,
        endDate,
        currentStatus,
        location,
    });
    res.send({status:"welcome" ,message:"You have Login Successfully"});
  }
  catch(error)
  {
    res.send({status:"error"});
  }
});

app.get("/paginatedUsers",async(req,res) => 
{
  const allUser=await Project.find({});
  const page=parseInt(req.query.page);
  const limit=parseInt(req.query.limit);

  const startIndex=(page - 1) * limit;
  const lastIndex=page * limit;

  const results={};
  results.totalUser=allUser.length;
  results.pageCount=Math.ceil(allUser.length / limit);

  if(lastIndex < allUser.length) 
  {results.next={page:page + 1,};}

  if(startIndex > 0)
  {results.prev={page:page - 1,};}

  results.result=allUser.slice(startIndex,lastIndex);
  res.json(results);
});

app.get("/getAllUser",async(req,res) => 
{
    try 
    {
      const allUser = await Project.find({});
      res.send({status:"ok",data:allUser});
    }
    catch(error){console.log(error);}
});

app.post("/UpdateStatus",async(req,res) =>
{
  const id = req.body.id;
  const newStatus = req.body.newStatus;
  console.log(id)
  console.log(newStatus)
  try
  {
    const updatedRow = await Project.updateOne({_id:id},{$set:{currentStatus:newStatus}})
    res.send({status:"ok",data:updatedRow});
  }
  catch(err)
  {
    console.log(err)
  }
});

app.get("/barGraph" , async (req,res) =>
{
  try
  {
    // total STR
    const str = await Project.find({department:"Strategy"}).count();
    // total STR/closed
    const strCount = await Project.find({$and:[{department:"Strategy"},{currentStatus:"Closed"}]}).count();
   
    // total fin
    const fin = await Project.find({department:"Finance"}).count();
    // total fin/closed
    const finCount = await Project.find({$and:[{department:"Strategy"},{currentStatus:"Closed"}]}).count();
    
    // total STR
    const qlt = await Project.find({department:"Quality"}).count();
    // total STR/closed
    const qltCount = await Project.find({$and:[{department:"Quality"},{currentStatus:"Closed"}]}).count();
    
    // total STR
    const man = await Project.find({department:"Maintenance"}).count();
    // total STR/closed
    const manCount = await Project.find({$and:[{department:"Maintenance"},{currentStatus:"Closed"}]}).count();
    
    // total STR
    const sto = await Project.find({department:"Stores"}).count();
    // total STR/closed
    const stoCount = await Project.find({$and:[{department:"Stores"},{currentStatus:"Closed"}]}).count();
    
    // total STR
    const hr = await Project.find({department:"Hr"}).count();
    // total STR/closed
    const hrCount = await Project.find({$and:[{department:"Hr"},{currentStatus:"Closed"}]}).count();
    
    // all barGraph data in one response
    return res.send
      ({ 
        str:str,
        strCount:strCount,

        fin:fin,
        finCount:finCount,

        qlt:qlt,
        qltCount:qltCount,

        man:man,
        manCount:manCount,

        sto:sto,
        stoCount:stoCount,
        
        hr:hr,
        hrCount:hrCount,
      });
  }
  catch(error)
  {
    console.log(error)
  }
})

app.get("/getAllCount" , async (req, res) =>
{
  try
  {
      // count total projects
      const allProject = await Project.count();
      // count running projects
      const running = await Project.find({currentStatus:"Running"}).count();
      // count closed projects
      const closed = await Project.find({currentStatus:"Closed"}).count();
      // count cancelled projects
      const cancelled = await Project.find({currentStatus:"Cancelled"}).count();
      //closure delay projects
      const delay = await Project.find({
        $and: [
          { currentStatus: "Running" },
          { endDate: { $lte: new Date() } }
        ]
      }).countDocuments();
      

      // all results in one responsec
      return res.send
      ({ 
        count:allProject,
        running:running,
        closed:closed,
        cancelled:cancelled,
        delay:delay
      });
  } 
  catch(error) 
  {
    console.log(error);
  }
});

// User model import for collection name
// require("../frontend/Component/userDetails"); 


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
const User = mongoose.model("User");

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

const port=8000;
app.listen(port,() => 
{
  console.log(`server started on ${port} port`);
});
