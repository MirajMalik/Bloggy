const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/bloggy");

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    posts: [{                                                      // array of id's
        type: mongoose.Schema.Types.ObjectId,
        ref : "post"
    }],
    profilepic: {
        type: String,
        default: "default.png",
    }
})

const userModel = mongoose.model("user",userSchema);


module.exports = userModel;