import {RunnerService} from "./runner.service";
import {Runner} from "./runner";
import {Router} from "express";

export class RunnerRouter {
    private readonly runnerService:RunnerService;
    private readonly _router:Router;

    constructor() {
        this.runnerService = new RunnerService();
        this._router = Router();

        this.router.get("/", async (req, res) => {
            const runners: Runner[] = await this.runnerService.findAll();
            res.status(200).send(runners);
        });

        this.router.get("/:runnerId", async (req, res) => {
            const runnerId: number = parseInt(req.params.runnerId, 10);
            const runner: Runner = await this.runnerService.find(runnerId);

            if (runner) {
                return res.status(200).send(runner);
            }
            res.status(404).send("item not found");
        });

        // this.router.get("/name/:name", async (req, res) => {
        //     const name:string = req.params.name
        //     let count = this.runnerService.findName(name);
        //     res.status(201).json();
        // });
        //
        // this.router.get("/same", async (req, res) => {
        //     const runnerName: string = req.query.runnerName as string;
        //     const email: string = req.query.email as string;
        //     const password: string = req.query.password as string;
        //
        //     const matchingRunner = await this.runnerService.findSameObject(runnerName, email, password);
        //     res.status(201).json(matchingRunner);
        // });

        this.router.post("/", async (req, res) => {
            const runner: Runner = req.body;

            if (runner.runnerName == undefined || runner.runnerName.trim() == "") {
                res.status(404).json("not correct format")
            } else {
                const newRunner = await this.runnerService.create(runner);
                res.status(201).json(newRunner);
            }
        });

        this.router.put("/:runnerId", async (req, res) => {
            const runnerId: number = parseInt(req.params.runnerId, 10);
            const runnerChanged: Runner = req.body;
            const runner: Runner = await this.runnerService.find(runnerId);

            if (runnerChanged.runnerName == undefined || runnerChanged.runnerName.trim() == "" || runnerChanged.password == undefined || runnerChanged.password.trim() == "") {
                res.status(404).json("not correct format")
            } else {
                const edit = await this.runnerService.edit(runner, runnerChanged);
                res.status(201).json(edit);
            }
        });

        this.router.delete("/:runnerId", async (req, res) => {
            const runnerId: number = parseInt(req.params.runnerId, 10);
            const remove = await this.runnerService.remove(runnerId);
            res.status(201).json(remove);
        });
    }

    public get router():Router{
        return this._router;
    }
}
