const express=require('express')
const app=express()
const mongoose=require('mongoose')
require('dotenv').config();
const port=3000;


//connect to db
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}).then(()=>{
    console.log('connected to db')
}).catch((error)=>console.log(error))

//import routes
const authRoute=require('./routes/auth');
const postRoute=require('./routes/post')

//json middleware
app.use(express.json());
//route middleware
app.use('/api/user', authRoute)
app.use('/api/post', postRoute)


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})