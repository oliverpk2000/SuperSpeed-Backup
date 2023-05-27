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

        this.router.get("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const runner: Runner = await this.runnerService.find(sid);

            if (runner) {
                return res.status(200).send(runner);
            }
            res.status(404).send("item not found");
        });

        this.router.post("/", async (req, res) => {
            const runner: Runner = req.body;

            if (runner.runnerName == undefined || runner.runnerName.trim() == "") {
                res.status(404).json("not correct format")
            } else {
                const newRunner = await this.runnerService.create(runner);
                res.status(201).json(newRunner);
            }
        });

        this.router.post("/bulk", async (req, res) => {
            const runners: Runner[] = req.body;
            const valid: Runner[] = [];

            for (let i = 0; i < runners.length; i++) {
                if (runners[i].runnerName == undefined || runners[i].runnerName.trim() == "" || runners[i].password == undefined || runners[i].password.trim() == "") {
                    res.status(404).json("not correct format")
                } else {
                    let runner: Runner = await this.runnerService.create(runners[i]);
                    valid.push(runner)
                }
            }
            res.status(201).json(valid);
        });

        this.router.put("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const runnerChanged: Runner = req.body;
            const runner: Runner = await this.runnerService.find(sid);

            if (runnerChanged.runnerName == undefined || runnerChanged.runnerName.trim() == "" || runnerChanged.password == undefined || runnerChanged.password.trim() == "") {
                res.status(404).json("not correct format")
            } else {
                const edit = await this.runnerService.edit(runner, runnerChanged);
                res.status(201).json(edit);
            }
        });

        this.router.delete("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const remove = await this.runnerService.remove(sid);
            res.status(201).json(remove);
        });
    }

    public get router():Router{
        return this._router;
    }
}