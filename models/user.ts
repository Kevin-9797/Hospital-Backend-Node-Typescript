import { Schema, model } from 'mongoose'
import { Role, UserData } from '../interfaces/user';



const UserSchema:Schema = new Schema<UserData>({
    name:{
        type: String,
        required: true,

    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    isGoogle:{
        type: Boolean,
        default: false
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
    role:{
        type: String,
        enum: Role,
        default: Role.NORMAL_USER_ROLE,  
    },

    

});

UserSchema.method('toJSON',function(){
    const { __v,_id, ...object } = this.toObject();

    object.uid = _id;
    return object;
})


export const  UserModel = model('User',UserSchema );