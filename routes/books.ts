import express, { Router } from 'express';
import { addBook, getAllHisBooks} from '../controllers/booksController.js';


const router: Router = express.Router();

router.route('/books').get(getAllHisBooks);
router.route('/books').post(addBook)


export default router;

