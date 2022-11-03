import { Request, Response } from "express"
import { Medical } from '../models/medical';



export const getMedicals = async( req: Request, res:Response ) => {


    const medicals = await Medical.find().populate('user','name img')
                                        .populate('hospital','name img ')
    res.json({
        ok:true,
        msg:'getHOSPITALS',
        medicals
    })


}

export const createMedical = async( req: Request, res:Response ) => {

    const uid = req.uid;
    const medical = new Medical({
        user: uid,
        hospital: req.body.hospitalId,
        ...req.body
    });

    
    try {

        const medicalDb = await medical.save();
        
        res.json({
            ok:true,
                msg:'createHospital',
                medicalDb
            })

            
    } catch (error) {
        
        return res.status(500).json({
            msg: 'Internal server error',
            error
        })

    }



}


export const updateMedical = ( req: Request, res:Response ) => {

    res.json({
        ok:true,
        msg:'updateMedical'
    })


}


export const deleteMedical = ( req: Request, res:Response ) => {

    res.json({
        ok:true,
        msg:'deleteMedical'
    })


}