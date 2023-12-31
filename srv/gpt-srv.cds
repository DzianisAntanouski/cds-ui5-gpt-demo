using {db} from '../db/schema';

service GPTService {
    entity User     as select from db.User;
    entity Session  as select from db.Session;
    entity Messages as select from db.Message;
    function sendMessage(sMessage : String, nSessionId : Integer) returns String;
    function clearSession(nSessionId: Integer) returns String;
}