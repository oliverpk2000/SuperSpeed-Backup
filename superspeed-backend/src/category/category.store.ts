import {Category} from "./category";

export interface CategoryStore {

    findAll():Promise<Category[]>

    find(sid:number):Promise<Category>

    insert(category:Category):Promise<void>

    update(categoryChanged:Category):Promise<void>

    remove(sid:number):Promise<void>

}