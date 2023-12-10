const User = require("../model/userModel");
const bcrypt = require("bcrypt");
module.exports.register=async (req,res,next)=>
{
   try{
    const {username,email,password}=req.body;
    const usernameCheck = await User.findOne({username});
    if(usernameCheck)
        return req.json({msg:"Username already Exists!",status:false});
    const emalCheck = await User.findOne({email});
    if(emalCheck)
        return req.json({msg:"Email already Exists!",status:false});
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create(
        {
            email,
            username,
            password:hashedPassword
        }
    );
    delete user.pasword;
    return res.json({status:true,user});
   }
   catch(ex)
   {
    next(ex)
   }
};