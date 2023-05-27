import {Game} from "./game";
import {DBGameStore} from "./DBGameStore";
import {InMemoryGameStore} from "./inMemoryGame.store";

export class GameService {
    //private exampleGameStore:DBCategoryStore;
    private exampleGameStore:InMemoryGameStore

    constructor() {
        //this.exampleGameStore = new DBCategoryStore();
        this.exampleGameStore = new InMemoryGameStore();
    }

    public async findAll(): Promise<Game[]> {
        return await this.exampleGameStore.findAll();
    }

    public async find(sid: number): Promise<Game> {
        return await this.exampleGameStore.find(sid);
    }

    public async create(game:Game):Promise<Game>{
        const games = await this.exampleGameStore.findAll();
        game.gameId = games.length + 1;
        await this.exampleGameStore.insert(game);

        return game;
    }

    public async edit(game:Game, gameChanged:Game):Promise<Game>{
        gameChanged.gameId = game.gameId;
        await this.exampleGameStore.update(gameChanged);

        return gameChanged;
    }

    public async remove(sid: number): Promise<Game> {
        const game = this.exampleGameStore.find(sid);
        await this.exampleGameStore.remove(sid);

        return game;
    }
}