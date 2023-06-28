const cds = require("@sap/cds");
const openai = require("./openai.js");
const oMessage = require("./message.js");

const GPTService = function (srv) {
    srv.on("sendMessage", async ({ data: { sMessage, nSessionId } }) => {
        await oMessage.applyMessage(sMessage, nSessionId, "user");

        const messages = await SELECT.from("DB_MESSAGE").where({ Session_ID: nSessionId }).columns("role", "content");

        let gptMessage = await openai.chat(messages);
        
        if (!gptMessage) {
            await oMessage.removeLastMessage();
            return `ERROR`
        }

        await oMessage.applyMessage(gptMessage.content, nSessionId, gptMessage.role);

        if (nSessionId === 4) {
            await oMessage.applyMessage("answer in French", nSessionId, "system");
        }

        return `OK`;
    });

    srv.on("READ", "Messages", async (req, next) => {
        const data = await next()        
        return data.filter(el => el.role !== "system")
    });

    srv.on("clearSession", async({ data: { nSessionId } }) => {
        if (nSessionId !== 1) {
            return `You can remove only session ID 1`
        }
        await DELETE.from('DB_MESSAGE').where({ Session_ID: nSessionId })
        return `deleted`
    })
};

module.exports = GPTService;
