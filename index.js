//const express = require('express');
import express from "express";
import mongoose from "mongoose";
import { Student } from "./models/student.js"
import { Mentor } from "./models/mentors.js"  

const app = express();
const PORT = 4000;

//DB connection

const url = "mongodb://localhost/assignMentor";
mongoose.connect(url, {useNewUrlParser: true});
const con = mongoose.connection;
con.on('open',() => console.log("Database Connected"));

//middleware
app.use(express.json());



app.get('/', (request, response) => {
    response.send('Hello Guvi')
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

app.put('/mentors/Senthil/:stuname1/:stuname2/:stuname3', async (request,response) => {
    const {stuname1} = request.params;
    const {stuname2} = request.params;
    const {stuname3} = request.params;
   // const {mentname} = request.params;
    
    try{
    const ment = await Mentor.updateOne({"name":{$eq:"Senthil"}},{$set:{"students.param1" : stuname1, "students.param2" : stuname2, "students.param3" : stuname3}}); 
    const stu1 = await Student.updateOne({name:{$eq:stuname1}},{$set:{mentor:"Senthil"}});
    const stu2 = await Student.updateOne({name:{$eq:stuname2}},{$set:{mentor:"Senthil"}});
    const stu3 = await Student.updateOne({name:{$eq:stuname3}},{$set:{mentor:"Senthil"}});
    
    console.log(ment);

    response.send(ment);
  
    } catch (err){
            response.status(500);
            response.send(err);
        }

});

app.put('/mentors/Raghav/:stuname1/:stuname2', async (request,response) => {
    const {stuname1} = request.params;
    const {stuname2} = request.params;
    
    //const {mentname} = request.params;
    
    try{
    const ment = await Mentor.updateOne({"name":{$eq:"Raghav"}},{$set:{"students.param1" : stuname1, "students.param2" : stuname2 }}); 
    const stu1 = await Student.updateOne({name:{$eq:stuname1}},{$set:{mentor:"Raghav"}});
    const stu2 = await Student.updateOne({name:{$eq:stuname2}},{$set:{mentor:"Raghav"}});
    
    console.log(ment);

    response.send(ment);
  
    } catch (err){
            response.status(500);
            response.send(err);
        }

});

app.put('/mentors/Sneha/:stuname1/:stuname2', async (request,response) => {
    const {stuname1} = request.params;
    const {stuname2} = request.params;
    //const {mentname} = request.params;
    
    try{
    const ment = await Mentor.updateOne({"name":{$eq:"Sneha"}},{$set:{"students.param1" : stuname1, "students.param2" : stuname2}}); 
    const stu1 = await Student.updateOne({name:{$eq:stuname1}},{$set:{mentor:"Sneha"}});
    const stu2 = await Student.updateOne({name:{$eq:stuname2}},{$set:{mentor:"Sneha"}});
   
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
app.put('/mentors/:stuname/:mentname', async (request,response) => {
    const {stuname} = request.params;
    const {mentname} = request.params;
    
    try{
    const ment = await Mentor.updateOne({"name":{$eq:mentname}},{$set:{"students.param1" : stuname}}); 
    const stu = await Student.updateOne({name:{$eq:stuname}},{$set:{mentor:mentname}});
       
    console.log(ment);
    response.send(ment);
  
    } catch (err){
            response.status(500);
            response.send(err);
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