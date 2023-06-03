import {Runner} from "./runner";
import {RunnerStore} from "./runner.store";

/** Only for testing; real application would use a DB instead of this store object */
const defRunners: Runner[] = [
  {
    runnerId: 0,
    runnerName: "greg",
    email: "greg@gmail.com",
    dateJoined: new Date(),
    password: "greggreg",
    adminFlag: 1
  },
  {runnerId: 1,
    runnerName: "oliverpk",
    email: "oliver.pecek@gmail.com",
    dateJoined: new Date(),
    password: "password",
    adminFlag: 0
  }
]

export class InMemoryRunnerStore implements RunnerStore {
  private readonly runnerIndex: { [id: number]: Runner } = {}

  constructor() {
    this.initWithDefRunners()
  }

  private initWithDefRunners() {
    defRunners.forEach(defRunner => {
      this.runnerIndex[defRunner.runnerId] = defRunner;
    });
  }

  public async update(runnerChanged: Runner): Promise<void> {
    this.runnerIndex[runnerChanged.runnerId] = runnerChanged;
  }


  public async findAll(): Promise<Runner[]> {
    return await Object.values(this.runnerIndex)
  }

  public async find(sid: number): Promise<Runner> {
    return this.runnerIndex[sid];
  }

  public async findName(name:string): Promise<number>{
    //getting the length of the index notation array
    let arrayLength = Object.keys(this.runnerIndex).length;
    for (let i = 0; i < arrayLength; i++) {
      if(this.runnerIndex[i].runnerName == name){
        return 1;
      }
    }
    return 0;
  }

  public async insert(runner: Runner): Promise<void> {
    this.runnerIndex[runner.runnerId] = runner;
  }

  public async remove(sid: number): Promise<void> {
    delete this.runnerIndex[sid];
  }

}
