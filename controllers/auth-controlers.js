import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

export const register = async(req,res)=>{
  const {email, password} =req.body;
  try {
    // alternativa busando por email
    let user = await User.findOne({email});
    if(user)throw ({code:11000});

    user = new User({email,password});
    await user.save();

    // Generar jwt token
    return res.status(201).json({ok:true});
  } catch (error) {
    console.log(error);
    // Alternatva por defecto mongoose
    if(error.code === 11000){
      return res.status(400).json({error:'Ya existe este ususario'});
    }
    return res.status(500).json({error:'Error de servidor'});
  }
  };

export const login = async(req,res)=>{
  const {email, password} =req.body;
  try {
    let user = await User.findOne({email});
    if(!user) 
    return res.status(403).json({error:'NO existe este ususario'});
    
    const resPassword = await user.comparePassword(password);
    if(!resPassword)
    return res.status(403).json({error:'Contraseña incorrecta'});

    // Generar Token con jwt
    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET);
    return res.json({token});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:'Error de servidor'});
  }
  };
  