const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

class OpenAI {
    constructor(apiKey) {
        const configuration = new Configuration({
            apiKey,
        });
        this.openai = new OpenAIApi(configuration);
    }

    async chat(messages) {
        try {
            const response = await this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages,
            });
            return response.data.choices[0].message;
        } catch (error) {            
            console.log("Err while GPT chat", error.message);
            return false
        }
    }
}

const openai = new OpenAI(process.env.OPENAI_KEY);
module.exports = openai;
