const express= require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

//using static files
app.use(express.static('./assets'));

//using express layouts
app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name:'Codeial',
    //todo-change the secect before deployement in production mode
    secret: 'blahhsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge : (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
if(err){
    console.log(`Error in running the server : ${err}`);
}
console.log(`Server in running on port : ${port}`);
});