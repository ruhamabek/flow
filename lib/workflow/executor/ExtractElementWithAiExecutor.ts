import { ExecutionEnviroment } from "@/app/types/executor";
import { ExtractDataWithAI } from "../task/ExtractDataWithAI";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import { GoogleGenAI } from "@google/genai";

export async function ExtractElementWithAiExecutor(
  enviroment: ExecutionEnviroment<typeof ExtractDataWithAI>
): Promise<boolean> {
  try {
    const credentials = enviroment.getInput("Credentials");
    const prompt = enviroment.getInput("Prompt");
    const content = enviroment.getInput("Content");

    if (!credentials || !prompt || !content) {
      enviroment.log.error("Missing required input(s)");
      return false;
    }

    const credential = await prisma.credential.findUnique({
      where: { id: credentials },
    });

    if (!credential) {
      enviroment.log.error("Credential not found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);
    if (!plainCredentialValue) {
      enviroment.log.error("Cannot decrypt credential");
      return false;
    }

    const ai = new GoogleGenAI({ apiKey: plainCredentialValue });

     const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: [
        {
          role: "model",
          parts: [
            {
              text: `You are a webscraper helper that extracts data from HTML or text. 
The response should always be *only* the extracted data as a JSON array or object, 
without any explanations or extra words. 
If no data is found, return an empty JSON array. 
Ensure the output is valid JSON (no markdown formatting) `,
            },
          ],
        },
        { role: "user", parts: [{ text: prompt }] },
        { role: "user", parts: [{ text: content }] },
      
      ],
    });

     const response = await chat.sendMessage({
      message: `Extract the data now based on the ${prompt}.`,
    });

     const resultText = response.text;
    const cleanResultText = resultText?.replace(/```json|```/g, '').trim();
     if (!resultText) {
      enviroment.log.error("Empty response from Gemini");
      return false;
    }

     enviroment.setOutput("Extracted data", cleanResultText!);

     const tokenUsage = await ai.models.countTokens({
      model: "gemini-2.0-flash",
      contents: chat.getHistory(),
    });

    enviroment.log.info(`Token usage: ${JSON.stringify(tokenUsage.totalTokens)}`);
 
    return true;
  } catch (error: any) {
    enviroment.log.error(error.message);
    return false;
  }
}
