import {Game} from "./game";
import {GameStore} from "./game.store";
/** Only for testing; real application would use a DB instead of this store object */
const defGames:Game[] = [
    {
        gameId: 0,
        gameName: "gregs Adventure",
        datePublished: new Date()
    }
]

export class InMemoryGameStore implements GameStore{
    private readonly gameIndex:{[id:number]:Game} = {}

    constructor() {
        this.initWithDefGames()
    }

    private initWithDefGames() {
        defGames.forEach(defGame => {
            this.gameIndex[defGame.gameId] = defGame;
        });
    }

    public async update(gameChanged:Game):Promise<void> {
        this.gameIndex[gameChanged.gameId] = gameChanged;
    }


    public async findAll():Promise<Game[]>{
        return await Object.values(this.gameIndex)
    }

    public async find(sid:number):Promise<Game>{
        return this.gameIndex[sid];
    }

    public async insert(game:Game):Promise<void> {
        this.gameIndex[game.gameId] = game;
    }

    public async remove(sid:number):Promise<void> {
        delete this.gameIndex[sid];
    }

}
