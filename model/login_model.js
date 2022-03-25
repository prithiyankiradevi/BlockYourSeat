const mongoose=require('mongoose')

const login=mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    contact:{
        type:Number,
        minlength:1,
        maxlength:50,
        required:[true,'contact is required']
    },
    deleteFlag:{
        type:Boolean,
        default:'false'
    }
})

const loginSchema=mongoose.model('loginSchema',login)


module.exports={
    loginSchema
}


