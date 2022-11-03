import { rejects } from 'assert';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import { resolve } from 'path';



export const generateJWT = ( uid:any ) => {

    

    return new Promise( ( resolve,reject ) => {


        const payload = {
            uid
        }
    
        jwt.sign(payload, process.env.JWT_PRIVATE_KEY ,{
            expiresIn:'24h',
        },( err: any, token: any ) => {

            if( err ){
    
                console.log( err )
                reject( 'Could not resolve json web token' );
    
            }else{
                resolve( token );
            }
    
    
        } )



    } )
}