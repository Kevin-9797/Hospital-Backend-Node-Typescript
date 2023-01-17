import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';
import { UserData } from '../interfaces/user';




type MyToken = {
    uid: string
    iat: number
    exp: number
  }
  


export const validateJWT = async( req:Request,res:Response,next:NextFunction ) => {

    const token = req.header('x-token');


    try {

        if( !token ){
            return res.status(401).json({
                ok: false,
                msg:'There is no token in the request'
            })
        }
    
        
        const resp = jwt.verify( token, process.env.JWT_PRIVATE_KEY ) as MyToken;
        req.uid = resp.uid;
        const userData = await UserModel.findById( resp.uid ) as UserData;
        req.user = userData;
        next();

    } catch (error) {
       return res.status(401).json({
                ok: false,
                msg:'Wrong token'
            })
    }

 




}

