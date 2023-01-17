import { Request, Response } from "express";
import  { UserModel }  from '../models'
import bcryptjs from 'bcryptjs'
import { X509Certificate } from "crypto";
import { ObjectId } from 'mongoose';


export const getUsers = async( req: Request ,res:Response ) => {

  
    const { start  } = req.query;
    


    const [total, users] = await Promise.all([
        UserModel.countDocuments(),
        UserModel
        .find()
        .skip( Number(start) )

    ])
    
    users.forEach( function( user ) {
        user['uid'] = user['_id']!.toString();
        delete user['_id'];
        
    })
    
    res.json( {
        ok: true,
        users,
        total   
    } );


}
 
export const createUser = async( req: Request ,res:Response ) => {

    const { name,email,password } = req.body;
    
    try {
        
            const existEmail = await UserModel.findOne({ email });
            console.log( req.body )
            if( existEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Email registered in the database'
                });
            }

            const user = new UserModel( req.body );

            const salt = await bcryptjs.genSaltSync(10);

            const passHash = await bcryptjs.hashSync( password, salt);
            user.password = passHash;

            await user.save();
            res.json( user );

    } catch (error) {
        res.status(500).json({
            msg:'Please contact with admin'
        })        
    }

}



export const updateUser = async( req: Request ,res:Response ) => {
    
    const { uid } = req.params;

    const object = req.body;
    try {
        
        const userDb = await UserModel.findByIdAndUpdate(uid,object);
        console.log( userDb )

        if( !userDb ){
            return res.status(401).json({
                ok: false,
                msg: 'User not exist'
            })

        }
        
        const { password,google,email,...data } = req.body;

        if( userDb.email !== email ){

            const existEmail = await UserModel.findOne({ email });

            if( existEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Email registered in the database'
                });
            }
        }
        if(!userDb.isGoogle){

            data.email = email;

        }else if( userDb.email !== email || userDb.password !== password ){
            return res.status(400).json({
                ok: false,
                msg: 'Google user cant change password or email'
            });
        }

        const userUpdated = await UserModel.findByIdAndUpdate(uid,data,{ new: true });
         


        res.json( userUpdated );

    } catch (error) {   
       return res.status(500).json({
            msg:'Please contact with admin',
        }) 
    }

}


export const deleteUser = async( req: Request ,res:Response ) => {

    const { uid } = req.params;
    
    

    try {
        
        const userDb = await UserModel.findById(uid);

        if( !userDb ){
            return res.status(401).json({
                ok: false,
                msg: 'User not exist'
            })

        }
      const resp = await UserModel.findByIdAndUpdate( uid,{ estado: false },{ new: true });   
        console.log(resp)
      return res.json({
            ok: true,
            msg: 'User deleted successfully'
        })


    } catch (error) {
        
        res.status(500).json({
            msg:'Please contact with admin',
            error
        }) 

    }


}