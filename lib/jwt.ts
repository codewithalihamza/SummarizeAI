import * as jose from 'jose';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '7d'; // Token expires in 7 days

export interface JWTPayload extends jose.JWTPayload {
    id: string;
    email: string;
    name: string;
}

export const generateToken = async (payload: JWTPayload): Promise<string> => {
    const secret = new TextEncoder().encode(JWT_SECRET);
    return await new jose.SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(TOKEN_EXPIRY)
        .sign(secret);
};

export const verifyToken = async (token: string): Promise<JWTPayload | null> => {
    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jose.jwtVerify(token, secret);
        const { id, email, name } = payload;
        if (typeof id === 'string' && typeof email === 'string' && typeof name === 'string') {
            return { id, email, name };
        }
        return null;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};

export const COOKIE_TOKEN_NAME = 'token'; 