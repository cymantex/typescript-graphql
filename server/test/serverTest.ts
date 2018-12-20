import {serverOptions, mysqlOptions} from "./settings";
import Server from "../setup/Server";
import MySqlDatabase from "../setup/MysqlDatabase";

class ServerTest {
    server: Server;
    database: MySqlDatabase;

    constructor(){
        this.server = new Server(serverOptions);
        this.database = new MySqlDatabase(mysqlOptions);
    }

    async start(){
        await this.database.dropAllTables();
        await this.database.connect();
        await this.database.loadDefaultData();
        await this.server.start();
    }

    async stop(){
        await this.database.close();
        await this.server.stop();
    }
}

const testServer = new ServerTest();
before(async () => await testServer.start());
after(async () => await testServer.stop());