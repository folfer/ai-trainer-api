import "dotenv/config";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-GS5lh0UtOYhBD8NXXv8XMWvU",
  apiKey: process.env.GPT_API_KEY,
});

export const openai = new OpenAIApi(configuration);
