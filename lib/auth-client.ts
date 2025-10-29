 import { createAuthClient } from "better-auth/react";
 import { polarClient } from "@polar-sh/better-auth"; 
 export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [polarClient()],
  fetchOptions: {
    credentials: "include",  
  },
});
