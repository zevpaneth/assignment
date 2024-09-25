import express, { Router } from 'express';
import {login,register} from '../controllers/authController.js' 


const router: Router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);

export default router;