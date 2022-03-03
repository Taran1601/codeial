const Post=require('../models/post');
const User=require('../models/user');
module.exports.home= async function(req,res){
    // console.log(req.cookies);
    // res.cookies('user_id',25);
//   Post.find({},function(err,posts){
//     return res.render('home',{
//         title: " Codeial | Home",
//         posts:posts
//   });
//     });
try{
 //populate the user of each post
 let posts= await Post.find({})
 .populate('user')
 .populate({
     path:'comments',
     populate:{
         path:'user'
     }
 });
 // // .exec(function(err,posts){
 // //     User.find({},function(err,users){
 // //         return res.render('home',{
 // //             title: " Codeial | Home",
 // //             posts:posts,
 // //          all_users:users
 // //       });
 // //     });
   
 // });
 let users=await User.find({});
  return res.render('home',{
title: " Codeial | Home",
   posts:posts,
    all_users:users
           });
         
}
catch(err){
console.log('Error',err);
}
} 
//module.exports.actionName=function(req,res){}
//using then
//  let posts=Post.find({}).populate('comments').then(function());
// let posts=Post.find({}).populate('comments').exec();
// posts.then()