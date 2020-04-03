var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();
const rooute = require("./route/routes");
// mongoose.connect('mongodb://techspawnassessdb:password123@ds363098.mlab.com:63098/techspawndbatmlab',{
//     useNewUrlParser: true
// }, function(error){
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log("connected to mlab")
//     }
// });

mongoose.connect('mongodb://localhost:27017/techSpawnDb');

mongoose.connection.on('connected', ()=>{
    console.log("Connected to mongodb");
});

mongoose.connection.on('error', (err)=>{
    console.log(err);
})

const port = 3000;

app.use(cors());

app.use(bodyparser.json());

app.use('/api', rooute)


app.get('/', (req,res)=>{
    res.send("get mothod response")
})



app.listen(port, ()=>{
    console.log("Backend server has been started at 3000");
})