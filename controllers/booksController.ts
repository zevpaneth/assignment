import { Request, Response } from 'express';
import { getBooksByUserId, getBooks, insertBook } from '../services/bookService.js';
import {User, Book} from "../models/types";

export const getAllBooks = async (req: Request, res: Response) => {
    const books = await getBooks();
    res.status(200).json(books);
}


export const getAllHisBooks = async (req: Request, res: Response) => {


    try {
        const userId = req.query.userId as string;

        if (!userId) {
            return res.status(404).json({error: 'Invalid user ID'});
        }

        const usersBooks = await getBooksByUserId(userId);

        res.status(200).json(usersBooks);
    } catch (error: any) {
        if (error.message === 'User not found.' || error.message === 'The user does not have a book field.' || error.message === 'User has not selected books yet.') {
            res.status(404).json({error: error.message});
        } else {
            res.status(500).json({error: "Internal server error."});
        }
    }
}



export const addBook = async (req: Request, res: Response) => {
    try {
        const { userId, bookName } = req.body;

        if (typeof userId !== 'string' || userId.trim() === '') {
            return res.status(400).json({ error: "Valid user ID is required." });
        }

        if (typeof bookName !== 'string' || bookName.trim() === '') {
            return res.status(400).json({ error: "Valid book name is required." });
        }

        const book: Book = await insertBook(userId, bookName);

        res.status(201).json({
            success: true,
            data: {
                bookId: book.id,
                book: book
            }
        });
    }
    catch (error: any) {
        if (error.message === "No book found." || error.message === 'User not found.') {
            res.status(404).json({
                success: false,
                error: error.message
            });
        }
        else {
            console.error('Error in addBook:', error);
            res.status(500).json({
                success: false,
                error: "Internal server error. Please try again later."
            });
        }
    }
}