const express=require('express')
const adminRouter=express.Router()
// const path=require('path')
const { login, register,fetchUsers,getAllBookings,fetchCoordinators,fetchEvents, deleteUser,deleteCoordinator} = require('../Controls/adminControl');

adminRouter.post("/login",login)
adminRouter.post("/register",register)
adminRouter.get("/fetchUsers",fetchUsers)
adminRouter.get("/fetchCoordinator",fetchCoordinators)
adminRouter.get("/fetchEvents",fetchEvents)
adminRouter.get('/bookings', getAllBookings);
adminRouter.delete('/admindeleteuser/:id',deleteUser)
adminRouter.delete('/deleteCoordinator/:id',deleteCoordinator)

module.exports = adminRouter;