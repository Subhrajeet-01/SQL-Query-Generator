import {config} from "dotenv"         // Environment variable (.env)
config()
import {OpenAI} from "openai"         // Openai API

// this line make 'require' available.
import { createRequire } from "module";
import { response } from "express";
const require = createRequire(import.meta.url);

// fs module to read file.
const fs = require('fs')

const result = JSON.parse(fs.readFileSync("text.txt",'utf-8'))         

// API-KEY Setup
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
})

//Openai_API Calling
const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": `Generate an SQL query to select the id where "culpa" in "tags" from the 'details' table . The table data is: ${JSON.stringify(result)}`}]
})


console.log(chatCompletion.choices[0].message.content)