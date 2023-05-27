import {Category} from "./category";
import {DBCategoryStore} from "./DBCategoryStore";
import {InMemoryCategoryStore} from "./inMemoryCategory.store";

export class CategoryService {
    //private exampleCategoryStore:DBCategoryStore;
    private exampleCategoryStore:InMemoryCategoryStore

    constructor() {
        //this.exampleCategoryStore = new DBCategoryStore();
        this.exampleCategoryStore = new InMemoryCategoryStore();
    }

    public async findAll(): Promise<Category[]> {
        return await this.exampleCategoryStore.findAll();
    }

    public async find(sid: number): Promise<Category> {
        return await this.exampleCategoryStore.find(sid);
    }

    public async create(category:Category):Promise<Category>{
        const categorys = await this.exampleCategoryStore.findAll();
        category.catId = categorys.length + 1;
        await this.exampleCategoryStore.insert(category);

        return category;
    }

    public async edit(category:Category, categoryChanged:Category):Promise<Category>{
        categoryChanged.catId = category.catId;
        await this.exampleCategoryStore.update(categoryChanged);

        return categoryChanged;
    }

    public async remove(sid: number): Promise<Category> {
        const category = this.exampleCategoryStore.find(sid);
        await this.exampleCategoryStore.remove(sid);

        return category;
    }
}