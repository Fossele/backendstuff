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
    res.status(201).json({message: "User registered" , user: { id:user._id , email: user.email, username: user.username}});

    } catch (error) {
        return res.status(500).json({message:"internal server failure"});
    }
} 

const loginUser = async(req, res)=>{
    try {
    //check if user exist
    const {email , password} = req.body;
    const user = await  User.findOne({email: email.toLowerCase()});
    if(!user){
        return res.status(400).json({message: 'user not found in our system.'})
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(400).json({message: 'Invalid password'});

    return res.status(200).json({message: "User logged In", user:{id: user._id, email: user.email, username: user.username}});
     
    } catch (error){
        res.status(500).json({message:"Internal server error"});
    }
    
    
}

export {
    registerUser, loginUser
}
