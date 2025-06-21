import { SignInData, SignUpData } from "@/types";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../schema/user";

export class AuthService {
  static async signUp(data: SignUpData) {
    try {
      // Check if user already exists
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email));

      if (existingUser) {
        return {
          success: false,
          error: "Email already exists. Please sign in instead.",
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Create user
      const [user] = await db
        .insert(users)
        .values({
          name: data.name,
          email: data.email,
          password: hashedPassword,
        })
        .returning();

      return { success: true, user };
    } catch (error) {
      console.error("Sign up error:", error);
      return { success: false, error: "Failed to create account" };
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
        return { success: false, error: "Please sign up first" };
      }

      // Check password
      const validPassword = await bcrypt.compare(data.password, user.password);
      if (!validPassword) {
        return { success: false, error: "Invalid credentials" };
      }
      return { success: true, user };
    } catch (error) {
      console.error("Sign in error:", error);
      return { success: false, error: "Failed to sign in" };
    }
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string) {
    try {
      // Find user
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId));

      if (!user) {
        return { success: false, error: "User not found" };
      }

      // Verify current password
      const validPassword = await bcrypt.compare(currentPassword, user.password);
      if (!validPassword) {
        return { success: false, error: "Current password is incorrect" };
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await db
        .update(users)
        .set({
          password: hashedNewPassword,
          updatedAt: new Date()
        })
        .where(eq(users.id, userId));

      return { success: true, message: "Password changed successfully" };
    } catch (error) {
      console.error("Change password error:", error);
      return { success: false, error: "Failed to change password" };
    }
  }
}
