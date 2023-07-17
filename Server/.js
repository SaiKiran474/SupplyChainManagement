// const Express=require('express')
// const mongoose=require("mongoose")
// const app=Express();
// const MongoClient = require('mongodb').MongoClient
// const MongoSchema=new mongoose.Schema({
//   Nmae:String,
//   ID:[
//       {id:Number},
//       {parent:Number},
//   ],
//   })
// MongoClient.connect('mongodb://127.0.0.1:27017', {useUnifiedTopology: true})
//   .then(client => {
//         app.listen(5000,()=>{
//             console.log("connected to local host");
//         })
//         app.get("/",(req,res)=>{res.sendFile(__dirname+"/Register.html")})
//         const db = client.db('blockchain')
//     app.post('/Register',(req,res)=>{
//         console.log(req.body)
//         db.collection('Register').insertOne(req.body)
//         .then(result=>{
//             console.log(result)
//         })
//         .catch(err=>console.log(err))
//         res.redirect('/')
//     })
// })
// <!DOCTYPE html>
{/* <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BOOOK EASY</title>
</head>
<body>
    <form action="/Register" method="POST">
        <p> Name:
            <input type="text" placeholder="name" name="name" >
        </p>
        <p> ID:
            <input type="number" placeholder="child" name="Ticket[0]">
            <input type="number" placeholder="parent" name=Ticket[1]>
        </p>
        <button type="submit">Register</button>
    </form>
</body>
</html> */}