const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true

    },
    avatar:{
        //file path get stored over here
        type:String,

    }
},{
    timestamps:true
});

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename:function(req,file,cb){
        //fieldname is the avatar
        cb(null,file.fieldname+'-'+Date.now());
    }
});
//static methods
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
//to access avatar's path publically to the user(AVATAR_PATH)
userSchema.statics.avatarPath=AVATAR_PATH;
const User=mongoose.model('User',userSchema);
module.exports=User;