import { Request, Response } from "express";

import fs from 'fs'
import { Hospital } from '../models/hospital';
import { Medical } from '../models/medical';
import cloudinary from 'cloudinary'
import { UserModel } from '../models/user';
cloudinary.v2.config( process.env.CLOUDINARY_URL );

export const uploadFile = ( req:Request, res:Response ) => {

    if ( !req.files || Object.keys(req.files).length === 0 ) {
        return res.status(400).json({ 
            msg:'No files were uploaded.'
        });
    }
    


}



export const updateImgCloudinary = async( req:Request, res:Response ) => {

    const { id, collection = '' } = req.params;
    
   
    let model;
    
    switch ( collection ) {
        case 'users':
            model = await UserModel.findById( id );
            
            if( !model ){
                
                return res.status(400).json({
                    msg: `User id ${ id } not exist`
                })
                
            }

            break;
        case 'medicals':
            model = await Medical.findById( id );
            
            if( !model ){
            
                return res.status(400).json({
                    msg: `Product id ${ id } not exist`
                });

            }

            break;

        case 'hospitals':
                model = await Hospital.findById( id );
                
                if( !model ){
                
                    return res.status(400).json({
                        msg: `Product id ${ id } not exist`
                    });
    
                }
    
                break; 
        default:

            return res.status(500).json({ 
                msg: 'Internal server error'
            });

    }


    
    if( model.img ){

            const nameArr = model.img.split('/');
            console.log( nameArr )
            const name = nameArr[ nameArr.length - 1];
            const [public_id] = name.split('.');
            console.log(`node-cafe/${ collection }/${ public_id }`)
            cloudinary.v2.uploader.destroy( `node-cafe/${ collection }/${ public_id }`,{ invalidate: true, resource_type: "image" } );

    }

    const { tempFilePath } = req.files!.file;
   
    const { secure_url } = await cloudinary.v2.uploader.upload( tempFilePath,{ folder:`node-cafe/${ collection }`}  );

    model.img = secure_url;

    

    // const name = await processFile( req.files, undefined ,colection );
    // model.img = name;
    // await model.save();

    res.json( model );


}