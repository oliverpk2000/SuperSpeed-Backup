import {CategoryStore} from "./category.store";
import {Category} from "./category";
import {ConnectionPool, Int, VarChar} from "mssql";
import {DBPool} from "../dbPool";

export class DBCategoryStore implements CategoryStore {
    private connectionPool: ConnectionPool;

    constructor() {
        this.connectionPool = DBPool.getInstance();
    }

    async find(sid: number): Promise<Category> {
        try {
            let result = await this.connectionPool.request()
                .input('sid', Int, sid)
                .query<Category>('SELECT * FROM superspeed.category WHERE catId = @sid')
            return result.recordset[0];
        } catch (e) {
            throw new Error("Category mit catId=" + sid + " gibt es nicht")
        }
    }

    async findAll(): Promise<Category[]> {
        try {
            let result = await this.connectionPool.request()
                .query<Category>('SELECT * FROM superspeed.category')
            return result.recordset;
        } catch (e) {
            throw new Error("ERROR in findAll")
        }
    }

    async insert(category:Category): Promise<void>{
        try{
            await this.connectionPool.request()
                //catId wird autogeneriert
                .input('catName', VarChar(100), category.catName)
                .query('INSERT INTO superspeed(catName)(VALUES(@catName))')
        } catch (e){
            throw new Error("ERROR in insert")
        }
    }

    async remove(sid: number): Promise<void> {
        try {
            await this.connectionPool.request()
                .input('sid', Int, sid)
                .query('DELETE FROM speedrun.category WHERE catId = @sid');
        } catch (e) {
            console.log(e)
            throw new Error("Fehler bei delete von dem Category mit der id=" + sid);
        }
    }

    async update(category: Category): Promise<void> {
        try {
            await this.connectionPool.request()
                .input('catId', Int, category.catId)
                .input('catName', VarChar(100), category.catName)

                .query('UPDATE superspeed.category SET catName = @catName WHERE catId = @catId')
        } catch (e) {
            console.log(e);
            throw new Error("category mit id=" + category.catId + "konnte nicht geupdates werden")
        }
    }
}