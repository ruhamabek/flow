 import { createAuthClient } from "better-auth/react";
 import { polarClient } from "@polar-sh/better-auth"; 
 export const authClient = createAuthClient({
  baseURL: "https://flow-chi-drab.vercel.app",
  plugins: [polarClient()],
  fetchOptions: {
    credentials: "include",  
    
  },

});
