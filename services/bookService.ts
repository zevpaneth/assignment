import { readFromJsonFile, writeUserToJsonFile } from "../DAL/jsonUsers.js"
import { User, Book} from "../models/types";
import books from "../routes/books";

export const getBooksByUserId = async (userId: string):Promise<Book[]> => {
    const users: User[]  = await readFromJsonFile()
    const user: User | undefined = users.find((user) => user.id === userId)

    if (!user) {
        throw new Error('User not found.')
    }

    if (!user.books){
        throw new Error('The user does not have a book field.')
    }

    if (user.books?.length === 0) {
        throw new Error('User has not selected books yet.')
    }

    return user.books;
}