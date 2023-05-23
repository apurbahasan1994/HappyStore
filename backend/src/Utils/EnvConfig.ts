import dotenv from 'dotenv';
// Determine the environment based on NODE_ENV or default to 'development'
const env = process.env.NODE_ENV || 'development';
// Load the appropriate .env file based on the environment
dotenv.config({ path: `.env.${env}` });
export const port = process.env.PORT || 3000;
export const secret = process.env.SECRECT || 'secret';
export const refresh = process.env.REFRESH || 'refresh';

