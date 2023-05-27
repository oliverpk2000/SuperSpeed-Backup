import {Runner} from "./runner";
import {RunnerStore} from "./runner.store";
/** Only for testing; real application would use a DB instead of this store object */
const defRunners:Runner[] = [
    {
        runnerId: 1,
        runnerName: "greg",
        email:"greg.greg@greg.com",
        dateJoined: new Date(),
        password:"gregpassword",
        adminFlag:0
    }
]

export class InMemoryRunnerStore implements RunnerStore{
    private readonly runnerIndex:{[id:number]:Runner} = {}

    constructor() {
        this.initWithDefRunners()
    }

    private initWithDefRunners() {
        defRunners.forEach(defRunner => {
            this.runnerIndex[defRunner.runnerId] = defRunner;
        });
    }

    public async update(runnerChanged:Runner):Promise<void> {
        this.runnerIndex[runnerChanged.runnerId] = runnerChanged;
    }


    public async findAll():Promise<Runner[]>{
        return await Object.values(this.runnerIndex)
    }

    public async find(sid:number):Promise<Runner>{
        return this.runnerIndex[sid];
    }

    public async insert(runner:Runner):Promise<void> {
        this.runnerIndex[runner.runnerId] = runner;
    }

    public async remove(sid:number):Promise<void> {
        delete this.runnerIndex[sid];
    }

}
