const mongoose=require('mongoose')

const restaurantSchema=mongoose.Schema({
    restaurantName:String,
    email:String,
    contact:{
        type:Number,
        minlength:10,
        maxlength:12,
        message:'contact must be 10 numbers'
    },
    address:{
        type:String
    },
    timing:[],
    menuImage:[],
    foodImage:[],
    restaurantImage:[],
    ownerName:String,
    deleteFlag:{
        type:Boolean,
        default:'false'
    },
    restaurantId:String,
})

const foodImageSchema=mongoose.Schema({
    foodImage:String,
    deleteFlag:{
        type:Boolean,
        default:'false'
    },
    restaurantId:String,
})

const menuImageSchema=mongoose.Schema({
    menuImage:String,
    deleteFlag:{
        type:Boolean,
        default:'false'
    },
    restaurantId:String,
})
const restaurant=mongoose.model('restaurantSchema',restaurantSchema)
const foodImage=mongoose.model('restaurantSchema',foodImageSchema)
const menuImage=mongoose.model('restaurantSchema',menuImageSchema)

module.exports={
    restaurant,
    foodImage,
    menuImage
}
