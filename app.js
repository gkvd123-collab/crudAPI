const express=require('express');

const db=require('./config/database')
const userRouter=require('./api/users/user.router')

const app=express();
app.use(express.json())

// const port=process.env || 3000;
db.connect(err=>{
    if(err){
        console.log(err,'err');
    }
    else{
        console.log('connected');
    }
})

//define route
// app.use(db)
app.use("/api/users",userRouter)
// app.use("/api/user",userRouter)

app.listen(3000,()=>{
    console.log("server is running at");
})


