export const auth = function(req, res, next){
    if(req.session.email){
        console.log("email id found:",req.session.email);
        next();
    } else {
        console.log(" email id not found");
        res.redirect('/login');
    }
}