const express = require("express");
const app = express();
const users = require("../Models/Users");
const bcrypt = require("bcryptjs");
const nodemailer=require("nodemailer");
const jwt=require("jsonwebtoken")
const keysecret = process.env.SECRET_KEY
//emailconfig
const transporter=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL,
    pass:process.env.PASSWORD
  }
})


const addUsers = async (req, res) => {
  const {fname,email,password,cpassword}=req.body
      if(!fname || !email || !password || !cpassword){
        res.status(422).json({error:"fill all the fields"})
      }
    try{
      const preuser=await users.findOne({email:email})
      if(preuser){
        res.status(422).json({error:"This Email is  already exists"})
      }
      else if(password !== cpassword){
        res.status(422).json({error:"password and confirm password does not matches"})
      }else{
        const finalUser=new users({
          fname,email,password,cpassword
        })
        const storeData=await finalUser.save();
        console.log(storeData)
        res.status(201).json({status:201,storeData})

      }
    }catch(err){
        res.status(422).json(err);
        console.log(err);
    }
    
  };

const loginUser= async (req, res) => {
    // console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await users.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();
                 console.log(token)
                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }
};
const validUser=async(req,res)=>{
  try {
      const ValidUserOne = await users.findOne({_id:req.userId});
      res.status(201).json({status:201,ValidUserOne});
  } catch (error) {
      res.status(401).json({status:401,error});
  }
};
const logoutUser=async(req,res)=>{
  try {
      req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
          return curelem.token !== req.token
      });

      res.clearCookie("usercookie",{path:"/"});

      req.rootUser.save();

      res.status(201).json({status:201})

  } catch (error) {
      res.status(401).json({status:401,error})
  }
}
const sendemaillink=async(req,res)=>{

 const {emailaddress}=req.body;
 if(!emailaddress){
  res.status(401).json({status:401,message:"Enter your email"})
 }

  try{
    const userfind=await users.findOne({email:emailaddress})
    if (!userfind) {
      return res.status(401).json({ status: 401, message: "User not found" });
  }
    const token = jwt.sign({_id:userfind._id},keysecret,{
      expiresIn:"1d"
  });
  const setusertoken = await users.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});
  if(setusertoken){
    const mailOptions = {
        from:process.env.EMAIL,
        to:emailaddress,
        subject:"Sending Email For password Reset",
        text:`This Link Valid For 2 MINUTES http://localhost:5173/NewPassword/${userfind.id}/${setusertoken.verifytoken}`
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log("error",error);
            res.status(401).json({status:401,message:"email not send"})
        }else{
            console.log("Email sent",info.response);
            res.status(201).json({status:201,message:"Email sent Successfully"})
        }
    })

}

}
 
  catch(err){
    console.error("Catch block error:", err);
    res.status(401).json({status:401,message:"invalid user"})
  }
}
// verify user for forgot password time

const verifyForgot=async(req,res)=>{
  const {id,token}=req.params;
  try{
    const validuser= await users.findOne({_id:id,verifytoken:token})
    const verifyToken=jwt.verify(token,keysecret)
    if(validuser && verifyToken._id){
         res.status(201).json({status:201,validuser})
    }else{
      res.status(401).json({status:401,message:"user not exist"})
    }
  }catch(err){
    res.status(401).json({status:401,message:err})
  }
}
const changePassword=async(req,res)=>{
  const {id,token} = req.params;

  const {passwords} = req.body;

  try {
      const validuser = await users.findOne({_id:id,verifytoken:token});
      if (!validUser) {
        return res.status(401).json({ status: 401, message: "User does not exist" });
    }
      const verifyToken = jwt.verify(token,keysecret);

      if(validuser && verifyToken._id){
          const newpassword = await bcrypt.hash(passwords,12);

          const setnewuserpass = await users.findByIdAndUpdate({_id:id},{password:newpassword});

          setnewuserpass.save();
          res.status(201).json({status:201,setnewuserpass})

      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }
  } catch (error) {
      res.status(401).json({status:401,error})
  }
}
  module.exports ={ changePassword,addUsers,loginUser,sendemaillink,validUser,verifyForgot,logoutUser};