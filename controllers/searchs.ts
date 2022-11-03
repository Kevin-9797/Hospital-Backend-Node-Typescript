import { Request, Response } from "express";
import { UserModel } from '../models/user';
import { Hospital } from '../models/hospital';
import { Medical } from '../models/medical';




export const getSearch = async( req: Request,res:Response) => {
    const search = req.params.search;

    const regex = new RegExp( search,'i');

    const [users,medicals,hospitals] = await Promise.all([

        UserModel.find({ name: regex }),
        Hospital.find({ name: regex }),
        Medical.find({ name: regex })

    ]);


    res.json({
        ok: false,
        msg:'Get search',
        users,
        medicals,
        hospitals

    })

}




export const searchCollection = async( req:Request,res:Response ) => {

    const collection = req.params.collection;

    const search = req.params.search;

    const regex = new RegExp( search,'i');
    let data = []; 
    switch (collection) {
        case 'users':
            data = await UserModel.find({ name: regex }).populate('user','name img')
                                                        .populate('hospital','name img')
            return res.json({
                ok: true,
                results: data 
            });
        break;
        case 'medicals':
            data = await Medical.find({ name: regex }).populate('user','name img')
            
        break;
        case 'hospitals':
            data = await Hospital.find({ name: regex })
            
        break;
                
        default:
            return res.status(400).json({
                msg: 'The values ​​allowed in the collection are: users,medicals,hospitals'
            })
            break;
    }








}