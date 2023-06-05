import { Injectable } from '@angular/core';
import {Category} from "../objects/category";
import {catchError, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {handleError} from "../publicFunctions";

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {
  baseUrl: string = "http://localhost:7000/api/superspeed/category";
  categories:Category[] = [];

  constructor(private httpClient: HttpClient) {
    this.updateCategoryList()
  }

  ngOnInit():void{
    this.updateCategoryList()
  }

  updateCategoryList(){
    this.getAllCategorys().subscribe((res) => {
      this.categories = res;
    })
  }

  //########################### api for categories ################################
  getAllCategorys(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl)
      .pipe(catchError(handleError));
  }

  getCategory(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.baseUrl + id)
      .pipe(catchError(handleError));
  }

  //tap uses the function updateCategoryList
  updateCategorys(category: Category):Observable<Category> {
    return this.httpClient.put<Category>(this.baseUrl + category.catId, category)
      .pipe(tap(() => this.updateCategoryList()), catchError(handleError));
  }

  postCategory(category: Category):Observable<Category> {
    return this.httpClient.post<Category>(this.baseUrl, category)
      .pipe(tap(() => this.updateCategoryList()), catchError(handleError));
  }

  deleteCategory(category: Category):Observable<Category> {
    return this.httpClient.delete<Category>(this.baseUrl + category.catId)
      .pipe(tap(() => this.updateCategoryList()), catchError(handleError));
  }
}
