import axios, {AxiosResponse} from 'axios';
import {readFromJsonFile, writeUserToJsonFile} from "../DAL/jsonUsers.js"
import {Book, User} from "../models/types";
import { v4 as uuidv4 } from 'uuid';

const API_URL = process.env.API_URL;

export const insertBook = async (userId: string, bookName: string): Promise<Book> => {
    try {
        const response = await axios.get<Book>(`${API_URL}/books`, {
            params: { search: bookName },
            validateStatus: status => status === 200
        });

        const book: Book = response.data;

        if (!book || Object.keys(book).length === 0) {
            throw new Error("Book not found.");
        }

        book.id = uuidv4();

        const user: User = await getUserById(userId);

        if (!user.books) {
            user.books = [];
        }

        user.books.push(book);
        await updateUser(user);

        return book;
    } catch (error) {
        console.error("Error in insertBook:", error);
        throw error;
    }
}

export const getBooks = async () => {
    try {
        const response : AxiosResponse<Book[]> = await axios.get<Book[]>(`${process.env.API_URL}/books`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }

}


export const getUserById = async (userId: string): Promise<User> => {
    const users: User[] = await readFromJsonFile();
    const user: User | undefined = users.find((user) => user.id === userId);
    if (!user) {
        throw new Error('User not found.');
    }
    return user;
}

export const getBooksByUserId = async (userId: string):Promise<Book[]> => {

    const user: User = await getUserById(userId);

    if (!user.books){
        throw new Error('The user does not have a book field.')
    }

    if (user.books?.length === 0) {
        throw new Error('User has not selected books yet.')
    }

    return user.books;
}
// handle fixing this function!!
const updateUser = async (updatedUser: User): Promise<void> => {
    const users: User[] = await readFromJsonFile();
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
        users[index] = updatedUser;
        await writeUserToJsonFile(updatedUser);
    } else {
        throw new Error('User not found for update.');
    }
}