import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";
import {Connection, createConnection} from "typeorm";
import {defaultData} from "../utils/constants/defaultData";
import mysql from "mysql";

export default class MysqlDatabase {
    private readonly options: MysqlConnectionOptions;
    private connection: Connection;

    constructor(options: MysqlConnectionOptions){
        this.options = options;
    }

    /**
     * @returns boolean true if the database was created, false otherwise.
     */
    public async createIfNotExists(): Promise<boolean> {
        const {database, username, password, url} = this.options;

        const connection = mysql.createConnection((url) ? url : {
            user: username,
            password: password
        });

        return new Promise(resolve => {
            connection.connect(() => {
                connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`, (err, results) => {
                    connection.end(() => resolve(results.affectedRows === 1));
                });
            });
        });
    }

    public async dropAllTables(){
        await this.createIfNotExists();
        let connection = await this.connect();

        await connection.dropDatabase();
        await this.close();
    }

    public async close(): Promise<void> {
        if(this.connection && this.connection.isConnected){
            await this.connection.close();
        }
    }

    public async connect(): Promise<Connection> {
        this.connection = await createConnection(this.options);
        return this.connection;
    }

    public async loadDefaultData(): Promise<any> {
        return Promise.all(Object.keys(defaultData).map(entityName => {
            const entity: any = this.connection.entityMetadatas
                .find(data => data.targetName === entityName)
                .target;

            return Promise.all(entity
                .create(defaultData[entityName])
                .map((entry: any) => entry.save()));
        }));
    }
}