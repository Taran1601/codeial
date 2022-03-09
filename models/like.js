const mongoose=require('mongoose');
const LikeSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,

    },
    //this defines the objid of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
required:true,
//dynamic reference(going to place a path to some other field)
refPath:'onModel'
    },
    //this field is used for defining the type of the liked object since this is a dynamic reference
    onModel:{
type:String,
required:true,
enum:['Post','Comment']
    }
},{
    timestamps:true
});
const Like=mongoose.model('Like',LikeSchema);
module.exports=Like;