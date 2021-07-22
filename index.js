//const express = require('express');
import express from "express";
import mongoose from "mongoose";
import { Student } from "./models/student.js"
import { Mentor } from "./models/mentors.js"  

const app = express();
const PORT = 4000;

//DB connection

const url = "mongodb+srv://Suparnan:Guvi@123@cluster0.clkv3.mongodb.net/assignMentor";
mongoose.connect(url, {useNewUrlParser: true});
const con = mongoose.connection;
con.on('open',() => console.log("Database Connected"));

//middleware
app.use(express.json());

app.get('/', (request, response) => {
    response.send('Use the following URL to assign: \n Mentor API:"/mentors" \n Student API:"/students" \n API to Assign a student to Mentor: \n 1.Select one mentor and Add multiple Student:"/mentors/:mentname/:stuname"\n2. A student who has a mentor should not be shown in List:"/students/nomentors"\n API to Assign or Change Mentor for particular Student:"/mentors/change/:stuname/:mentname"\nAPI to show all students for a particular mentor:"/mentors/:name"\nNote: "The Mentor and Student name are case sensitive, Please provide the name properly"')
});

//Write API to create Mentor
app.get('/mentors', async (request, response) => {
    
    const ment = await Mentor.find({});
    console.log(ment);
    response.send(ment);

});

//Write API to create Student
app.get('/students', async (request, response) => {
    
    const stu = await Student.find({});
    console.log(stu);
    response.send(stu);

});

//Write API to Assign a student to Mentor

//Select one mentor and Add multiple Student 

app.put('/mentors/:mentname/:stuname', async (request,response) => {
    const {mentname} = request.params;
    const {stuname} = request.params;
        
    try{
    const ment = await Mentor.updateOne({"name":{$eq:mentname}},{$push:{"students" : stuname}}); 
    const stu1 = await Student.updateOne({name:{$eq:stuname}},{$set:{mentor:mentname}});
        
    console.log(ment);

    response.send(ment);
  
    } catch (err){
            response.status(500);
            response.send(err);
        }

});

//A student who has a mentor should not be shown in List

app.get('/students/nomentors', async (request, response) => {
    const stu = await Student.find({mentor:{$eq:""}});
    //const stu = await Student.find({});
    console.log(stu);
    response.send(stu);

});

//Write API to Assign or Change Mentor for particular Student

//Select One Student and Assign one Mentor
app.put('/mentors/change/:stuname/:mentname', async (request,response) => {
    const {stuname} = request.params;
    const {mentname} = request.params;
    

    try{
    const mentrem = await Mentor.updateOne({students:{$eq:stuname}},{$pull:{"students" : stuname}});
    const mentup = await Mentor.updateOne({name:{$eq:mentname}},{$push:{"students" : stuname}}); 
    const stuup = await Student.updateOne({name:{$eq:stuname}},{$set:{mentor:mentname}});
           
    console.log(mentup,mentrem,stuup);
    response.send(mentup);
  
    } catch (err){
            response.status(500);
            response.send(mentup);
        }

});


//Write API to show all students for a particular mentor
app.get('/mentors/:name',async (request, response) => {
    
    const {name} = request.params;
    const ment1 =  await Mentor.find({name:{$eq:name}},{_id:0,id:0,subject:0});
    
    console.log(ment1);
    response.send(ment1);

});

app.listen(PORT,() => {
    console.log("The Express Server started Successfully",+PORT);
});
