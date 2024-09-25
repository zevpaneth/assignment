import { Request, Response } from 'express';
import { getBooksByUserId } from '../services/bookService.js';

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
    const { userId, bookName } = req.body;
    if (!userId) {
        throw new Error("User ID is required.");
    }

    if (!bookName) {
        throw new Error("Book Name is required.");
    }

    
}