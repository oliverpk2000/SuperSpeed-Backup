import {SpeedrunStore} from "./speedrun.store";
import {Speedrun} from "./speedrun";
import {Bit, ConnectionPool, Int, Date} from "mssql";
import {DBPool} from "../dbPool";

export class DBSpeedrunStore implements SpeedrunStore {
    private connectionPool: ConnectionPool;

    constructor() {
        this.connectionPool = DBPool.getInstance();
    }

    async find(sid: number): Promise<Speedrun> {
        try {
            let result = await this.connectionPool.request()
                .input('sid', Int, sid)
                .query<Speedrun>('SELECT * FROM superspeed.speedrun WHERE runId = @sid')
            return result.recordset[0];
        } catch (e) {
            throw new Error("Game mit runId=" + sid + " gibt es nicht")
        }
    }

    async findAll(): Promise<Speedrun[]> {
        try {
            let result = await this.connectionPool.request()
                .query<Speedrun>('SELECT * FROM superspeed.speedrun')
            return result.recordset;
        } catch (e) {
            throw new Error("ERROR in findAll")
        }
    }

    async findAllWithGameId(sid:number): Promise<Speedrun[]>{
        try{
            let results = await this.connectionPool.request()
                .input('gameId', Int, sid)
                .query<Speedrun>('SELECT * FROM superspeed.speedrun WHERE gameId = @gameId')
            return results.recordset;
        } catch (e){
            throw new Error("ERROR: game with gameId: " + sid +" doesnt exist, or there are no speedruns for this game yet")
        }
    }

    async insert(speedrun:Speedrun): Promise<void>{
        try{
            await this.connectionPool.request()
                .input('gameId', Int, speedrun.gameId)
                .input('runnerId', Int, speedrun.runnerId)
                .input('catId', Int, speedrun.catId)
                //runId wird autogeneriert
                .input('timeScore', Int, speedrun.timeScore)
                .input('runDate', Date, speedrun.runDate)
                .input('approved', Bit, speedrun.approved)
                .query('INSERT INTO superspeed(gameId, runnerId, catId, timeScore, runDate, approved)(VALUES(@gameId, @runnerId, @catId, @timeScore, @runDate, @approved))')
        } catch (e){
            throw new Error("ERROR in Insert")
        }
    }

    async remove(sid: number): Promise<void> {
        try {
            await this.connectionPool.request()
                .input('sid', Int, sid)
                .query('DELETE FROM speedrun.speedrun WHERE runId = @sid');
        } catch (e) {
            console.log(e)
            throw new Error("Fehler bei delete von dem Game mit der id=" + sid);
        }
    }

    async update(speedrun: Speedrun): Promise<void> {
        try {
            await this.connectionPool.request()
                // runnerId ändern mach keinen Sinn
                .input('runId', Int, speedrun.runId)
                .input('catId', Int, speedrun.catId)
                .input('gameId', Int, speedrun.gameId)
                .input('approved', Bit, speedrun.approved)
                .input('timeScore', Int, speedrun.timeScore)
                .input('runDate', Date, speedrun.runDate)
                .query('UPDATE superspeed.speedrun SET catId = @catId, gameId = @gameId, approved = @approved, timeScore = @timescore, runDate = @runDate, WHERE id = @id')
        } catch (e) {
            console.log(e);
            throw new Error("speedrun mit id=" + speedrun.runId + "konnte nicht geupdates werden")
        }
    }
}