import express, { Router } from 'express';
import { addBook, getAllHisBooks, getAllBooks} from '../controllers/booksController.js';


const router: Router = express.Router();

router.route('/books').get(getAllHisBooks);
router.route('/books/all').get(getAllBooks);
router.route('/books').post(addBook)


export default router;

