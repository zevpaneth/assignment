var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFromJsonFile } from "../DAL/jsonUsers.js";
export const getBooksByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const users = yield readFromJsonFile();
    const user = users.find((user) => user.id === userId);
    if (!user) {
        throw new Error('User not found.');
    }
    if (!user.books) {
        throw new Error('The user does not have a book field.');
    }
    if (((_a = user.books) === null || _a === void 0 ? void 0 : _a.length) === 0) {
        throw new Error('User has not selected books yet.');
    }
    return user.books;
});
