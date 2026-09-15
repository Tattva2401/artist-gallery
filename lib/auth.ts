import { createClient } from "@/lib/supabase";

export async function verifyAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized: You must be logged in to perform this action.");
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const isAdmin = 
    (adminEmail && user.email === adminEmail) ||
    user.user_metadata?.role === "admin" ||
    user.app_metadata?.role === "admin" ||
    (!adminEmail && user); // Fallback for local setup when ADMIN_EMAIL is not configured

  if (!isAdmin) {
    throw new Error("Forbidden: Admin privileges required.");
  }

  return user;
}

