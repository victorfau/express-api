import { Router } from 'express';
import UserController from "../controller/user.controller";
import {isAdmin, isAuth, isDev} from '../middleware/jwt.js'

const router = Router();

router.get('/', isDev, UserController.all)
router.get('/:id', isDev, UserController.one)
router.put('/:id', isAdmin, UserController.edit)
router.post('/', UserController.create)
router.delete('/:id', isAdmin, UserController.delete)

router.post('/login', UserController.login);

module.exports = router;
