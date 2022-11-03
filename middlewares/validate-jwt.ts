import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';




type MyToken = {
    uid: string
    iat: number
    exp: number
  }
  


export const validateJWT = ( req:Request,res:Response,next:NextFunction ) => {

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
        next();

    } catch (error) {
       return res.status(401).json({
                ok: false,
                msg:'Wrong token'
            })
    }

 




}

