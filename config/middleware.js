module.exports.setFlash=function(req,res,next){
    res.locals.flash={
        //middleware for the messages from the controller
'success':req.flash('success'),
'error':req.flash('error')
    }
    next();
}