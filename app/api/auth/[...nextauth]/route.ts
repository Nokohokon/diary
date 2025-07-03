import { handlers } from "@/lib/auth"

// Ensure handlers exist
if (!handlers) {
  throw new Error("NextAuth handlers not initialized")
}

export const { GET, POST } = handlers
