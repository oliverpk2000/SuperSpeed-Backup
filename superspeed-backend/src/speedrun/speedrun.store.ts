import {Speedrun} from "./speedrun";

export interface SpeedrunStore {

    findAll():Promise<Speedrun[]>

    find(sid:number):Promise<Speedrun>

    insert(speedrun:Speedrun):Promise<void>

    update(speedrunChanged:Speedrun):Promise<void>

    remove(sid:number):Promise<void>

}