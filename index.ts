import {config} from "dotenv"         // Environment variable (.env)
config()
import {OpenAI} from "openai"         // Openai API


const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Babu1234',
    port: 5432
});

async function connectAndQuery(){
    try {
        await client.connect();
        const queryText = "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'random';"
        const res = await client.query(queryText);
        const rows = res.rows;
        client.end();
        return rows;
    }catch (error){
        console.error("Error Connecting to Database",error);
        throw error;
    }
}

// API-KEY Setup
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
})

async function main() {
    // OpenAI API Calling
    const rows = await connectAndQuery();
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content":"You are an expert SQL Database Engineer.Only Generate the sql query for a prompt."},
            { "role": "user", "content": `Generate an SQL query to get the primery key of the table. The actual table name is 'random' and all the columns_name, data_type of table is: ${JSON.stringify(rows)}` }],
    });

    console.log((chatCompletion.choices[0]?.message?.content) || 'No content found in response.');
}

main().catch((error) => {
    console.error(error);
});
