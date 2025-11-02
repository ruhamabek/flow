 import { createAuthClient } from "better-auth/react";
 import { polarClient } from "@polar-sh/better-auth"; 
 export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [polarClient()],
  fetchOptions: {
    credentials: "include",  
    
  },

});
