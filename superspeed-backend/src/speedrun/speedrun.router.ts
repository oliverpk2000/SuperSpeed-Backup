import {SpeedrunService} from "./speedrun.service";
import {Speedrun} from "./speedrun";
import {Router} from "express";

export class SpeedrunRouter {
    private readonly speedrunService:SpeedrunService;
    private readonly _router:Router;

    constructor() {
        this.speedrunService = new SpeedrunService();
        this._router = Router();

        //################################# get routes ##########################################

        //gettet alle Speedruns
        this.router.get("/", async (req, res) => {
            const speedruns: Speedrun[] = await this.speedrunService.findAll();
            res.status(200).send(speedruns);
        });

        //gettet den speedrun, dessen speedrunId sid ist
        this.router.get("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const speedrun: Speedrun = await this.speedrunService.find(sid);

            if (speedrun) {
                return res.status(200).send(speedrun);
            }
            res.status(404).send("item not found");
        });


        this.router.get("/game/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const speedruns = await this.speedrunService.findAllWithGameId(sid);

            if (speedruns) {
                return res.status(200).send(speedruns);
            }
            res.status(404).send("item not found");
        });


        this.router.post("/", async (req, res) => {
            const speedrun: Speedrun = req.body;

            const newSpeedrun = await this.speedrunService.create(speedrun);
            res.status(201).json(newSpeedrun);
        });

        this.router.post("/bulk", async (req, res) => {
            const speedruns: Speedrun[] = req.body;
            const valid: Speedrun[] = [];

            for (let i = 0; i < speedruns.length; i++) {
                let speedrun: Speedrun = await this.speedrunService.create(speedruns[i]);
                valid.push(speedrun)
            }
            res.status(201).json(valid);
        });

        this.router.put("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const speedrunChanged: Speedrun = req.body;
            const speedrun: Speedrun = await this.speedrunService.find(sid);

            const edit = await this.speedrunService.edit(speedrun, speedrunChanged);
            res.status(201).json(edit);
        });

        this.router.delete("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const remove = await this.speedrunService.remove(sid);
            res.status(201).json(remove);
        });


    }

    public get router():Router{
        return this._router;
    }

}