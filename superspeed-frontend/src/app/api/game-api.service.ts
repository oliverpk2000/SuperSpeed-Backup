import { Injectable } from '@angular/core';
import {Game} from "../objects/game";
import {catchError, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {handleError} from "../publicFunctions";

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  baseUrl: string = "http://localhost:7000/api/superspeed/game/";
  games:Game[] = [];

  constructor(private httpClient: HttpClient) {
    this.updateGameList()
  }

  ngOnInit():void{
    this.updateGameList()
  }

  updateGameList(){
    this.getAllGames().subscribe((res) => {
      this.games = res;
    })
  }

  //########################### api for games ################################
  getAllGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.baseUrl)
      .pipe(catchError(handleError));
  }

  getGame(id: number): Observable<Game> {
    return this.httpClient.get<Game>(this.baseUrl + id)
      .pipe(catchError(handleError));
  }

  //tap uses the function updateGameList
  updateGames(game: Game):Observable<Game> {
    return this.httpClient.put<Game>(this.baseUrl + game.gameId, game)
      .pipe(tap(() => this.updateGameList()), catchError(handleError));
  }

  postGame(game: Game):Observable<Game> {
    return this.httpClient.post<Game>(this.baseUrl, game)
      .pipe(tap(() => this.updateGameList()), catchError(handleError));
  }

  deleteGame(game: Game):Observable<Game> {
    return this.httpClient.delete<Game>(this.baseUrl + game.gameId)
      .pipe(tap(() => this.updateGameList()), catchError(handleError));
  }
}
