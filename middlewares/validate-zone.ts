import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";



export const validateZones = ( req: Request, res: Response, next:NextFunction ) => {

    const errors = validationResult( req );

    if( !errors ){
        return res.status(400).json({
            ok: false,
            errors
        })

    }

    next();


}