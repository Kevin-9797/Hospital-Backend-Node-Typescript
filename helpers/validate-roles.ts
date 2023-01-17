import { Request, Response } from "express";

export const isAdminRole = ( req:Request, res: Response ) => {
    console.log(req.user)
    if( !req.user ){
        return res.status(500).json({
            msg: 'You want to verify the role without validating the token first'
        })
    }

    const { role,name } = req.user;
    
    if( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `User ${ name } is denied access, privileges are required`
        })
    }
}