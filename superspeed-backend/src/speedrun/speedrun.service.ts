import {Speedrun} from "./speedrun";
import {DBSpeedrunStore} from "./DBSpeedrunStore";
import {InMemorySpeedrunStore} from "./inMemorySpeedrun.store";

export class SpeedrunService {
    //private exampleSpeedrunStore:DBSpeedrunStore;
    private exampleSpeedrunStore:InMemorySpeedrunStore

    constructor() {
        //this.exampleSpeedrunStore = new DBSpeedrunStore();
        this.exampleSpeedrunStore = new InMemorySpeedrunStore();
    }

    public async findAll(): Promise<Speedrun[]> {
        return await this.exampleSpeedrunStore.findAll();
    }

    public async find(sid: number): Promise<Speedrun> {
        return await this.exampleSpeedrunStore.find(sid);
    }

    public async create(speedrun:Speedrun):Promise<Speedrun>{
        const speedruns = await this.exampleSpeedrunStore.findAll();
        speedrun.runId = speedruns.length + 1;
        await this.exampleSpeedrunStore.insert(speedrun);

        return speedrun;
    }

    public async edit(speedrun:Speedrun, speedrunChanged:Speedrun):Promise<Speedrun>{
        speedrunChanged.runId = speedrun.runId;
        await this.exampleSpeedrunStore.update(speedrunChanged);

        return speedrunChanged;
    }

    public async remove(sid: number): Promise<Speedrun> {
        const speedrun = this.exampleSpeedrunStore.find(sid);
        await this.exampleSpeedrunStore.remove(sid);

        return speedrun;
    }
}