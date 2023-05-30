
import {Speedrun} from "./speedrun";
import {SpeedrunStore} from "./speedrun.store";
/** Only for testing; real application would use a DB instead of this store object */
const defSpeedruns:Speedrun[] = [
    {
        gameId: 0,
        runnerId: 1,
        catId: 0,
        runId: 0,
        timeScore: 600000,
        runDate: new Date(),
        approved: 1
    },
    {
        gameId: 0,
        runnerId: 0,
        catId: 0,
        runId: 1,
        timeScore: 100000,
        runDate: new Date(),
        approved: 1
    },
    {
        gameId: 0,
        runnerId: 0,
        catId: 0,
        runId: 2,
        timeScore: 330000,
        runDate: new Date(),
        approved: 0
    },
    {
        gameId: 0,
        runnerId: 0,
        catId: 1,
        runId: 3,
        timeScore: 330000,
        runDate: new Date(),
        approved: 1
    }
]

export class InMemorySpeedrunStore implements SpeedrunStore{
    private readonly speedrunIndex:{[id:number]:Speedrun} = {}

    constructor() {
        this.initWithDefSpeedruns()
    }

    private initWithDefSpeedruns() {
        defSpeedruns.forEach(defSpeedrun => {
            this.speedrunIndex[defSpeedrun.runId] = defSpeedrun;
        });
    }

    public async update(speedrunChanged:Speedrun):Promise<void> {
        this.speedrunIndex[speedrunChanged.runId] = speedrunChanged;
    }


    public async findAll():Promise<Speedrun[]>{
        return await Object.values(this.speedrunIndex)
    }

    public async find(sid:number):Promise<Speedrun>{
        return this.speedrunIndex[sid];
    }

    //returnt all speedruns which match the given gameId
    public async findAllWithGameId(sid:number):Promise<Speedrun[]>{
        return await Object.values(this.speedrunIndex).filter((speedrun) => speedrun.gameId === sid);
    }

    public async insert(speedrun:Speedrun):Promise<void> {
        this.speedrunIndex[speedrun.runId] = speedrun;
    }

    public async remove(sid:number):Promise<void> {
        delete this.speedrunIndex[sid];
    }

}
