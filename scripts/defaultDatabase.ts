import MysqlDatabase from "../server/setup/MysqlDatabase";
import {mysqlOptions} from "../server/settings";

export default async (): Promise<void> => {
    const database = new MysqlDatabase(mysqlOptions);
    await database.connect();
    return database.loadDefaultData();
};