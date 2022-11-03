import { Router, request,response } from 'express';
import { validateJWT } from '../middlewares/validate-jwt';
import { getMedicals, createMedical, updateMedical, deleteMedical } from '../controllers/medicals';

const router = Router();



router.get('/',[

],getMedicals);

router.post('/',[
    validateJWT
],createMedical );



router.put('/:uid',[
    validateJWT
    
],updateMedical );


router.delete('/:uid',[
    validateJWT
    
],deleteMedical );



module.exports = router;