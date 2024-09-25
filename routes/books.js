import express from 'express';
import { addBook, getAllHisBooks } from '../controllers/booksController.js';
const router = express.Router();
router.route('/books').get(getAllHisBooks);
router.route('/books').post(addBook);
export default router;
