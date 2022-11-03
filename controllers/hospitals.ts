import { Request, Response } from "express"
import { Hospital } from '../models/hospital';
import { HospitalData } from '../interfaces/';



export const getHospitals = async( req: Request, res:Response ) => {

    const hospitals = await Hospital.find().populate('user','name img');

    res.json({
        ok:true,
        msg:'getHOSPITALS'
    })


}

export const createHospital = async( req: Request, res:Response ) => {

    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });

    
    try {



        const hospitalDb = await hospital.save();
        
        res.json({
            ok:true,
                msg:'createHospital',
                hospitalDb
            })

            
    } catch (error) {
        


    }


}


export const updateHospital = ( req: Request, res:Response ) => {

    res.json({
        ok:true,
        msg:'updateHospital'
    })


}


export const deleteHospital = ( req: Request, res:Response ) => {

    res.json({
        ok:true,
        msg:'deleteHospital'
    })


}