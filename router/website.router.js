import { Router } from 'express';
import UserController from "../controller/user.controller"
import {isAdmin, isDev} from '../middleware/jwt.js'
import WebsiteController from "../controller/website.controller";

const router = Router();

router.get('/', isDev, WebsiteController.index)
router.post('/', isDev, WebsiteController.create)
module.exports = router;