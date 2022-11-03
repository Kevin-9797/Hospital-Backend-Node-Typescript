import { Request, Response } from "express";
import  { UserModel }  from '../models'
import bcryptjs from 'bcryptjs'


export const getUsers = async( req: Request ,res:Response ) => {

    const start = Number(req.query.start) || 0;
    


    const [total, users] = await Promise.all([
        UserModel.countDocuments(),
        UserModel.find({},'name email')
        .skip( start )
        .limit( 5 ),

    ])


               


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
            console.log()
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

        data.email = email;

        const userUpdated = await UserModel.findByIdAndUpdate(uid,data,{ new: true });
         


        res.json( userUpdated );

    } catch (error) {
        res.status(500).json({
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
        
        await UserModel.findByIdAndUpdate( uid,{ estado: false });   

    } catch (error) {
        
        res.status(500).json({
            msg:'Please contact with admin',
            error
        }) 

    }


}