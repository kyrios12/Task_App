import User from '../models/Auth.js';
import bcrypt from 'bcryptjs';
import { LocalStorage } from 'node-localstorage';
import jwt from 'jsonwebtoken';

const localstorage = new LocalStorage('./scratch');
const SECRET_KEY = "af891bf8da99d19ba13ed08024";

 const registerGet = (req,res)=>{
    res.render('register');
}

 const registerPost = async (req,res)=>{
    try{
    const {name,email,password} = req.body;
    const userExist = await User.findOne({email});

    if(userExist){
        return res.status(404).json({"message":"User already exist"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })

    newUser.save();
    // res.redirect('/login');
    res.status(200).json({"message":"Succesfully registered"})
   }catch(err){
     console.error(err);
     res.status(500).json({"message":"Internal Server Error"})
   }
}

 const loginGet = (req,res)=>{
    res.render('login.html');
}

 const loginPost = async(req,res)=>{
    try{
    const {email,password} = req.body;
    const userExist = await User.findOne({email});
    
    if(!userExist){
        return res.status(404).json({"message":"User Does not exist Please register "})
    }
    const correctPassword = await bcrypt.compare(password,userExist.password);
    if(!correctPassword){
        return res.status(400).json({"message":"Incorrect Password"})
    }
    let token = jwt.sign({id:userExist._id},SECRET_KEY,{expiresIn: '1d'})
    res.header('auth-token',token).json({"message":"Logged In"})
    // localstorage.setItem('userExist._id',token);
    // res.redirect('/task/');
   }catch(err){
      console.error(err);
      res.status(500).json({"message":"Internal Server Error"})
   }
}

const getLocalStorage = (req, res) => {
    const key = req.query.key; // Assuming the key is passed as a query parameter
    // Now you can read from localStorage using the key
    const value = localStorage.getItem(key); // You would need to implement localStorage functionality in your Node.js server
    res.send(value);
}

export {
    registerGet,
    registerPost,
    loginGet,
    loginPost,
    getLocalStorage
}