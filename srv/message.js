class Message {
    constructor() {
        this.msgTable = "DB_MESSAGE";
        this.sessionTable = "DB_SESSION";
    }

    async applyMessage(content, sSessionId, role) {
        try {
            const aIDs = await SELECT.from(this.msgTable).columns(`ID`); //CQL
            const nNewId = aIDs.map((el) => el.ID).sort((a, b) => b - a)[0] + 1;
            const oSession = await SELECT.from(this.sessionTable).where({ ID: sSessionId });

            const oUserMessage = {
                ID: nNewId,
                Session_ID: sSessionId,
                role,
                content,
                User_ID: oSession[0].USER_ID,
                Date: new Date(),
            };

            await INSERT(oUserMessage).into(this.msgTable);
            return `OK`;
        } catch (error) {
            return `${error}`;
        }
    }
}

const oMessage = new Message();
module.exports = oMessage;