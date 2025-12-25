const express=require('express')
const cors=require('cors')
const app=express()
require('dotenv').config()
app.use(cors());
const dbConnect=require('./Models/dbconnect')
dbConnect()

app.use(express.json());
// app.use('/uploads', express.static('uploads'));

const adminRouter=require("./Routes/adminRoutes")
const userRouter=require('./Routes/userRoutes')
const eventRouter=require('./Routes/eventRoutes');
const contactRouter = require('./Routes/contactRoutes');
const reviewRouter = require('./Routes/reviewRoutes');

app.use("/api/user", userRouter)
app.use("/api/admin",adminRouter)
app.use('/api/coordinator', eventRouter);
app.use('/reviews',reviewRouter)
app.use('/uploads', express.static('uploads'));
app.use('/contact',contactRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server running successfully @ ${process.env.PORT}`)
})