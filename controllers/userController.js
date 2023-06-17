const { render } = require('ejs');
const {v4:uuid4} = require('uuid')
const User = require('../models/userSchema');
const {setUser} = require("../service/auth")

const createNewUser = async (req,res) =>{
    const {email,name,password} = req.body;
    await User.create({
        name,
        email,
        password
    })
    res.render('/')
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    console.log(user);
    if(!user) return res.render('login',{
        error:"Invalid Username or Password"
    })
    const sessionId = uuid4();
    setUser(sessionId,user);
    res.cookie('uid',sessionId);
    return res.redirect('/');

}


module.exports = {
    createNewUser,loginUser
}