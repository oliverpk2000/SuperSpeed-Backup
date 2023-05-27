import {GameService} from "./game.service";
import {Game} from "./game";
import {Router} from "express";

export class GameRouter {
    private readonly gameService:GameService;
    private readonly _router:Router;

    constructor() {
        this.gameService = new GameService();
        this._router = Router();

        this.router.get("/", async (req, res) => {
            const games: Game[] = await this.gameService.findAll();
            res.status(200).send(games);
        });

        this.router.get("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const game: Game = await this.gameService.find(sid);

            if (game) {
                return res.status(200).send(game);
            }
            res.status(404).send("item not found");
        });

        this.router.post("/", async (req, res) => {
            const game: Game = req.body;

            if (game.gameName == undefined || game.gameName.trim() == "") {
                res.status(404).json("not correct format")
            } else {
                const newGame = await this.gameService.create(game);
                res.status(201).json(newGame);
            }
        });

        this.router.post("/bulk", async (req, res) => {
            const games: Game[] = req.body;
            const valid: Game[] = [];

            for (let i = 0; i < games.length; i++) {
                if (games[i].gameName == undefined || games[i].gameName.trim() == "") {
                    res.status(404).json("not correct format")
                } else {
                    let game: Game = await this.gameService.create(games[i]);
                    valid.push(game)
                }
            }
            res.status(201).json(valid);
        });

        this.router.put("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const gameChanged: Game = req.body;
            const game: Game = await this.gameService.find(sid);

            if (gameChanged.gameName == undefined || gameChanged.gameName.trim() == "") {
                res.status(404).json("not correct format")
            } else {
                const edit = await this.gameService.edit(game, gameChanged);
                res.status(201).json(edit);
            }
        });

        this.router.delete("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const remove = await this.gameService.remove(sid);
            res.status(201).json(remove);
        });
    }

    public get router():Router{
        return this._router;
    }
}