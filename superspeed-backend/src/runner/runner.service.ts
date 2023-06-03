import {Runner} from "./runner";
import {InMemoryRunnerStore} from "./inMemoryRunner.store";

export class RunnerService {
  //private exampleRunnerStore:DBSpeedrunStore;
  private exampleRunnerStore: InMemoryRunnerStore

  constructor() {
    //this.exampleRunnerStore = new DBSpeedrunStore();
    this.exampleRunnerStore = new InMemoryRunnerStore();
  }

  public async findAll(): Promise<Runner[]> {
    return await this.exampleRunnerStore.findAll();
  }

  public async find(sid: number): Promise<Runner> {
    return await this.exampleRunnerStore.find(sid);
  }

  public async findName(name:string): Promise<number>{
      return await this.exampleRunnerStore.findName(name);
  }

  public async create(runner:Runner):Promise<Runner>{
      const runners = await this.exampleRunnerStore.findAll();
      runner.runnerId = runners.length + 1;
      await this.exampleRunnerStore.insert(runner);

      return runner;
  }

  public async edit(runner: Runner, runnerChanged: Runner): Promise<Runner> {
    runnerChanged.runnerId = runner.runnerId;
    await this.exampleRunnerStore.update(runnerChanged);

    return runnerChanged;
  }

  public async remove(sid: number): Promise<Runner> {
    const runner = this.exampleRunnerStore.find(sid);
    await this.exampleRunnerStore.remove(sid);

    return runner;
  }
}
