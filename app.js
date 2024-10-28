const express = require('express');  //IMPORTING THE EXPRESS
const app = express();  //IMPORT EXPRESS TO APP //OR ASSIGNING THE TO APP
const categories = require('./Backend_Student_Code-143/Route/Categories') //IMPORTING THE CAT FROM ROUTE
const mongoose = require('mongoose')  //IMPORTNG THE MONGOOSE
const Student = require('/Route/Student') //IMPORTING THE STUDENT 

mongoose.connect('mongodb://localhost/Project_Data_Base')
.then(()=>console.log("Daa Base Connected"))
.catch(()=>console.log("Not Yet Connected"))


// Middleware to parse JSON bodies
app.use(express.json());


app.use(categories);//HELP TO ACCESS THE CATORERIES DATA
app.use(Student); //IMPORT THE DATA OF THE STUDENT FILE


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
