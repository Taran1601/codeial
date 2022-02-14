const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    //how to detect a user(unique)
usernameField:'email'
},
function(email,password,done){
//find a user and establish the identity
User.findOne({email:email},function(err,user){
if(err){
    console.log('error in finding user--->Passport');
    return done(err);
}
if(!user || user.password!=password){
    console.log('Invalid username/Password');
    return done(null,false);
}
return done(null,user);
});

}
));


////serailizing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
done(null,user.id);
});


//deserializing the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user from passport');
            return done(err);
        }
        return done(null.user);
    });
});
module.exports=passport;
                 