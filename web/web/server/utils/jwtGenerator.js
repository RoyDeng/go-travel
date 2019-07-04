import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

const generateJWT = (user = {}) => {
    const { id, username } = user;
    return {
        ...user,
        token: jwt.sign({ sub: { id, username } }, JWT_SECRET)
    };
}

export default generateJWT;