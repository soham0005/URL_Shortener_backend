const mongoose =  require("mongoose");

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
            type:String,
            required:true,
            unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    }
},{timestamps:true});

const User = mongoose.model('userdetails',userSchema);

module.exports = User