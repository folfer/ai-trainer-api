import { env } from "@/env";
import "dotenv/config";
import { OpenAI } from "openai";

export const openai = new OpenAI({
  apiKey: env.GPT_API_KEY,
});
