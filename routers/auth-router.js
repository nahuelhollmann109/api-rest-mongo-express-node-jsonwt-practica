import  {Router}  from "express";
import { register,login } from "../controllers/auth-controlers.js";
import {body} from "express-validator";
import {validation} from '../middlewares/resultValidation.js'
const router = Router('/');

router.post('/register',[
    body('email','Formato Email incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),

    body('password','Minimo 6 caracteres')
    .trim()
    .isLength({min: 6}),

    body('password','Formato de password incorrecto')
    .custom((value,{req})=>{
        if (value !== req.body.repassword) {
            throw new Error('No coinciden las contraseñas');
        }
        return value;
    })
],
validation,

register);

router.post('/login',[
    body('email','Formato Email incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),

    body('password','Minimo 8 caracteres')
    .trim()
    .isLength({min: 7})
], 
validation,
login);

export default router;