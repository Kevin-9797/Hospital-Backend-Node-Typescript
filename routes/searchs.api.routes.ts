import { Router } from 'express';
import { getSearch, searchCollection } from '../controllers/searchs';
import { validateJWT } from '../middlewares/validate-jwt';



const router = Router();

router.get('/:search',validateJWT, getSearch );
router.get('/:collection/:search',validateJWT, searchCollection );



module.exports = router;