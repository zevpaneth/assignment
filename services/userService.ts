import { User } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeUserToJsonFile } from "../DAL/jsonUsers.js"
import bcrypt from "bcrypt"

export const registerUser = async (userName: string,password: string): Promise<string> => {
  const users: User[] = await readFromJsonFile();
  const existingUser:boolean = !!users.find((u) => u.userName === userName);

  if (existingUser) {
    throw new Error("Username already exists.");
  }

  const saltOrRounds:number = parseInt(process.env.SALT_OR_ROUNDS /* in case is it undefined */ || "10");
  const hashedPassword = bcrypt.hashSync(password, saltOrRounds);

  const newUserId: string = uuidv4();

  const newUser: User = {
    id: newUserId ,
    userName: userName,
    password: hashedPassword,
    books: [],
  };

  await writeUserToJsonFile(newUser);
  return newUserId;
};

export const authenticateUser = async (userName: string, password: string): Promise<string> => {
  const users: User[] = await readFromJsonFile();
  const userFind: User | undefined = users.find((u) => u.userName === userName);

  if (!userFind) {
    throw new Error("Invalid username.");
  }

  const passwordMatch:boolean = bcrypt.compareSync(password, userFind.password);

  if (!passwordMatch) {
    throw new Error("Invalid password.");
  }

  return userFind.id? userFind.id : ''; // just for typescript not to be mad
};
