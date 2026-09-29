const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const SECRET_key = "rdfgjhkjvj"


exports.googleLogin = async (req, res) => {
    try {
        const user = req.user;
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

        if (!user) {
            return res.redirect(`${clientUrl}/login?error=Google authentication failed`);
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET || SECRET_key,
            {
                expiresIn: '1d'
            }
        );

        return res.redirect(
            `${clientUrl}/auth/callback?token=${token}&id=${user._id}&name=${encodeURIComponent(user.name || '')}&email=${encodeURIComponent(user.email || '')}`
        );

    } catch (error) {
        console.error('Google login error:', error);
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
        return res.redirect(`${clientUrl}/login?error=${encodeURIComponent(error.message || 'Google login failed')}`);
    }
};







exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'please provide all required fields' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'user already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'user registered successfully', newUser })

    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).json({ message: 'internal server error' })

    }
}



exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'please provide all required fields' })
        }

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({ message: "Please first signup before login" })
        }
        if (!existingUser.password) {
            return res.status(400).json({ message: "This account was created with Google OAuth. Please sign in with Google." })
        }
        const ispassword = await bcrypt.compare(password, existingUser.password)
        if (!ispassword) {
            return res.status(400).json({ message: "invalid email and password" })
        }

        const token = jwt.sign({ email: existingUser.email }, SECRET_key, { expiresIn: '1d' })

        return res.status(200).json({
            message: "Login successful",
            token
        })
    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}


exports.allUser=async(req,res)=>{
    try{
        const alluser=await User.find()
        if(!alluser){
            return res.status(400).json({message:"Do not find all user"})
        }
        return res.status(200).json(alluser)
    }
    catch(err){
        return res.status(500).json({message:"internal server error"})
    }
}


exports.oneUser=async(req,res)=>{
    try{
        const {id}=req.params
        console.log(id)
        const oneuser=await User.findById(id)
        console.log(oneuser)
        if(!oneuser){
            return res.status(400).json({message:"not find user"})
        }
        return res.status(200).json(oneuser)
    }
    catch(err){
        return res.status(500).json({message:"internal server error"})
    }
}


exports.updateUser=async(req,res)=>{
    try {
        const {id}=req.params
        const data=req.body
        console.log(id,data)
        const updatedata=await User.findByIdAndUpdate(id,data)
        if(!updatedata){
            return res.status(400).json({message:"data not updated"})
        }
        return res.status(200).json({message:"update successfully",update:updatedata})
    } catch (error) {
        
    }
}



exports.deleteUser=async(req,res)=>{
    try{
        const {id}=req.params
        const deleteuser=await User.findByIdAndDelete(id)
        if(!deleteuser){
            return res.status(400).json({message:"user id is not provided"})
        }
        res.status(200).json({message:"user delete successfully"})
    }
    catch(err){
        return res.status(500).json({message:"internal server error"})
    }
}