var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBooksByUserId, getBooks, insertBook } from '../services/bookService.js';
export const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield getBooks();
    res.status(200).json(books);
});
export const getAllHisBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(404).json({ error: 'Invalid user ID' });
        }
        const usersBooks = yield getBooksByUserId(userId);
        res.status(200).json(usersBooks);
    }
    catch (error) {
        if (error.message === 'User not found.' || error.message === 'The user does not have a book field.' || error.message === 'User has not selected books yet.') {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, bookName } = req.body;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }
        if (!bookName) {
            return res.status(400).json({ error: "Book Name is required." });
        }
        const book = yield insertBook(userId, bookName);
        res.status(201).json({ bookId: book.id, book: book });
    }
    catch (error) {
        if (error.message === "Book not found." || error.message === 'User not found.') {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
