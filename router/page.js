import { Router } from 'express';
import PageController from "../controller/page.controller";
import {isAdmin, isDev} from "../middleware/jwt";

const router = Router();

// GESTION DES PAGES
router.get('/', isDev, PageController.all)
router.get('/:id', PageController.one)
router.post('/', isDev, PageController.create)
router.put('/:id', isAdmin, PageController.edit)
router.delete('/:id', isAdmin, PageController.delete)

// GESTION DES BLOCS
router.post('/add/bloc/:id', PageController.addBloc)
router.delete('/remove/bloc/:id', PageController.removeBloc)

module.exports = router;