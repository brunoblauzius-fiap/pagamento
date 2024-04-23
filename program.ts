import Server  from "./server";
import MongoDBDatabase from "./external/MongoDBDatabase";

let  port = process.env.PORT || 3000;
const _db = new MongoDBDatabase();
const _server = new Server(_db);
_server.app.listen(port, () => {
    console.log('Server exec: PORTA -> ' + port);
});
