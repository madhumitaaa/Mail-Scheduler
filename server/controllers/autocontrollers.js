const User=require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Email = require('../models/Emails.js');
const loginUser=async(req,res)=>{
    const {email,password}=req.body;

try{
    const user=await User.findOne({email});
    if(!user) return res.status(401).json({message:'user not found'});
    
   const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });
const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{
    expiresIn:'1d',
})
res.status(200).json({token,message:'Login Successful'});
}
catch(err){
     res.status(500).json({ message: 'Something went wrong' });
    }
}


const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
     if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

try{
    const existing=await User.findOne({email});
    if(existing) return res.status(400).json({message:'user already exists'});
    
     const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword  });
    await newUser.save();
       const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',});

res.status(201).json({token,message:'User registered Successfully'});
}
catch(err){
     res.status(500).json({ message: 'Something went wrong' });
    }
}



const scheduleEmail = async (req, res) => {
  try {
    const { to, subject, message, scheduledTime } = req.body;

    const newEmail = new Email({ to, subject, message, scheduledTime });
    await newEmail.save();

    res.status(200).json({ message: "Email scheduled successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to schedule email" });
  }
};



const getEmailLogs = async (req, res) => {
  try {
    const emails = await Email.find().sort({ scheduledTime: -1 }); // Sorted by latest
    res.status(200).json(emails);
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};







module.exports={loginUser, registerUser,scheduleEmail, getEmailLogs};