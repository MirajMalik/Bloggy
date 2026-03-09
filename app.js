const express = require("express");
const app = express();

const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require("cookie-parser");
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));



app.get('/', (req,res) => {
    res.render("index");
});

app.get('/login', (req,res) => {
    res.render("login");
});

app.get('/profile', isLoggedIn, async (req,res) => {
    let user = await userModel.findOne({email: req.user.email}).populate("posts");            // will get the user based on the email
    console.log(user);
    res.render("profile", {user: user});
});

app.get('/logout', (req,res) => {
    res.cookie("token","");
    res.redirect("/login");
});



app.post('/register', async (req,res) => {
    const {username,name,age,email,password} = req.body;

    let user = await userModel.findOne({email});

    if(user) {
        return res.status(500).send("User Already Registered");
    }

    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(password,salt, async (err,hash) => {
            let user = await userModel.create({
                username,
                name,
                age,
                email,
                password: hash,
            });

            let token = jwt.sign({email: email, userid: user._id}, "SecretKey");
            res.cookie("token",token);
            res.send("registered");
        })
    })
    
   

   


    
});

app.post('/login', async (req,res) => {
    const {email,password} = req.body;

    let user = await userModel.findOne({email});

    if(!user) {
        return res.status(500).send("Something went wrong");
    }

    bcrypt.compare(password, user.password, (err,result) => {         // compare(newpass,oldpass)
        if(result){
            let token = jwt.sign({email: email, userid: user._id}, "SecretKey");
            res.cookie("token",token);
            res.status(200).redirect("/profile");
        }
        else{
            res.redirect("/login");
        }
    });
      
});

app.post('/post', isLoggedIn, async (req,res) => {
    let user = await userModel.findOne({email: req.user.email});            // will get the user based on the email

    let post = await postModel.create({
        user: user._id,
        content: req.body.content,
    });

    user.posts.push(post._id);                                              // put the post in the user posts array
    await user.save();
    res.redirect("/profile");
});



function isLoggedIn(req,res,next) {
    if(req.cookies.token === "") res.redirect("/login");
    else {
        let data = jwt.verify(req.cookies.token , "SecretKey" );            //data will containe email and id as already used in jwt.sign
        req.user = data;
        next();
    }
    
}



app.listen(3000);