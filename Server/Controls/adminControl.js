
const userModel=require('../Models/userModels')
const jwt = require('jsonwebtoken');
const bookModel = require('../Models/bookModel');
const eventModel = require('../Models/eventModel');


const fetchUsers=async(req,res)=>{

    try{
        const users=await userModel.find({})
        res.json(users)
    }catch(err){
        console.log(err)
    }
}


const fetchCoordinators=async(req,res)=>{
    try {
    const coordinators = await userModel.find({ role: "coordinator" });
    res.json(coordinators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const fetchEvents=async(req,res)=>{
  try{
    const event = await eventModel.find({})
    res.json(event)
    }catch(err){
        console.log(err)
  }
}









const deleteUser = async (req, res) => {
  try {
    const userid = req.params.id;

    // Delete user by ID
    await userModel.findByIdAndDelete(userid);

    // Delete all bookings where userId matches userid
    await bookModel.deleteMany({ userId: userid });

    res.json("User Deleted Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error deleting user");
  }
};




const deleteCoordinator = async (req, res) => {
  try {
    const coordinatorId = req.params.id;
    await userModel.deleteOne({ _id: coordinatorId });
    res.json("Coordinator deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error deleting coordinator");
  }
};









const login=async(req,res)=>{
    try{
  const {email,password}=req.body;
  if(email=="admin@gmail.com" && password=="admin123"){
const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, { expiresIn: '1d' });

   res.json({msg:"Admin  Login Successfull",status:200,token})
  }else{
    res.json({msg:"Admin  Login Failed"})
  }
    }catch(err){
        console.log(err)
    }
}




const register = async (req, res) => {
  try {
      console.log(req.body)
      const { fullname, email, password, phone } = req.body

      const user = new userModel({
          fullname,
          email,
          password,
          phone
      })

      await user.save()
      res.status(200).json("Data entered successfully")
  } catch (err) {
      console.log(err)
      res.status(500).json("Something went wrong")
  }
}





// Get all bookings (with user and event info)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookModel.find().populate('userId').populate('eventId'); // or similar
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};





module.exports={login,register,fetchUsers,getAllBookings,fetchCoordinators,fetchEvents,deleteUser,deleteCoordinator}