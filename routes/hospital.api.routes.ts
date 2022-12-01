import { Router, request,response } from 'express';
import { validateJWT } from '../middlewares/validate-jwt';
import { createHospital, updateHospital, getHospitals, deleteHospital } from '../controllers/hospitals';
import { validateZones } from '../middlewares/validate-zone';
import { check } from 'express-validator';

const router = Router();



router.get('/',[

],getHospitals);

router.post('/',[
    validateJWT,
    check('name','Name is required').not().isEmpty(),
    check('hospitalId','The hospitalId has to be a valid mongo id').isMongoId(),

    validateZones
],createHospital );



router.put('/:uid',[
    validateJWT,
    check('name','Name is required').not().isEmpty(),
    validateZones
],updateHospital );



router.delete('/:uid',[
    validateJWT,
],deleteHospital );

module.exports = router;