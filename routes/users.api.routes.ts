import { Router, request,response } from 'express';
import { getUsers, updateUser, createUser, deleteUser } from '../controllers/users';
import { validateZones } from '../middlewares/validate-zone';
import { check } from 'express-validator'
import { validateJWT } from '../middlewares/validate-jwt';
import { isAdminRole } from '../helpers/validate-roles';
import { existUserById } from '../helpers/db-validators';

const router = Router();



router.get('/',[
    validateJWT,

],getUsers);

router.post('/',[
    check('name','Email is required').not().isEmpty(),
    check('password','Email is required').not().isEmpty(),
    check('email','Email is required').not().isEmpty(),
    check('email','Email not valid').isEmail(),
    validateZones
],createUser );



router.put('/:uid',[
    validateJWT,
    check('name','Email is required').not().isEmpty(),
    check('password','Password is required').not().isEmpty(),
    check('email','Email is required').not().isEmpty(),
    check('email','Email not valid').isEmail(),

    validateZones
],updateUser );

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id').isMongoId(),
    check('id').custom( existUserById ),
    validateZones
], deleteUser )

module.exports = router;