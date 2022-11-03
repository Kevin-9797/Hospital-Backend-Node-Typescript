import express from 'express';
const { request, response } = require("express");
const path = require('path');
const { v4:uuiv4 } = require('uuid');


const processFile = async( files:any , extensionsValid  = [ 'png', 'jpg', 'jpeg','gif'], folder = '' ) =>{
  
    return new Promise( ( resolve,reject ) => {

        const { file } = files;
        
    

        const nameCort = file.name.split('.');
    
        const extension = nameCort[ nameCort.length -1 ]
    
    
    
        if( extensionsValid.includes( extension )){
            

            reject(`Extension ${ extension } not valid - extensions valid ${ extensionsValid }`)    
            
            
    
        }
    
    
        const nameTemp = uuiv4() + '.' + extension;
    
    
    
    
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const uploadPath =  path.join( __dirname,'../uploads/',folder,nameTemp );
      
    
        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, ( err:any ) => {
          
          
            if (err){
             reject(err) ;
            }
      
           resolve(nameTemp);
    
    
        })
    })

}



module.exports = {
    processFile
}