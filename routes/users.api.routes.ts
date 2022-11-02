import { Router, request,response } from 'express';
import { getUsers, updateUser, createUser } from '../controllers/users';
import { validateZones } from '../middlewares/validate-zone';
import { check } from 'express-validator'
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();



router.get('/',[
    validateJWT,

],getUsers);

router.post('/',[
    check('name','Email is required').not().isEmpty(),
    check('password','Email is required').not().isEmpty(),
    check('email','Email is required').not().isEmpty(),
    check('email','Email is required').isEmail(),
    validateZones
],createUser );



router.put('/:uid',[
    validateJWT,
    check('name','Email is required').not().isEmpty(),
    check('password','Email is required').not().isEmpty(),
    check('email','Email is required').not().isEmpty(),
    check('email','Email is required').isEmail(),

    validateZones
],updateUser );

module.exports = router;