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
  },
  {
    runnerId: 2,
    runnerName: "admin",
    email: "admin@gmail.com",
    dateJoined: new Date(),
    password: "admin123",
    adminFlag: 1
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

  // public async findName(name:string): Promise<number>{
  //   //getting the length of the index notation array
  //   let arrayLength = Object.keys(this.runnerIndex).length;
  //   for (let i = 0; i < arrayLength; i++) {
  //     if(this.runnerIndex[i].runnerName == name){
  //       return 1;
  //     }
  //   }
  //   return 0;
  // }

  // public async findSameObject(runnerName:string, email:string, password:string):Promise<Runner>{
  //   let arrayLength = Object.keys(this.runnerIndex).length;
  //   let sameRunner:Runner = {runnerId: -1, runnerName: "", email: "", password:"",dateJoined: new Date() , adminFlag:0};
  //   for (let i = 0; i < arrayLength; i++) {
  //     if(this.runnerIndex[i].runnerName === runnerName && this.runnerIndex[i].email === email && this.runnerIndex[i].password === password){
  //       sameRunner = this.runnerIndex[i];
  //     }
  //   }
  //   return sameRunner;
  // }
  //

  public async insert(runner: Runner): Promise<void> {
    this.runnerIndex[runner.runnerId] = runner;
  }

  public async remove(sid: number): Promise<void> {
    delete this.runnerIndex[sid];
  }

}
