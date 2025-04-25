const mongoose=require('mongoose')
const express=require('express')
const connectToDb=require('./db')
require('dotenv').config()
const routes=require('./Routes/route')
const app=express()

app.use(express.json())

const Port=process.env.PORT || 8000;
const Db_url=process.env.DB_URL;

app.get('/get',(req,res)=>{
    res.send('Hello')
})

routes.use('/crud',routes)


app.listen(Port,async(req,res)=>{
    try{
    connectToDb(Db_url)
    console.log("Database connected")
    console.log(`server is running on http://localhost:${Port}`)
    }catch(err){
        console.log(err)
    }
})