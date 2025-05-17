import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../schema/user';

export type SignUpData = {
    name: string;
    email: string;
    password: string;
};

export type SignInData = {
    email: string;
    password: string;
};

export class AuthService {
    static async signUp(data: SignUpData) {
        try {
            // Hash password
            const hashedPassword = await bcrypt.hash(data.password, 10);

            // Create user
            const [user] = await db.insert(users).values({
                name: data.name,
                email: data.email,
                password: hashedPassword,
            }).returning();

            return { success: true, user };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: 'Failed to create account' };
        }
    }

    static async signIn(data: SignInData) {
        try {
            // Find user
            const [user] = await db
                .select()
                .from(users)
                .where(eq(users.email, data.email));

            if (!user) {
                return { success: false, error: 'Please sign up first' };
            }

            // Check password
            const validPassword = await bcrypt.compare(data.password, user.password);
            if (!validPassword) {
                return { success: false, error: 'Invalid credentials' };
            }
            return { success: true, user };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: 'Failed to sign in' };
        }
    }
} 