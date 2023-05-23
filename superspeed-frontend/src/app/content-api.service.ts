import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "./objects/category";

@Injectable({
  providedIn: 'root'
})
export class ContentApiService {
  //TODO: add proper url
  baseUrl: string = "localhost:xxxx/superspeed/";

  constructor(private httpClient: HttpClient) {
  }

  //TODO: endpoints for category
  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl + "category/");
  }
  getCategory(id:number): Observable<Category> {
    return this.httpClient.get<Category>(this.baseUrl + "category/" + id)
  }

  updateCategory(category: Category) {
    this.httpClient.put<Category>(this.baseUrl + "category/" + category.catId, category);
  }


  //TODO: endpoints for game
  //TODO: endpoints for runner
  //TODO: endpoints for speedrun
}
