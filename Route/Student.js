const express  = require('express')
const mongoose = require('mongoose')
const router = express.Router();


const app = express();

app.use(express.json());


mongoose.connect('mongodb://localhost/Project_Student_Data_Base')
.then(()=>console.log("Connected"))
.catch(()=>console.log("Not Connected"))

const Student = new mongoose.Schema({
    Name:{type:String,required:true ,minlength:5,maxlength:20},
    Age:{type:Number,required:true},
    Course:{type:String,required:true,enum:["DSA","Web Development","Hacking"]},
    IsReg:{type:Boolean}
    
})

const Student_Model = mongoose.model('Student_Model',Student);
//GET THE DATA
app.get('/api/Student',async(req,res)=>{
const Get_Data = await Student_Model.find();
res.send(Get_Data);
})
//ADD THE DATA
app.post('/api/Student',async(req,res)=>{
    const Add_Data = new Student_Model({
        Name:req.body.Name,
        Age:req.body.Age,
        Course:req.body.Course,
        IsReg:req.body.IsReg

    })
    const Save_Data = await Add_Data.save();
    res.send(Save_Data);
})

app.put('/api/Student/:id',async (req,res)=>{
    const Update_Data = await Student_Model.findByIdAndUpdate(req.params.id
        ,{Name:req.body.Name},
        {Age:req.body.Age},
        {new:true}
    );
  
    if(!Update_Data)
    {
        res.status(404).send("No Data i s Found ToUpdate")
    } else{
        res.send(Update_Data);
    }
})












module.exports  = router;