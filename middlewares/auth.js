const {getUserId} = require('../service/auth');

async function restrictToLoggedInUser(req,res,next){
    const userUid = req.cookies?.uid;
    if(!userUid) return res.redirect("/login");

    const user = getUserId(userUid);

    if(!user) return res.redirect("/login");

    req.user = user;
    next();

}

module.exports = {
    restrictToLoggedInUser
}