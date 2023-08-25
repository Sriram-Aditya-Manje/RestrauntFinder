require("dotenv").config();
const express = require('express');
const Router = require('express-promise-router')
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const db = require('./db')

// app.use(morgan("dev")) //3rd party middleware
app.use(express.json())
app.use(
    cors({
        origin : "http://localhost:5173",
    })
)

// app.get("/get-restraunts",(req,res)=>{
//     // res.send("get restraunts called");
//     // res.json({
//     //     status: "success",
//     //     restraunt: "McD"
//     // })
//     res.status(404).json({
//         status: "success",
//         restraunt: "McD"
//     })
// });

//routes
app.get("/api/v1/get-restraunts",async (request,response)=>{
    response.set('Access-Control-Allow-Origin', '*');
    try{
        var results = await db.query("select *  from restraunts");
        response.status(200).json({
            status : "success",
            results:results.rows.length,
            data : {
                restraunts : results.rows,
            }
        })
    }catch(err){
        response.send(err);
    }
})

app.get("/api/v1/get-restraunt/:restraunt_id",async (request,response)=>{
    try{
        var results = await db.query(`select * from restraunts where id = ${request.params.restraunt_id}`)
        response.status(200).json({
            status : "success",
            data : {
                restraunt : results.rows
            }
        })
    }catch(err){
        console.log(err);
    }
})

app.post("/api/v1/create-restraunt",async (request,response)=>{
    try{
        const results = await db.query("INSERT INTO restraunts (name,location,price_range) VALUES ($1,$2,$3)",[request.body.name, request.body.location, request.body.price_range]);
        const last_rec = await db.query("SELECT * FROM restraunts WHERE id = (SELECT max(id) FROM restraunts)");
        response.status(200).json({
            status : "success",
            data : {
                restraunt : last_rec.rows 
            }
        })
    }catch(err){
        console.log(err);
    }
});

app.put("/api/v1/update-restraunt/:restraunt_id",async (request,response)=>{
    try{
        const results = await db.query(`UPDATE restraunts SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *`,
        [request.body.name, request.body.location, request.body.price_range, request.params.restraunt_id]);
        response.status(200).json({
            status : "success",
            data : {
                restraunts : results.rows[0]
            }
        })
    }catch(err){
        console.log(err);
    }
});

app.delete("/api/v1/delete-restraunt/:restraunt_id",async (request,response)=>{
    try{
        const res = await db.query("DELETE FROM restraunts WHERE id = $1",[request.params.restraunt_id]);
        request.params.restraunt_id
    }catch(err){
        console.log(err);
    }
});

app.get("/api/v1/get-reviews/:restraunt_id",async (request,response)=>{
    try{
        var results = await db.query(`select * from reviews where restraunt_id = ${request.params.restraunt_id}`)
        response.status(200).json({
            status : "success",
            data : {
                reviews : results.rows
            }
        })
    }catch(err){
        console.log(err);
    }
})

app.get("/api/v1/get-review/:review_id",async (request,response)=>{
    try{
        var results = await db.query(`select * from reviews where id = ${request.params.review_id}`)
        response.status(200).json({
            status : "success",
            data : {
                review : results.rows
            }
        })
    }catch(err){
        console.log(err);
    }
})

app.post("/api/v1/:restraunt_id/addReview",async (request,response)=>{
    try{
        // console.log(request.body)
        const results = await db.query("INSERT INTO reviews (restraunt_id,name,review,rating) VALUES ($1,$2,$3,$4)",[request.params.restraunt_id, request.body.name, request.body.review,request.body.rating]);
        const last_rec = await db.query("SELECT * FROM reviews WHERE id = (SELECT max(id) FROM reviews)");
        response.status(200).json({
            status : "success",
            data : {
                reviews : last_rec.rows 
            }
        })
    }catch(err){
        console.log(err);
    }
});

//middlewares
app.use((request,response,next,err)=>{
    console.log(err);
})

const PORT_NUM = process.env.PORT_NUM;
app.listen(PORT_NUM,()=>console.log("server running on port",PORT_NUM));