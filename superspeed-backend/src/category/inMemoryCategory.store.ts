import {Category} from "./category";
import {CategoryStore} from "./category.store";
/** Only for testing; real application would use a DB instead of this store object */
const defCategorys:Category[] = [
    {
        catId: 0,
        catName: "Any%"
    }
]

export class InMemoryCategoryStore implements CategoryStore{
    private readonly categoryIndex:{[id:number]:Category} = {}

    constructor() {
        this.initWithDefCategorys()
    }

    private initWithDefCategorys() {
        defCategorys.forEach(defCategory => {
            this.categoryIndex[defCategory.catId] = defCategory;
        });
    }

    public async update(categoryChanged:Category):Promise<void> {
        this.categoryIndex[categoryChanged.catId] = categoryChanged;
    }


    public async findAll():Promise<Category[]>{
        return await Object.values(this.categoryIndex)
    }

    public async find(sid:number):Promise<Category>{
        return this.categoryIndex[sid];
    }

    public async insert(category:Category):Promise<void> {
        this.categoryIndex[category.catId] = category;
    }

    public async remove(sid:number):Promise<void> {
        delete this.categoryIndex[sid];
    }

}
