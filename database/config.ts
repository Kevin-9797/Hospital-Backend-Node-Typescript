
import mongoose from 'mongoose'



export const databaseConnection = async () => {

    try {
        await mongoose.connect( process.env.MONGOOSE_CONNECTION || '' )
        console.log('database online')

    } catch (error) {
        throw new Error('Error on Database Application, Contact with Admin');
        
    }


}



module.exports = {
    databaseConnection
}
