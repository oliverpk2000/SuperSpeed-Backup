import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Category} from "./objects/category";
import {Game} from "./objects/game";
import {Runner} from "./objects/runner";
import {Speedrun} from "./objects/speedrun";

@Injectable({
  providedIn: 'root'
})
export class ContentApiService {
  baseUrl: string = "http://localhost:7000/api/superspeed/";

  constructor(private httpClient: HttpClient) {
  }
  //api for categories
  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl + "category/")
      .pipe(catchError(this.handleError));
  }

  getCategory(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.baseUrl + "category/" + id)
      .pipe(catchError(this.handleError));
  }

  updateCategory(category: Category) {
    this.httpClient.put<Category>(this.baseUrl + "category/" + category.catId, category)
      .pipe(catchError(this.handleError));
  }

  postCategory(category: Category) {
    this.httpClient.post<Category>(this.baseUrl + "category/", category)
      .pipe(catchError(this.handleError));
  }

  deleteCategory(category: Category) {
    this.httpClient.delete<Category>(this.baseUrl + "category/" + category.catId)
      .pipe(catchError(this.handleError));
  }
//api for games
  getAllGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.baseUrl + "game/")
      .pipe(catchError(this.handleError));
  }

  getGame(id: number): Observable<Game> {
    return this.httpClient.get<Game>(this.baseUrl + "game/" + id)
      .pipe(catchError(this.handleError));
  }

  updateGames(game: Game) {
    this.httpClient.put<Game>(this.baseUrl + "game/" + game.gameId, game)
      .pipe(catchError(this.handleError));
  }

  postGame(game: Game) {
    this.httpClient.post<Game>(this.baseUrl + "game/", game)
      .pipe(catchError(this.handleError));
  }

  deleteGame(game: Game) {
    this.httpClient.delete<Game>(this.baseUrl + "game/" + game.gameId)
      .pipe(catchError(this.handleError));
  }
  //api for runners
  getAllRunners(): Observable<Runner[]> {
    return this.httpClient.get<Runner[]>(this.baseUrl + "runner/")
      .pipe(catchError(this.handleError));
  }

  getrunner(id: number): Observable<Runner> {
    return this.httpClient.get<Runner>(this.baseUrl + "runner/" + id)
      .pipe(catchError(this.handleError));
  }

  updaterunners(runner: Runner) {
    this.httpClient.put<Runner>(this.baseUrl + "runner/" + runner.runnerId, runner)
      .pipe(catchError(this.handleError));
  }

  postrunner(runner: Runner) {
    this.httpClient.post<Runner>(this.baseUrl + "runner/", runner)
      .pipe(catchError(this.handleError));
  }

  deleterunner(runner: Runner) {
    this.httpClient.delete<Runner>(this.baseUrl + "runner/" + runner.runnerId)
      .pipe(catchError(this.handleError));
  }
  //api for speedruns
  getAllSpeedruns(): Observable<Speedrun[]> {
    return this.httpClient.get<Speedrun[]>(this.baseUrl + "speedrun/")
      .pipe(catchError(this.handleError));
  }

  getSpeedrun(id: number): Observable<Speedrun> {
    return this.httpClient.get<Speedrun>(this.baseUrl + "speedrun/" + id)
      .pipe(catchError(this.handleError));
  }

  updateSpeedruns(speedrun: Speedrun) {
    this.httpClient.put<Speedrun>(this.baseUrl + "speedrun/" + speedrun.runId, speedrun)
      .pipe(catchError(this.handleError));
  }

  postSpeedrun(speedrun: Speedrun) {
    this.httpClient.post<Speedrun>(this.baseUrl + "speedrun/", speedrun)
      .pipe(catchError(this.handleError));
  }

  deleteSpeedrun(speedrun: Speedrun) {
    this.httpClient.delete<Speedrun>(this.baseUrl + "speedrun/" + speedrun.runId)
      .pipe(catchError(this.handleError));
  }
//error handling
  private handleError(error: HttpErrorResponse):Observable<any> {
    if(error.status=== 0) {
      console.error('An erroroccurred:', error.error);
    }
    else{
      console.error(`Backend returnedcode ${error.status}, bodywas: `, error.error);
    }
    return throwError(() => new Error('Something badhappened; pleasetryagainlater.'));
  }
}
