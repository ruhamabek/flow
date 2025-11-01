 import { createAuthClient } from "better-auth/react";
 import { polarClient } from "@polar-sh/better-auth"; 
 export const authClient = createAuthClient({
  baseURL: "https://flow-lfu3x82uy-ruhamabeks-projects.vercel.app",
  plugins: [polarClient()],
  fetchOptions: {
    credentials: "include",  
  },

});
