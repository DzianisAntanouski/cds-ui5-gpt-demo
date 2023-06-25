const cds = require("@sap/cds");
const openai = require("./openai.js");
const Message = require("./message.js");

const GPTService = function (srv) {
    srv.on("sendMessage", async ({ data: { sMessage, nSessionId } }) => {
        await Message.applyMessage(sMessage, nSessionId, "user");

        const messages = await SELECT.from("DB_MESSAGE").where({ Session_ID: nSessionId }).columns("role", "content");

        let gptMessage = await openai.chat(messages);

        if (!gptMessage.role) {
            await openai.chat(messages);
        }

        await Message.applyMessage(gptMessage.content, nSessionId, gptMessage.role);

        if (nSessionId === 4) {
            await Message.applyMessage("answer in French", nSessionId, "system");
        }

        return `OK`;
    });
};

module.exports = GPTService;
