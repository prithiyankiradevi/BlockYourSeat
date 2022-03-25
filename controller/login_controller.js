const loginModel=require('../model/login_model')
const bcrypt=require('bcrypt')
const fast2sms = require('fast-two-sms')
const jwt=require('jsonwebtoken')

async function smsSend(options){
    const response = await fast2sms.sendMessage(options)
    console.log(response)
}

const register=async(req,res)=>{
    try{
        const data=await loginModel.loginSchema.aggregate([{$match:{contact:req.body.contact}}])
        if(data.length==0){
            req.body.password=await bcrypt.hash(req.body.password,10)
            loginModel.loginSchema.create(req.body,(err,result)=>{
                if(err){
                    res.status(400).send({success:'false',message:'failed',data:[]})
                }else{
                    res.status(200).send({success:'true',message:'successfully created',data:result})
                }
            })
        }else{
            res.status(400).send({success:'false',message:'contact already exists,please try another',data:[]})
        }
    }catch(e){
        res.status(500).send({success:'false',message:'internal server error'})
    }
}

const login=async(req,res)=>{
    try{
        const data=await loginModel.loginSchema.aggregate([{$match:{contact:req.body.contact,deleteFlag:false}}])
        if(data){
            const password=await bcrypt.compare(req.body.password,data[0].password)
            if(password==true){
                const token=jwt.sign({name:data[0].name,userId:data[0]._id},'who are you')
                // const a= fast2sms.sendMessage({authorization : process.env.API_KEY , message : 'YOUR_MESSAGE_HERE' ,  numbers : [req.body.contact]})
                // // smsSend(options)
                // console.log(a)
                res.status(200).send({success:'true',message:'successfully login',data:data,token})
            }else{
            res.status(200).send({success:'false',message:'invalid password',data:[]})
            }
        }else{
            res.status(400).send({success:'false',message:'data not exists',data:[]})
        }
    }catch(e){
        console.log(e.message)
        res.status(500).send({success:'false',message:'internal server error'})
    }
}

const updateUserData=async(req,res)=>{
    try{
        if(req.body._id==null&& req.body._v==null){
            if (req.params.userId.length == 24){
                loginModel.loginSchema.findOneAndUpdate({_id:req.params.userId,deleteFlag:false},{$set:req.body},{new:true},(err,data)=>{
                    if(err){
                        res.status(400).send({success:'false',message:'data not found',data:[]})
                    }else{
                        const token=jwt.decode(req.headers.authorization)
                        if(token){
                            if(token.userId==data._id){
                                res.status(200).send({success:'true',message:'updated successfully',data})
                            }else{
                                res.status(200).send({success:'false',message:'invalid token'})
                            }
                        }else{
                            res.status(400).send({success:'false',message:'unauthorized'})
                        }
                    }
                })
            }else{
            res.status(200).send({success:'false', message: "please provide a valid id" });
            }
        }else{
            res.status(301).send({success:'false',message:'please avoid _id and_V'})
        }
    }catch(e){
        res.status(500).send({success:'false',message:'internal server error'})
    }   
}

const getPerUser=async(req,res)=>{
    try {
        if (req.params.userId.length == 24) {
          let response = await loginModel.loginSchema.find({_id:req.params.userId,deleteFlag:"false"});
          const data = response[0];
          if (data != null) {
            res.status(200).send({ success:'true',message:'fetch data successfully',data: data });
          } else {
            res.status(302).send({ success:'false',data: [] });
          }
        } else {
          res.status(200).send({ message: "please provide a valid id" });
        }
      } catch (e) {
        res.status(500).send("internal server error");
      }
}

const getAllUsers=async(req,res)=>{
    try {
        const token = await jwt.decode(req.headers.authorization);
        if (token != undefined) {
          const a = await loginModel.loginSchema.find({deleteFlag:'false'})
          if (a.length != 0) {
            a.sort().reverse()
            res.status(200).send({ success:'true',message:'fetch data successfully',data: a });
          } else {
            res.status(302).send({success:'false',message:'data not found', data: [] });
          }
        } else {
          res.status(400).send({success:'false',message:"UnAuthorized"});
        }
      } catch (e) {
          console.log(e.message)
        res.status(500).send({message:"internal server error"});
      }
}

const deleteUserData=async(req,res)=>{
        try {
          if (req.params.userId.length == 24) {
            loginModel.loginSchema.findByIdAndUpdate(
              req.params.userId,
              { deleteFlag: "true" },
              { returnOriginal: false },
              (err, data) => {
                if (err) {
                  throw err;
                } else {
                  if (data != null) {
                    res.status(200).send({success:'true', message: "data deleted successfully" });
                  } else {
                    res.status(400).send({success:'false', data: [] });
                  }
                }
              }
            );
          } else {
            res.status(200).send({success:'false', message: "please provide a valid id" });
          }
        } catch (e) {
          res.status(500).send({message:"internal server error"});
        }
}

module.exports={
    register,
    login,
    updateUserData,
    getPerUser,
    getAllUsers,
    deleteUserData
}