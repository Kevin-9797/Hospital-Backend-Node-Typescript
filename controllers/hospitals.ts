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


export const updateHospital = async( req: Request, res:Response ) => {

    const { uid } = req.params;

    const changesHospital = {
        ...req.body
    }

    try {
        const hospital = await Hospital.findById( uid )
        
        if(!hospital){
            return res.status(401).json({
                ok: false,
                msg: ''
            })
        }


        const newHospital = await Hospital.findByIdAndUpdate( uid,changesHospital,{ new: true});

        res.json({
            ok: true,
            newHospital
        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Error updating hospital '
        })
    }




}


export const deleteHospital = async( req: Request, res:Response ) => {

    const { uid } = req.params;

    const changesHospital = {
        ...req.body
    }

    try {
        const hospital = await Hospital.findById( uid )
        
        if(!hospital){
            return res.status(401).json({
                ok: false,
                msg: ''
            })
        }


        const newHospital = await Hospital.findByIdAndUpdate( uid, { isDeleted: true },{ new: true } );

        res.json({
            ok: true,
            newHospital
        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Error updating hospital '
        })
    }




}