import dotenv from 'dotenv';

dotenv.config({path: process.env.PATH_ENV});

export const JWT_SECRET = process.env.SECRET || 'secret';
export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV;
export const DATABASE = process.env.DATABASE_URL || '';