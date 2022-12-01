import { Request, Response, Router } from 'express';
import { googleSignIn, loginUser } from '../controllers/auth';
import { check } from 'express-validator';
import { validateZones } from '../middlewares/validate-zone';
import { validateJWT } from '../middlewares/validate-jwt';


const router = Router();


router.post('/login',[
    
    check('email','Email is required').not().isEmpty(),
    check('email','Email not valid').isEmail(),
    check('password','Password is required').not().isEmpty(),
    validateZones
], loginUser )

router.post('/google',[
    check('token','The token google is required ').notEmpty(),
    validateZones
], googleSignIn )

router.post('/renew',[
  validateJWT,
  validateZones
], googleSignIn );

router.get('*', (req: Request, res: Response) => {
    return res.status(404).json({
      ok: false,
      msg: 'Not found',
    });
  });




module.exports = router;