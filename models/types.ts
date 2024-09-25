export interface User {
  userName: string;
  password: string;
  id?: string;
  books?: Book[];
}

export interface Book {
  id?: string;
  title: string;
  author: string;
  publication_year: number;
  genre: string[];
  description: string;
  cover_image: string;
}

export interface userNamePassword {
  userName: string;
  password: string;
}
