const express= require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//using static files
app.use(express.static('./assets'));

//using express layouts
app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
//use express router
app.use('/',require('./routes'));
//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(err){
if(err){
    console.log(`Error in running the server : ${err}`);
}
console.log(`Server in running on port : ${port}`);
});