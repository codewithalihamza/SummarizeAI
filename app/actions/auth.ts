'use server';

import { signInSchema, signUpSchema } from "@/lib/schema/user";
import { AuthService } from "@/lib/services/auth";
import { z } from "zod";

export async function signIn(data: z.infer<typeof signInSchema>) {
    try {
        const validatedData = signInSchema.parse(data);
        const result = await AuthService.signIn(validatedData);
        return result;
    } catch (error) {
        console.log('error', error);
        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors[0].message };
        }
        return { success: false, error: 'Failed to sign in' };
    }
}

export async function signUp(data: z.infer<typeof signUpSchema>) {
    try {
        const validatedData = signUpSchema.parse(data);
        return await AuthService.signUp({
            name: validatedData.name,
            email: validatedData.email,
            password: validatedData.password,
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors[0].message };
        }
        return { success: false, error: 'Failed to create account' };
    }
}

export async function signOut() {
    'use server';
    return { success: true };
}