import {ServerOptions} from "../setup/Server";
import {constants} from "../utils/constants";
import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";

export const serverOptions: ServerOptions = {
    port: 8081,
};

export const mysqlOptions: MysqlConnectionOptions = {
    type: "mysql",
    database: "test_sample_database",
    port: 3306,
    username: "root",
    password: "",
    entities: [`${constants.serverRoot}/entities/*.ts`],
    synchronize: true
};

export const requestHost = `http://localhost:${serverOptions.port}`;