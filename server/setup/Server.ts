import {log} from "../utils/log";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as path from "path";
import {constants} from "../utils/constants";
import glob from "glob";
import graphql from "./graphql";

export interface ServerOptions {
    port: number
}

class Server {
    private readonly app: express.Application;
    private readonly options: ServerOptions;
    private server: http.Server;

    public constructor(options: ServerOptions){
        this.app = express();
        this.options = options;
    }

    public async start(): Promise<http.Server> {
        this.addPlugins();
        return this.addRoutes().then(() => this.listen(this.options.port));
    }

    public async stop(): Promise<void> {
        if(this.server && this.server.listening){
            await this.server.close();
        }
    }

    private async listen(port: number): Promise<http.Server> {
        log.sectionTitle("Starting Server");

        return new Promise<http.Server>(resolve => {
            this.server = this.app.listen(port, () => {
                log.title(`The server is now running on port ${port}.`);
                log.endOfSection();
                resolve(this.server);
            });
        })
    }

    private addPlugins(): void {
        this.app.set("json spaces", 4);
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(cookieParser());
        this.app.use(cors());
    };

    private async addRoutes (): Promise<void> {
        glob.sync(`${constants.serverRoot}/routes/*.ts`)
            .forEach(routeFile => require(routeFile).default(this.app));
        this.app.use("/graphql", await graphql());

        if(constants.isProduction){
            const projectRoot = path.resolve(`${__dirname}/..`);
            this.app.use(express.static(`${projectRoot}/client/build`));

            this.app.get("*", (req, res) => {
                res.sendFile(`${projectRoot}/client/build/index.html`);
            });
        }
    };
}

export default Server;