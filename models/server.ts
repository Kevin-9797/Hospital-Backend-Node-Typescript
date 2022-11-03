import express,{ Application } from 'express'
import { ApiRoute } from '../interfaces/apis';
import { databaseConnection } from '../database/config';
import cors from 'cors'
import { corsConfig } from '../helpers/corsConfig';

export class Server {

    private _app: Application;
    private apiRoutes:ApiRoute;
    private port:Number; 

    constructor() {
        this._app = express();
        this.port = ( process.env.PORT as Number ) ?? 8080;
        
        this.apiRoutes = {
            

            apiUser:'/api/users',
            apiAuth: '/api/auth',
            apiSearch: '/api/search',
            apiUploads: '/api/uploads',
            apiMedical: '/api/medical',
            apiHospital: '/api/hospital',
            apiToken: 'apiToken'
            
        }
        this.dbConnection();
        this.middlewares();
        this.routes();
        
        
        
        
    }


    routes(){
     
        this._app.use(
            this.apiRoutes.apiUser,
            require('../routes/users.api.routes')
        );
        
        this._app.use(
            this.apiRoutes.apiAuth,
            require('../routes/auth.api.routes')
        );

        this._app.use(
            this.apiRoutes.apiHospital,
            require('../routes/hospital.api.routes')
        );

        this._app.use(
            this.apiRoutes.apiMedical,
            require('../routes/medical.api.routes')
        );

        this._app.use(
            this.apiRoutes.apiSearch,
            require('../routes/searchs.api.routes')
        );

        this._app.use(
            this.apiRoutes.apiUploads,
            require('../routes/uploads.api.routes')
        );
    }
    
    
    middlewares(){
        
        
        this._app.use( cors( corsConfig ) );


        this._app.use( express.json() );



    }
    
    async dbConnection(){

        await databaseConnection();
    
    }



    listen(){

        this._app.listen(
            this.port,
            ( ) => {
                console.log( 'Server run in port: ' + this.port )
            }
        )

    }



}