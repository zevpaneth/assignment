var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeUserToJsonFile } from "../DAL/jsonUsers.js";
import bcrypt from "bcrypt";
export const registerUser = (userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const existingUser = !!users.find((u) => u.userName === userName);
    if (existingUser) {
        throw new Error("Username already exists.");
    }
    const saltOrRounds = parseInt(process.env.SALT_OR_ROUNDS /* in case is it undefined */ || "10");
    const hashedPassword = bcrypt.hashSync(password, saltOrRounds);
    const newUserId = uuidv4();
    const newUser = {
        id: newUserId,
        userName: userName,
        password: hashedPassword,
        books: [],
    };
    yield writeUserToJsonFile(newUser);
    return newUserId;
});
export const authenticateUser = (userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const userFind = users.find((u) => u.userName === userName);
    if (!userFind) {
        throw new Error("Invalid username.");
    }
    const passwordMatch = bcrypt.compareSync(password, userFind.password);
    if (!passwordMatch) {
        throw new Error("Invalid password.");
    }
    return userFind.id ? userFind.id : ''; // just for typescript not to be mad
});
