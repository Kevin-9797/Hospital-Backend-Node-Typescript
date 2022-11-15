import { Request, Response, Router } from 'express';
import { check } from 'express-validator';
import { updateImgCloudinary, uploadFile } from '../controllers/uploads';
import expressFileUpload from 'express-fileupload'
import { validateJWT } from '../middlewares/validate-jwt';
import { validateZones } from '../middlewares/validate-zone';

const router = Router();

// router.use( expressFileUpload() );


router.post('/:collection/:id',[
    validateJWT,
    check('id','The id has to be a valid mongo id').isMongoId(),

    validateZones    
], updateImgCloudinary )



router.get('*', (req: Request, res: Response) => {
    return res.status(404).json({
      ok: false,
      msg: 'Not found',
    });
  });




module.exports = router;