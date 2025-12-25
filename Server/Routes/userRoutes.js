const express=require('express')
const userRouter=express.Router()
// const path=require('path')
const { login, register,fetchUsers,book, bookingStatus,fetchBookings} = require("../Controls/userControl");
const verifytoken = require('../Auth/authentication');

userRouter.post("/login",login)
userRouter.post("/register",register)
userRouter.get("/fetchUsers",fetchUsers)
userRouter.post("/book",book)
userRouter.get('/bookings/:userId', verifytoken, bookingStatus);
userRouter.get('/fetchBookings', fetchBookings);
// userRouter.post('/myevent',myevent)





module.exports = userRouter;