import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "./objects/category";
import {Game} from "./objects/game";
import {Runner} from "./objects/runner";

@Injectable({
  providedIn: 'root'
})
export class ContentApiService {
  baseUrl: string = "localhost:7000/superspeed/";

  constructor(private httpClient: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl + "category/");
  }

  getCategory(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.baseUrl + "category/" + id)
  }

  updateCategory(category: Category) {
    this.httpClient.put<Category>(this.baseUrl + "category/" + category.catId, category);
  }

  postCategory(category: Category) {
    this.httpClient.post<Category>(this.baseUrl + "category/", category);
  }

  deleteCategory(category: Category) {
    this.httpClient.delete<Category>(this.baseUrl + "category/" + category.catId)
  }

  getAllGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.baseUrl + "game/");
  }

  getGame(id: number): Observable<Game> {
    return this.httpClient.get<Game>(this.baseUrl + "game/" + id)
  }

  updateGames(game: Game) {
    this.httpClient.put<Game>(this.baseUrl + "game/" + game.gameId, game);
  }

  postGame(game: Game) {
    this.httpClient.post<Game>(this.baseUrl + "game/", game);
  }

  deleteGame(game: Game) {
    this.httpClient.delete<Game>(this.baseUrl + "game/" + game.gameId)
  }

  //TODO: endpoints for runner

  getAllRunners(): Observable<Runner[]> {
    return this.httpClient.get<Runner[]>(this.baseUrl + "runner/");
  }

  getrunner(id: number): Observable<Runner> {
    return this.httpClient.get<Runner>(this.baseUrl + "runner/" + id)
  }

  updaterunners(runner: runner) {
    this.httpClient.put<runner>(this.baseUrl + "runner/" + runner.runnerId, runner);
  }

  postrunner(runner: runner) {
    this.httpClient.post<runner>(this.baseUrl + "runner/", runner);
  }

  deleterunner(runner: runner) {
    this.httpClient.delete<runner>(this.baseUrl + "runner/" + runner.runnerId)
  }

  //TODO: endpoints for speedrun
}
