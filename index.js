const express =require('express');
const urlRoute = require('./routes/urlRouter');
const {ConnectToDB} = require('./connection');
const cookieParser = require('cookie-parser');
const path = require('path');

const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/userAuthenticationRoutes');
const {restrictToLoggedInUser} = require('./middlewares/auth');

const URL = require('./models/urls');
const app = express();
const port =  8000;

ConnectToDB('mongodb://127.0.0.1:27017/URLShortner')
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch(()=>{
    console.log("Failed to Connect with MongoDB");
})
app.set("view engine","ejs");
app.set("views",path.resolve('./views'));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));


app.use('/url',restrictToLoggedInUser,urlRoute);
app.use('/',staticRouter);
app.use('/user',userRoute);

app.get('/url/:shortid',async (req,res)=>{
    const shortId = req.params.shortid;
    const data = await URL.findOneAndUpdate({
        shortId : shortId,
    },{
        $push :{
            history:{
                timestamp : Date.now(),
            }, 
        }
    })
    res.redirect(data.originalUrl);

})

app.get('/history/:id',async (req,res)=>{
    const data = await URL.findOne({
        shortId:req.params.id
    })
    res.status(200).json({
        "Original Url":data.originalUrl,
        "Total Clicks":data.history.length,
        "details of Clicks": data.history
    })
})

app.get('/details',async (req,res)=>{
    const allDetails = await URL.find({});
    // console.log(allDetails);
    return res.render("home",{
        details:allDetails
    });
})


app.listen(port,()=>{
    console.log("Server Running on Port: ",port);
})