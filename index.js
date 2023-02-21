
var express=require('express');
var app=express();
const storage=require('node-persist');
const bodyParser=require('body-parser');
var jsonParser=bodyParser.json();

storage.init();
app.get("/allstudent",async(req,res)=>{
  //res.send("student not found");
   console.log(req.params.id);
   let htmlcode="<h1>All student data</h1>"
  //if((await storage.keys()).includes(req.params.id)){
    const allStudents=(await storage.getItem("students")) ||[];
    allStudents.forEach((student) => {
      htmlcode+=`
      <div>
      <h3>Student Id:${student.id}</h3>
      </div>
      <br />`
      
    });
    // res.send(`<h1>Student detail</h1>
    // <h3>Id:${student.id}</h3>
    // <h3>Name:${student.name}</h3>
    // <h3>GPA:${student.gpa}</h3>`);
    res.send(htmlcode);
    
  // }else{
  //   res.send("student not found");
  // }
  
});
// app.get('/student/',async(req,res)=>{
//   //res.send("student not found");
//    console.log(req.params.id);
//   if((await storage.keys()).includes(req.params.id)){
//    const
//     res.send(`<h1>Student detail</h1>
//     <h3>Id:${(student.id)}</h3>
//     <h3>Name:${await storage.getItem(student.name)}</h3>
//     <h3>Name:${await storage.getItem(student.gpa)}</h3>`);
    
//   }else{
//     res.send("student not found");
//   }
  
// });
app.post("/student" , jsonParser,async(req,res)=>{
  const student={
    id:req.body.id,
    name:req.body.name,
    gpa:req.body.gpa,
  };
  const allStudents=( await storage.setItem("students"));
  allStudents.push(student);
  await storage.setItem("students",allStudents);
  res.status(200).json({success:true});
  console.log('POST parameter received are: ',req.body);
  res.send("Added");
});

app.listen(3000,()=>{
  console.log('deployed');

});