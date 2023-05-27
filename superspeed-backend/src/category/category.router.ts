import {CategoryService} from "./category.service";
import {Category} from "./category";
import {Router} from "express";

export class CategoryRouter {
    private readonly categoryService:CategoryService;
    private readonly _router:Router;

    constructor() {
        this.categoryService = new CategoryService();
        this._router = Router();

        this.router.get("/", async (req, res) => {
            const categorys: Category[] = await this.categoryService.findAll();
            res.status(200).send(categorys);
        });

        this.router.get("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const category: Category = await this.categoryService.find(sid);

            if (category) {
                return res.status(200).send(category);
            }
            res.status(404).send("item not found");
        });

        this.router.post("/", async (req, res) => {
            const category: Category = req.body;

            if (category.catName == undefined || category.catName.trim() == "") {
                res.status(404).json("not correct format")
            } else {
                const newCategory = await this.categoryService.create(category);
                res.status(201).json(newCategory);
            }
        });

        this.router.post("/bulk", async (req, res) => {
            const categorys: Category[] = req.body;
            const valid: Category[] = [];

            for (let i = 0; i < categorys.length; i++) {
                if (categorys[i].catName == undefined || categorys[i].catName.trim() == "") {
                    res.status(404).json("not correct format")
                } else {
                    let category: Category = await this.categoryService.create(categorys[i]);
                    valid.push(category)
                }
            }
            res.status(201).json(valid);
        });

        this.router.put("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const categoryChanged: Category = req.body;
            const category: Category = await this.categoryService.find(sid);

            if (categoryChanged.catName == undefined || categoryChanged.catName.trim() == "") {
                res.status(404).json("not correct format")
            } else {
                const edit = await this.categoryService.edit(category, categoryChanged);
                res.status(201).json(edit);
            }
        });

        this.router.delete("/:sid", async (req, res) => {
            const sid: number = parseInt(req.params.sid, 10);
            const remove = await this.categoryService.remove(sid);
            res.status(201).json(remove);
        });
    }

    public get router():Router{
        return this._router;
    }
}