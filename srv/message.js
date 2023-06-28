class Message {
    constructor() {
        this.msgTable = "DB_MESSAGE";
        this.sessionTable = "DB_SESSION";
        this.lastID;
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
            this.lastID = nNewId;
            return `OK`;
        } catch (error) {
            console.error(`Operation create failed`);
            return `${error.message}`;
        }
    }

    async removeLastMessage() {
        try {
            await DELETE.from(this.msgTable).where({ ID: this.lastID });
            return `OK`;
        } catch (error) {
            console.error(`Operation remove failed`);
            return `${error.message}`;
        }
    }
}

const oMessage = new Message();
module.exports = oMessage;
