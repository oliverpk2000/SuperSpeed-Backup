import {Game} from "./game";

export interface GameStore {

    findAll():Promise<Game[]>

    find(sid:number):Promise<Game>

    insert(game:Game):Promise<void>

    update(gameChanged:Game):Promise<void>

    remove(sid:number):Promise<void>

}