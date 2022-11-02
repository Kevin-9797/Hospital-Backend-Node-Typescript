

export interface UserData {
   name: string;
   email: string;
   password: string;
   isDeleted: Boolean
   isGoogle: Boolean;
   role: Role;
   img: string;
}



export enum Role {

    NORMAL_USER_ROLE = 'USER_ROLE',
    ADMIN_USER_ROLE =  'ADMIN_ROLE',
    PREMIUM_USER_ROLE = 'NORMAL_USER_ROLE'


}