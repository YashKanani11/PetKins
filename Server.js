
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const dbConnect = require('./mongoDB')
const mongodb=require('mongodb')


const validation = (req, res, next) => {
    if (!req.body.name) {
        res.send("Please enter name")
    }
    else { next() }

}
// app.use(validation)
app.use(express.json())
app.get("/", (req, res) => {
    res.send("server is running")
})
app.get("/view-category", async (req, res) => {
    const db = await dbConnect;
    const viewCategory = db.collection('category');
    const categoryData = await viewCategory.find({}).toArray();
    if (categoryData.length != 0) {
        res.send("Yash kanani - " + categoryData)
    }
    else {
        res.send("Yash kanani - Data not found")
    }
    console.log('found Documents +> ', categoryData);

})
app.post("/contact", validation, async (req, res) => {
    const db = await dbConnect;
    const contact = db.collection('contact');
    const data = {
        'name': req.body.name,
        'email': req.body.email
    }
    const inserData = await contact.insertOne(data)
    res.send("Yash kanani - record inserted auccesfully")
})

// put or patch for updating data
app.put("/update/:id", async (req, res) => {
    const db = await dbConnect;
    const updateData = db.collection('contact');
    const data = {
        'name': req.body.name,
        'email': req.body.email
    }
    const inserData = await updateData.updateOne({'_id': new mongodb.ObjectId(req.params.id)},{$set:data})
    if(inserData){
        res.send("record enterd succesfully"+inserData)
    }
    else{
        res.send("data coulnt be entered")
    }
})
app.delete("/delete/:id", async (req, res) => {
    const db = await dbConnect;
    const deleteData = db.collection('contact');
    const data = {
        'name': req.body.name,
        'email': req.body.email
    }
    const deletedData = await deleteData.deleteOne({'_id': new mongodb.ObjectId(req.params.id)},{$set:data})
    if(deletedData){
        res.send("record enterd succesfully "+ data.name +" "+ data.email)
    }
    else{
        res.send("data coulnt be entered")
    }
})
// for all other links
app.use((req,res,next) => {
    var arr={
        "status":false,
        "message":"Oopse something went wrong"
    }
    res.status(404).send(arr)
})
app.listen(5000)
