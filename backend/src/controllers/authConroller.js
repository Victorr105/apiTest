import User from "../models/userModel.js";
import bcrypt from "bcrypt";

async function register(req,res) {
    try {
        // we first what data we will be using to register a user
        const{name,email,password}=req.body;
        // check if a user already exists 
        const existingUser= await User.findOne({email});
        //logic for that 
        if (existingUser){
            return res.status(400).json({message:'User already exists'})
        }

        // hash the password before saving it 
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser=await User.create({
            name,email,password:hashedPassword,pfp:null
        })

        //Retun a  response
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

async function login(req,res){
    try {
        const {email,password}=req.body
        ///check whether a user exists
        const existingUser=await User.findOne({email})
        
        if(!existingUser){
            return res.status(404).json({message:"Invalid Credentials"})
        }
        // check or compare the passwords match
        
        const comparePassword=await bcrypt.compare(password,existingUser.password)
        if (!comparePassword){
            return res.status(401).json({message:"Invalid Credentials"})
        }
        
        res.status(200).json(existingUser);

    } catch (error) {
       res.status(500).json({error:error.message}) 
    }
}



export {register, login }
