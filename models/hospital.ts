import { Schema, model } from 'mongoose'
import { HospitalData, Role, UserData } from '../interfaces';



const HospitalSchema:Schema = new Schema<HospitalData>({
    name:{
        type: String,
        required: true,

    },
    img:{
        type: String,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

HospitalSchema.method('toJSON',function(){
    const { __v, ...object } = this.toObject();
    return object;
})


export const  Hospital = model('Hospital',HospitalSchema );