import { Schema, model } from 'mongoose'
import { HospitalData, MedicalData, Role, UserData } from '../interfaces';



const MedicalSchema:Schema = new Schema<MedicalData>({
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
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true

    },
});

MedicalSchema.method('toJSON',function(){
    const { __v, ...object } = this.toObject();
    return object;
})


export const  Medical = model('Medical',MedicalSchema );