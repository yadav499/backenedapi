const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://yadavhemantkumar30:uzQMcnccKcMjTAzV@cluster0.vugalmy.mongodb.net/all-user").then(()=>{
    console.log("database connected successfully");
}).catch(()=>{
    console.log("database not connected");
})

app.get("/",(req,res)=>{
    res.send("Welcome to Hemant's World");
})


app.post("/register",async(req,res)=>{
try {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
      return res.status(401).send({
        success:false,
        message:"Pls fill all the fields",

      })
    } 
    const user = new userModel({name, email, password});
    await user.save();
    return res.status(200).send({
        success:true,
        message:"Registered Successfully",
        user
    })
} catch (error) {
    console.log(error);
    return res.status(500).send({
        success:false,
        message:"Error registering",
        error
    })
    
}
})






app.listen(4001, ()=>{
    console.log("server is running at 4001");
})