const mongoose = require('mongoose')
const UserProfile = require('./UserProfile')
const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    userStatus:{
        status:{
            type:String,
            enum:["Pending","Active"],
            default:"Pending"
        }
    },
    roles:{
        User:{
            type:Number,
            default:2001
        },
        Editor:Number,
        Admin:Number
    },
    password:String,
    googleid:String
})

userSchema.post('save',async function(doc){
    console.log('user this',this);
   await UserProfile.create({
    user:this._id
   })
})

module.exports = mongoose.model('User',userSchema)
