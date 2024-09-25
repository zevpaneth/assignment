import axios, {AxiosResponse} from 'axios';
import {readFromJsonFile} from "../DAL/jsonUsers.js"
import {Book, User} from "../models/types";
import {uuid} from "uuidv4";

export const insertBook = async (userId: string ,bookName: string) => {
    const response = await axios.get<Book>(`${process.env.API_URL}/books?search=${bookName}`)

    const book: Book = response.data;

    if (!book || Object.keys(book).length === 0) {
        throw new Error("Book not found.");
    }

    book.id = uuid();

    const user: User = await bringUserById(userId);

    if (!user.books){
        user.books = [];
    }

    user.books.push(book);

    return book
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


const bringUserById = async (userId: string) => {
    const users: User[]  = await readFromJsonFile()
    const user: User | undefined = users.find((user) => user.id === userId);
    if (!user) {
        throw new Error('User not found.')
    }
    return user;
}

export const getBooksByUserId = async (userId: string):Promise<Book[]> => {

    const user: User = await bringUserById(userId);

    if (!user.books){
        throw new Error('The user does not have a book field.')
    }

    if (user.books?.length === 0) {
        throw new Error('User has not selected books yet.')
    }

    return user.books;
}