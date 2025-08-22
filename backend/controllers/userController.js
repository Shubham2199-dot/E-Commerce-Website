import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import userModel from '../models/userModel.js';



const createToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET)
}


//route for user login
const loginUser = async (req, res) => {

try {
  const {email, password} = req.body;

  const user = await userModel.findOne({email});

  if (!user) {
      return res.json({success:false, message: "user doesn't exists"})
  }


  const isMatched = await bcrypt.compare(password,user.password)
  if (isMatched) {

    const token = createToken(user._id)
      return res.json({success:true,token})
  }

  else{
    res.json({success:false, message:"Invalid credentials"})
  }
} catch (error) {
 res.json({success:false, message: error.message})
}}

//route for user new user
const registerUser = async (req, res) => {
try {
  const {name, email, password} = req.body;

   //check user already exist ot not

   const exists = await userModel.findOne({email})

   if (exists) {
      return res.json({success:false, message: "user already exists"})
   }

   //validating email format and strong password
   if (!validator.isEmail(email)) {
          return res.json({success:false, message: "invalid email"})
   }
     if (password.length < 8) {
          return res.json({success:false, message: "please enter strong password"})
   }
    // hashing user password

    const salt = await bcrypt.genSalt(10) 
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    })
          
      const token = createToken(user._id)  
      
      res.json({success:true, token})

} catch (error) {
  res.json({success:false, message: error.message})


}
}
//route for admin login
const adminLogin = async (req, res) => {
try {
   const {email, password} = req.body;

   if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
       const token = jwt.sign(email+password,process.env.JWT_SECRET)
       console.log(token)
       res.json({success:true, token})
   }else{
    res.json({success:false, message:'Invalid credentials'})
   }
} catch (error) {
   res.json({success:false, message: error.message})
}
}



export {loginUser, registerUser, adminLogin}