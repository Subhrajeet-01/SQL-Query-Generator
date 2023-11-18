import {config} from "dotenv"         // Environment variable (.env)
config()
import {OpenAI} from "openai"         // Openai API

import * as fs from "fs";             // fs module to read file.

const result = JSON.parse(fs.readFileSync("details.txt",'utf-8'))         

// API-KEY Setup
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
})

async function main() {
    // OpenAI API Calling
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": `Generate an SQL query to select the id where "culpa" is in "tags" from the 'details' table . The table data is: ${JSON.stringify(result)}` }],
    });

    console.log((chatCompletion.choices[0]?.message?.content) || 'No content found in response.');
}

main().catch((error) => {
    console.error(error);
});
