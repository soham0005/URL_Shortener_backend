const shortid = require('shortid');
const URL = require('../models/urls');

const generateNewShortURL = async(req,res) =>{
    const body = req.body;
    console.log(body.url);
    if(!body.url){
        return res.status(400).json({"status":"URL is Required"});
    }
    const urlShortId = shortid();
    await URL.create({
        shortId: urlShortId,
        originalUrl: body.url,
        history: []
    });

    // res.render('home',{
    //   id:urlShortId,  
    // })

    res.render('table',{
        id:urlShortId
    });

    // return res.json({id:urlShortId,});
}


module.exports = {
    generateNewShortURL,

}