import {GameStore} from "./game.store";
import {Game} from "./game";
import {Bit, ConnectionPool, Int, Date, VarChar} from "mssql";
import {DBPool} from "../dbPool";

export class DBGameStore implements GameStore {
    private connectionPool: ConnectionPool;

    constructor() {
        this.connectionPool = DBPool.getInstance();
    }

    async find(sid: number): Promise<Game> {
        try {
            let result = await this.connectionPool.request()
                .input('sid', Int, sid)
                .query<Game>('SELECT * FROM superspeed.game WHERE gameId = @sid')
            return result.recordset[0];
        } catch (e) {
            throw new Error("Game mit gameId=" + sid + " gibt es nicht")
        }
    }

    async findAll(): Promise<Game[]> {
        try {
            let result = await this.connectionPool.request()
                .query<Game>('SELECT * FROM superspeed.game')
            return result.recordset;
        } catch (e) {
            throw new Error("findAll macht faxxen")
        }
    }

    async insert(game:Game): Promise<void>{
        try{
            await this.connectionPool.request()
                //gameId wird autogeneriert
                .input('gameName', VarChar(100), game.gameName)
                .input('datePublished', Date, game.datePublished)
                .query('INSERT INTO superspeed(gameName, datePublished)(VALUES(@gameName, @datePublished))')
        } catch (e){
            throw new Error("insert macht schon wieder eine show")
        }
    }

    async remove(sid: number): Promise<void> {
        try {
            await this.connectionPool.request()
                .input('sid', Int, sid)
                .query('DELETE FROM speedrun.game WHERE gameId = @sid');
        } catch (e) {
            console.log(e)
            throw new Error("Fehler bei delete von dem Game mit der id=" + sid);
        }
    }

    async update(game: Game): Promise<void> {
        try {
            await this.connectionPool.request()
                .input('gameId', Int, game.gameId)
                .input('gameName', VarChar(100), game.gameName)
                .input('datePublished', Date, game.datePublished)
                .query('UPDATE superspeed.game SET gameName = @gameName, datePublished = @datePublished WHERE gameId = @gameId')
        } catch (e) {
            console.log(e);
            throw new Error("game mit id=" + game.gameId + "konnte nicht geupdates werden")
        }
    }
}