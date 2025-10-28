"use server";

import { PackId } from "@/app/types/billing";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function PurchaseCredits (packId: PackId) {
          const session = await auth.api.getSession({
                headers: await headers() // you need to pass the headers object.
            })    
               const userId = session?.user.id;
            
                  if(!userId){
                      throw new Error("unautheticated");
                  }
          
}