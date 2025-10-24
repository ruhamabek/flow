"use server"

import { createCredentialSchema, createCredentialType } from "@/app/schema/credential";
import { auth } from "@/lib/auth";
import { symmetricEncrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function CreateCredential(form: createCredentialType) {
    const { success , data } = createCredentialSchema.safeParse(form);
    if(!success){
        throw new Error("invalid form data");
    }
        const session = await auth.api.getSession({
            headers: await headers()
        })    
            
        const userId = session?.user.id;
    
        if(!userId){
            throw new Error("unauthenticated");
        }
     
    const encryptedValue = symmetricEncrypt(data.value);
    const result = await prisma.credential.create({
        data: {
            userId,
            name: data.name,
            value:encryptedValue
        }
    });

    if(!result){
        throw new Error("failed to create credential")
    }

    revalidatePath('/credentials');
}