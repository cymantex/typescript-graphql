import {serverOptions, mysqlOptions} from "./settings";
import Server from "./setup/Server";
import MySqlDatabase from "./setup/MysqlDatabase";
import {log} from "./utils/log";

const server = new Server(serverOptions);
const database = new MySqlDatabase(mysqlOptions);

database
    .createIfNotExists()
    .then(async createdDatabase => {
        await database.connect();

        if(createdDatabase){
            await database.loadDefaultData();
        }
    })
    .then(() => server.start())
    .catch(async err => {
        log.error(err);
        await database.close();
        await server.stop();
    });