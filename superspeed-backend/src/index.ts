/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import express, {Express} from "express";
import cors from "cors";
import helmet from "helmet";
import {DBPool} from "./dbPool";
import {RunnerRouter} from "./runner/runner.router";
import {GameRouter} from "./game/game.router";
import {SpeedrunRouter} from "./speedrun/speedrun.router";
import {CategoryRouter} from "./category/category.router";

dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);


class Application{
    private express:Express;

    constructor() {
        this.express = express();

        this.configureExpress();
    }

    private configureExpress(){
        this.express.use(helmet());     //schutz vor gewissen Angriffen
        this.express.use(cors());       //lässt frontend von anderer URL das Backend aufrufen
        this.express.use(express.json());       //parst automatisch zu JSON

        const loggerOptions: expressWinston.LoggerOptions = {       //logging
            transports: [new winston.transports.Console()],
            msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} response after {{res.responseTime}}ms",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.prettyPrint(),
                winston.format.colorize({level: true}),
                winston.format.printf(({ level, message, timestamp }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            ),
        };
        this.express.use(expressWinston.logger(loggerOptions));

        this.addRoutes();

        this.express.use((req:any, res:any, next:any) => {          //
            res.status(404);
            res.json({error:"route not found"});
        });
        this.express.use((err:any, req:any, res:any, next:any) => {         //error handling
            console.error(err);
            res.status(500);
            res.json({error:"Internal Server Error"});
        });
    }

    private addRoutes(){            //Hier definieren wir die Schnittstellen (in dem fall als products)
        /** Add new Main-Routes here (i.e. 'api/blog', 'api/student', 'ws/message', ...) */

        this.express.use("/api/superspeed/runner", new RunnerRouter().router);       //api product übernimmt hier der StudentRouter
        this.express.use("/api/superspeed/game", new GameRouter().router);
        this.express.use("/api/superspeed/category", new CategoryRouter().router);
        this.express.use("/api/superspeed/speedrun", new SpeedrunRouter().router);
    }                                                                       // eine neue zeile für jedes

    public run(){
        //auskommentiert, weil dbPoolauskommentiert ist weil keine DB
        //in jedem DBstore auch fehler, die werden gerade nicht benutzt, gerade werden die InMemory stores benutzt
        /** change port in .env-file, not here! */
        /**
        DBPool.connect().then(() => {
            this.express.listen(PORT, function () {
                console.log(`Listening on port ${PORT}`);
            })
        });
         */
        this.express.listen(PORT, function () {
            console.log(`Listening on port ${PORT}`);
        })
    }
}

new Application().run();