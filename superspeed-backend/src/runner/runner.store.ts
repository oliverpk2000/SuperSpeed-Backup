import {Runner} from "./runner";

export interface RunnerStore {

    findAll():Promise<Runner[]>

    find(sid:number):Promise<Runner>

    insert(runner:Runner):Promise<void>

    update(runnerChanged:Runner):Promise<void>

    remove(sid:number):Promise<void>

}