import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "./objects/category";
import {Game} from "./objects/game";
import {Runner} from "./objects/runner";
import {Speedrun} from "./objects/speedrun";

@Injectable({
  providedIn: 'root'
})
export class ContentApiService {
  baseUrl: string = "localhost:7000/superspeed/";

  constructor(private httpClient: HttpClient) {
  }
  //api for categories
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
//api for games
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
  //api for runners
  getAllRunners(): Observable<Runner[]> {
    return this.httpClient.get<Runner[]>(this.baseUrl + "runner/");
  }

  getrunner(id: number): Observable<Runner> {
    return this.httpClient.get<Runner>(this.baseUrl + "runner/" + id)
  }

  updaterunners(runner: Runner) {
    this.httpClient.put<Runner>(this.baseUrl + "runner/" + runner.runnerId, runner);
  }

  postrunner(runner: Runner) {
    this.httpClient.post<Runner>(this.baseUrl + "runner/", runner);
  }

  deleterunner(runner: Runner) {
    this.httpClient.delete<Runner>(this.baseUrl + "runner/" + runner.runnerId)
  }
  //api for speedruns
  getAllSpeedruns(): Observable<Speedrun[]> {
    return this.httpClient.get<Speedrun[]>(this.baseUrl + "speedrun/");
  }

  getSpeedrun(id: number): Observable<Speedrun> {
    return this.httpClient.get<Speedrun>(this.baseUrl + "speedrun/" + id)
  }

  updateSpeedruns(speedrun: Speedrun) {
    this.httpClient.put<Speedrun>(this.baseUrl + "speedrun/" + speedrun.runId, speedrun);
  }

  postSpeedrun(speedrun: Speedrun) {
    this.httpClient.post<Speedrun>(this.baseUrl + "speedrun/", speedrun);
  }

  deleteSpeedrun(speedrun: Speedrun) {
    this.httpClient.delete<Speedrun>(this.baseUrl + "speedrun/" + speedrun.runId)
  }
}
