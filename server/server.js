//import dependencies: express, cors, mysql, nodemon
const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const path = require("path")

//express app instance
const app = express()

//middleware serving static files
app.use(express.static(path.join(__dirname, "public")))
//managing web security
app.use(cors())
//passing json
app.use(express.json())
//port
const port = 5000
//creating db connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_project"
})

//post api
app.post('/add_student', (req,res) => {
    sql = "insert into student_details (`name`, `email`, `age`, `gender`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender
    ]
    db.query(sql, values,(err, result) => {
        if (err) return res.json({message: "Something unexpected has occured" + err})
        return res.json({success: "Student added successfully"})
    })
})
//update api
app.post("/edit_student/:id", (req,res) => {
    const id = req.params.id;
    const sql = "update student_details set `name`=?, `email`=?, `age`=?, `gender`=? where id=?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender,
        id
    ];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: "Something unexpected has occured"} + err);
        return res.json({ success: "Student edited successfully"})
    })
})

//get api
app.get("/students", (req,res) => {
    const sql = "select * from student_details";
    db.query(sql, (err, result) => {
        if (err) res.json ({ message: "Server error"});
        return res.json(result);
    })   
})
app.get("/student/:id", (req,res) => {
    const id = req.params.id;
    const sql = "select * from student_details where `id` = ? ";
    db.query(sql, [id], (err,result) => {
        if (err) res.json({ message: "Server error"});
        return res.json(result);
    })
})

//delete api
app.delete("/delete/:id", (req,res) => {
    const id = req.params.id;
    const sql = "delete from student_details where `id`=? ";
    db.query(sql, [id], (err,result) => {
        if (err) res.json({ message: "Server error" + err});
        return res.json({ success: "Student deleted"});
    })
})




//starting server
app.listen(port, () => {
    console.log("Listening")
})