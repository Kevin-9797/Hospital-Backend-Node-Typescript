import { UserModel } from '../models/user';


export const existUserById = async( id:string ) =>{

    const exist = await UserModel.findById(id);
    console.log(exist)
    if(!exist){
        throw new Error(`This id ${ id } exist in database`);

    }

}



export const emailExist = async( email: string = '' ) => {

    const exist = await UserModel.findOne({ email });
    if(exist){
        throw new Error(`This email ${ email } exist in database`);
    }

}

export const allowedCollections = ( colection: string = '' , colections: 'users' | 'hospitals' | 'medicals' ) => {
    const exist = colections.includes( colection );


  if(!exist){
        
        throw new Error(`The colection is not allowed,colections allowed: ${ colections }`);

    }else{

        return true;
            //En esta funcion devolvemos true ya que en las rutas implementamos de manera distinta el callback en el cual llamamos esta funcion

    }


}
