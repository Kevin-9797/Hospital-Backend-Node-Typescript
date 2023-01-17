import { Request, Response } from "express";
import request from 'request'

import fs from 'fs'
import { Hospital } from '../models/hospital';
import { Medical } from '../models/medical';
import cloudinary from 'cloudinary'
import { UserModel } from '../models/user';
import fileUpload from 'express-fileupload';
import { UploadedFile } from 'express-fileupload';
import { UserData } from '../interfaces/user';
import { HospitalData } from '../interfaces/hospital';
import { MedicalData } from "../interfaces";
import path from "path";
cloudinary.v2.config( process.env.CLOUDINARY_URL );

export const uploadFile = async( req:Request, res:Response ) => {
    const { id, collection = '' } = req.params;

    if ( !req.files || Object.keys(req.files).length === 0 ) {
        return res.status(400).json({ 
            msg:'No files were uploaded.'
        });
    }
    
    let model;
    
    switch ( collection ) {
        case 'users':
            model = await UserModel.findById( id.match(/^[0-9a-fA-F]{24}$/) );
            console.log(id.match(/^[0-9a-fA-F]{24}$/))
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

        const archivo = req.files!.file;
        console.log( archivo );
    
}   



export const updateImgCloudinary = async( req:Request, res:Response ) => {

    const { id, collection = '' } = req.params;
    
    if ( !req.files || Object.keys(req.files).length === 0 ) {
        return res.status(400).json({ 
            msg:'No files were uploaded.'
        });
    }
    let model: UserData | HospitalData | MedicalData | any;
    
    switch ( collection ) {
        case 'users':
            model = await UserModel.findById( id.match(/^[0-9a-fA-F]{24}$/) ) ;
            console.log(model)
            if( !model ){
                
                return res.status(400).json({
                    msg: `User id ${ id } not exist`
                })
                
            }

            break;
        case 'medicals':
            model = await Medical.findById( id.match(/^[0-9a-fA-F]{24}$/) );
            
            if( !model ){
            
                return res.status(400).json({
                    msg: `Product id ${ id } not exist`
                });

            }

            break;

        case 'hospitals':
                model = await Hospital.findById( id.match(/^[0-9a-fA-F]{24}$/) );
                
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
            const name = nameArr[ nameArr.length - 1];
            const [public_id] = name.split('.');
            console.log( public_id )
            console.log(`node-cafe/${ collection }/${ public_id }`);
            cloudinary.v2.uploader.destroy( `node-hospital/${ collection }/${ public_id }`,{ invalidate: true, resource_type: "image" } );

    }

    
    try {
        
        const archivo:any  = req.files!.file;
        console.log(archivo)
        const { secure_url } = await cloudinary.v2.uploader.upload( archivo.tempFilePath,{ folder:`node-hospital/${ collection }`}  );
        console.log (secure_url)
        model.img = secure_url.toString();
        await model.save();
        res.json( model );
        
    } catch (error) {
        
        return res.status(500).json({
            msg: 'Internal server error',
        })

    }



    
    // const name = await processFile( req.files, undefined ,colection );
    // model.img = name;
    // await model.save();

}


export const getFileCloudinary = async( req: Request,res: Response ) => {
    const {collection,id } = req.params;
    

    let model;




    switch ( collection ) {
        case 'users':
            model = await UserModel.findById( id.match(/^[0-9a-fA-F]{24}$/) );            


            break;
        case 'medicals':
            model = await Medical.findById( id.match(/^[0-9a-fA-F]{24}$/) );            
            
            break;
        case 'hospitals':
            model = await Hospital.findById( id.match(/^[0-9a-fA-F]{24}$/) );            
        
            break;
        default:
            return res.status(400).json({
                msg: 'Prrogrammer error',    

            })
    }



    if( !model ) {
        return res.status(401).json({
            msg: 'The submitted model id does not exist in the database'
        })
    }



    if( model.img ) {


        request({
            url: model.img,
            encoding: null
        },
        (err,resp,buffer) => {
            if(!err && resp.statusCode === 200){
                res.set('Content-Type','image/jpeg');
                res.send( resp.body );
            }
            
        })
        // res.sendFile( model.img );

    }else{
        const notFoundImage = path.join(__dirname,'../assets/images/not_found.jpg')
        
        res.sendFile(notFoundImage)

    }

    

}