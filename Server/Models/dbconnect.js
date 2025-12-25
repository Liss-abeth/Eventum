const mongoose=require('mongoose')

const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT)
        console.log("Mongodb connected successfully")
    }catch(err){
        console.log("Mongodb connection failed")
        console.log(err)
    }
}

module.exports=dbConnect