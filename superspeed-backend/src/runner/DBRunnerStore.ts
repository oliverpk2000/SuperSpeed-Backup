import {RunnerStore} from "./runner.store";
import {Runner} from "./runner";
import {Bit, ConnectionPool, Int, Date, VarChar} from "mssql";
import {DBPool} from "../dbPool";

export class DBRunnerStore implements RunnerStore {
    private connectionPool: ConnectionPool;

    constructor() {
        this.connectionPool = DBPool.getInstance();
    }

    async find(sid: number): Promise<Runner> {
        try {
            let result = await this.connectionPool.request()
                .input('sid', Int, sid)
                .query<Runner>('SELECT * FROM superspeed.runner WHERE runnerId = @sid')
            return result.recordset[0];
        } catch (e) {
            throw new Error("Game mit runnerId=" + sid + " gibt es nicht")
        }
    }

    async findAll(): Promise<Runner[]> {
        try {
            let result = await this.connectionPool.request()
                .query<Runner>('SELECT * FROM superspeed.runner')
            return result.recordset;
        } catch (e) {
            throw new Error("findAll macht faxxen")
        }
    }

    async insert(runner:Runner): Promise<void>{
        try{
            await this.connectionPool.request()
                .input('runnerName', VarChar(50), runner.runnerName)
                .input('email', VarChar(50), runner.email)
                .input('dateJoined', Date, runner.dateJoined)
                .input('password', VarChar(50), runner.password)
                .input('adminFlag', Bit, runner.adminFlag)
                .query('INSERT INTO superspeed(runnerName, email, dateJoined, password, adminFlag)(VALUES(@runnerName, @email, @dateJoined, @password, @adminFlag))')
        } catch (e){
            throw new Error("insert macht schon wieder eine show")
        }
    }

    async remove(sid: number): Promise<void> {
        try {
            await this.connectionPool.request()
                .input('sid', Int, sid)
                .query('DELETE FROM speedrun.runner WHERE runnerId = @sid');
        } catch (e) {
            console.log(e)
            throw new Error("Fehler bei delete von dem Game mit der id=" + sid);
        }
    }

    async update(runner: Runner): Promise<void> {
        try {
            await this.connectionPool.request()
                .input('runnerId', Int, runner.runnerId)
                .input('runnerName', VarChar(50), runner.runnerName)
                .input('password', VarChar(50), runner.password)
                .input('email', VarChar(50), runner.email)
                .input('adminFlag', Bit, runner.adminFlag)
                .query('UPDATE superspeed.runner SET runnerName = @runnerName, email = @email, password = @password, adminFlag = @adminFlag WHERE runnerId = @runnerId')
        } catch (e) {
            console.log(e);
            throw new Error("runner mit id=" + runner.runnerId + "konnte nicht geupdates werden")
        }
    }
}