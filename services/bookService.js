var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { readFromJsonFile } from "../DAL/jsonUsers.js";
import { uuid } from "uuidv4";
export const insertBook = (userId, bookName) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get(`${process.env.API_URL}/books?search=${bookName}`);
    const book = response.data;
    const existingBook = !!book;
    if (!existingBook) {
        throw new Error("Book not found.");
    }
    book.id = uuid();
    const user = yield bringUserById(userId);
    if (!user.books) {
        user.books = [];
    }
    user.books.push(book);
    return book;
});
export const getBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get(`${process.env.API_URL}/books`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
});
const bringUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const user = users.find((user) => user.id === userId);
    if (!user) {
        throw new Error('User not found.');
    }
    return user;
});
export const getBooksByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield bringUserById(userId);
    if (!user.books) {
        throw new Error('The user does not have a book field.');
    }
    if (((_a = user.books) === null || _a === void 0 ? void 0 : _a.length) === 0) {
        throw new Error('User has not selected books yet.');
    }
    return user.books;
});
