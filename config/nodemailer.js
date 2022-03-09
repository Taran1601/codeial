const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
//transpoerter(the person) is an object which will be assigned to the nodemailer
let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
user:'taranpreet4554@gmail.com',
password:'Taran@1601'
    }
});
//define ejs template
let renderTemplate=(data,relativePath)=>{
let mailHTML;
ejs.renderFile(
    //from where to render the html ejs mailer templates
    path.join(__dirname,'../views/mailers',relativePath),
    data,
    function(err,template){
        if(err){
            console.log('error in rendering template',err);
        }
        mailHTML=template;
    }
)
return mailHTML;
}
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}