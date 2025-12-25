const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin', 'coordinator'], 
        default: 'user'
    }
}, { timestamps: true });

const userModel = mongoose.model('user_tb1', userSchema);
module.exports = userModel;
