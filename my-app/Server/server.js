const express = require("express");
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
// const cors = require('cors');
const dotenv=require('dotenv');
dotenv.config();
const bcrypt=require("bcrypt")
const app = express();
const dbName = 'Blockchain';
const nodemailer=require('nodemailer')
app.use(express.json());
app.use(express.urlencoded());
// app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.setHeader('Access-Control-Allow-Origin', 'http://192.168.194.213:3000');
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

const MongoSchema = new mongoose.Schema({
  Name: String,
  Role: String,
  ID: [
    { id: Number },
    { parent: Number },
  ],
  Password: String,
  Account:String
});
// var mongoose = require('mongoose');
mongoose.connect(process.env.dbUrl, { useNewUrlParser: true })
.then((client) => {
  const db=mongoose.connection;
    app.listen(https://blockchainscm.onrender.com, function () {
      console.log('Listening on port 4000');
    });
    app.get("/Login",async(req,res)=>{
      let x=req.query.param1;
      let z=req.query.param2;
      const salt=await bcrypt.genSalt();
      y=await bcrypt.hash(z,salt);
      console.log(req.query,y)
      await db.collection('Register').findOne({Id:x})
      .then(result=>{
        bcrypt.compare(req.query.param2, result.Password, function(err, result1) {  // Compare
          // if passwords match
          if (result1) {
               res.json(result)
          }
          // if passwords do not match
          else {
            res.json("Invalid Password");
          }
        });
      })
      .catch((err)=>{res.json("Invalid User Id")});
    })
    app.get("/Details",async(req,res)=>{
      let x=req.query.param1+"";
      console.log(x);
      await db.collection('Register').find({Role:x}).toArray()
      .then(result=>{
        console.log(result[0])
               res.json(result)
        });
      })   
      app.post('/Register', async (req, res) => {
        console.log(req.body);
        const salt=await bcrypt.genSalt();
        req.body.Password=await bcrypt.hash(req.body.Password,salt);
        await db.collection('Register').insertOne(req.body)
          .then(async(result) => {
            const  data={
              "from":"saikiranchowdary474@gmail.com",
              "to":result.Email,
              "subject":"Successfully Registered",
              "text":"hey"+result.Name+"Your Account has been Successfully Registerd \n Now u con enjoy by using our application"
            }
            const transporter= nodemailer.createTransport(process.env.config);
            await transporter.sendMail(data,(err,info)=>{
              if(err){
                console.log(err);
              }
              else{
                console.log(info.response);
              }
            })
            console.log(result);
            res.json(result);
          })
          .catch(err => {console.log(err);
            res.json(err);
      });
    });
    app.get("/sendotp",async(req,res)=>{
      var val = Math.floor(1000 + Math.random() * 9000);
      console.log(val,req.query.params);
      const  data={
        "from":"saikiranchowdary474@gmail.com",
        "to":req.query.params,
        "subject":"OTP Verification",

        "text":"hey"+"Your OTP is \n"+val
      }
      const transporter= nodemailer.createTransport(process.env.config);
      await transporter.sendMail(data,(err,info)=>{
        console.log(err!==null)
        if(err!==null){
          
          console.log(err);
        }
        else{
          console.log("mailsent");
          res.json(val)
        }
      })
    })
    app.post("/UpdatePassword",async(req,res)=>{
      await db.collection('Register').findOneAndUpdate({Email:req.query.param1},{$set:{Password:req.query.param2}})
      .then(result => {
       
        res.json(result);
      })
      .catch(err => {
        res.json(err);
      });
    })
    app.post("/TransactionHistory",async(req,res)=>{
      await db.collection('Transactions').insertOne(req.body)
      .then(result => {
        console.log(result);
        res.json(result);
      })
      .catch(err => {console.log(err);
        res.json(err);
      });
    })
    app.get("/TransactionsHistory",async(req,res)=>{
      x=req.query.param1;
      await db.collection('Transactions').find({userId:x}).toArray()
      .then(result=>{
          res.json(result)
        });
    })
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
  });
  // $2b$10$fr3K5hP78zTD2IE3V71peOyXxmvksXOPv5IrPAw8x5yGtXRFwdAXa
  // $2b$10$NH/KeO3vKqPwlOOnk6GJCO5VoFspRzn8yV9jVMAmJsfU8DT8N3ymy
