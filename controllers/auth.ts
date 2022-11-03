

import { Request,Response } from 'express'
import { UserModel } from '../models/user';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { generateJWT } from '../helpers/jwt';

export const loginUser = async( req:Request, res:Response ) => {

    const { email,password } = req.body;

    try {

        const userDb = await  UserModel.findOne({ email });

        if( !userDb ) {

           return res.status(500).json({
                msg:'Email registered in the database',
                
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