import { Request, Response, Router } from 'express';
import { loginUser } from '../controllers/auth';
import { check } from 'express-validator';


const router = Router();


router.get('/login',[
    
    check('email','Email is required').not().isEmpty(),
    check('email','Email not valid').isEmail(),
    check('password','Password is required').not().isEmpty(),
    
], loginUser )



router.get('*', (req: Request, res: Response) => {
    return res.status(404).json({
      ok: false,
      msg: 'Not found',
    });
  });




module.exports = router;