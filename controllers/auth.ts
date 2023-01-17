

import { Request,Response } from 'express'
import { UserModel } from '../models/user';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { generateJWT } from '../helpers/jwt';
import { googleVerify } from '../helpers/google-verify';
import { Model } from 'mongoose';
import { UserData } from '../interfaces/user';

export const loginUser = async( req:Request, res:Response ) => {

    const { email,password } = req.body;
    console.log(email + 'aca esta el email')
    try {

        const userDb = await  UserModel.findOne({ email });

        if( !userDb ) {

           return res.status(500).json({
                msg:'Email not exist',
                
            })        

        }

        const validPassword = bcryptjs.compareSync( password,userDb!.password)

        if( !validPassword ){


            return res.status(500).json({
                msg:'Email or password are incorrect',
                
            })

        }
        const token = await generateJWT( userDb!._id );



        res.json({
            ok: true,
            token
        })


        
    } catch (error) {
        
        res.status(500).json({
            msg:'Please contact with admin',
            error
        })        

    }


}



export const googleSignIn = async( req:Request, res:Response ) => {

    const { token:oldToken } = req.body;

    console.log(req.body ,'este es el body')            
        const { name,email,img } =  await googleVerify( oldToken );

      
        let userDb = await UserModel.findOne({ email });
        let user: any;
        if( userDb === null  ){
            
            const data = {
                name,
                email,
                password: '@@@',
                img,
                isGoogle: true
            }   
            
            user = new UserModel( data );
            console.log(user);
            
            
        }else{
            
            user = userDb ;
            user.isGoogle = true;
            
            
            
        }
        await user.save();
        
        if( user.isDeleted ){
            return res.status(401).json({
                msg: 'User not found '
            })
        }

        const token = await generateJWT( user!._id );
        
         res.json({
                user,
                token
            })

   


}



export const renewToken = async( req: Request,res: Response ) => {


    const uid = req.uid;
    console.log(uid)
    const user = await UserModel.findById(uid);
    const resp = {
        uid,
        
    }
    const token = await generateJWT(uid);
    
    console.log(user)
    res.json({
        ok: true,
        token,
        user,
        uid
    })







}