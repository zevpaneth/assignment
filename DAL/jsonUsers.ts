import jsonfile from 'jsonfile';
import {User} from '../models/types';

const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';


export const writeUserToJsonFile = async (user: User): Promise<void> => {
  const users: User[] = await jsonfile.readFile(DB_FILE_PATH);
  users.push(user);
  await jsonfile.writeFile(DB_FILE_PATH, users);
};

export const readFromJsonFile = async (): Promise<User[]> => {
  return await jsonfile.readFile(DB_FILE_PATH);
};
