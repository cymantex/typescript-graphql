import {ServerOptions} from "./setup/Server";
import {constants} from "./utils/constants";
import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";

export const serverOptions: ServerOptions = {
    port: parseInt(process.env.PORT, 10) || 8080,
};

const databaseName = process.env.DB_NAME || "sample_database";
export const mysqlOptions: MysqlConnectionOptions = process.env.CLEARDB_DATABASE_URL ? {
    type: "mysql",
    database: databaseName,
    url: process.env.CLEARDB_DATABASE_URL
} : {
    type: "mysql",
    database: databaseName,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    entities: [`${constants.serverRoot}/entities/*.ts`],
    synchronize: true,
    logging: constants.isDevelopment
};