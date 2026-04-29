import { User } from "../model/user.model.js";

const registerUser = async(req, res) =>{
    try {
      const {username , email, password} = req.body;

      //basic validation

      if(!username || !password || !email){
       // console.log("username, password and email are all required.");
        return res.status(400).json({message :"username, password and email are all required." });
      }

      // check if user exist

      const existing = await User.findOne({email: email.toLowerCase()});

    if(existing){
        return res.status(400).json({message: "User already exists."});
    }
       // create user  
    const user = await User.create({username, email: email.toLowerCase(), password, loggedIn: false,});
    res.status(200).json({message: "User registered" , user: { id:user._id , email: user.email, username: user.username}});

    } catch (error) {
        return res.status(500).json({message:"internal server failure"});
    }
    
} 