import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Category} from "../objects/category";
import {Game} from "../objects/game";
import {Runner} from "../objects/runner";
import {Speedrun} from "../objects/speedrun";
import {handleError} from "../publicFunctions";

@Injectable({
  providedIn: 'root'
})
export class SpeedrunApiService {
  baseUrl: string = "http://localhost:7000/api/superspeed/speedrun/";
  speedruns:Speedrun[] = []

  constructor(private httpClient: HttpClient) {
    this.updateSpeedrunList();
  }

  updateSpeedrunList(){
    this.getAllSpeedruns().subscribe((res)=>{
      this.speedruns = res;
    })
  }

  //############################## api for speedruns #####################################
  getAllSpeedruns(): Observable<Speedrun[]> {
    return this.httpClient.get<Speedrun[]>(this.baseUrl)
      .pipe(catchError(handleError));
  }

  getSpeedrun(id: number): Observable<Speedrun> {
    return this.httpClient.get<Speedrun>(this.baseUrl + id)
      .pipe(catchError(handleError));
  }

  getAllSpeedrunsWithGameId(id: number): Observable<Speedrun[]> {
    return this.httpClient.get<Speedrun>(this.baseUrl+"game/"+id)
      .pipe(catchError(handleError));
  }

  updateSpeedruns(speedrun: Speedrun):Observable<Speedrun> {
    return this.httpClient.put<Speedrun>(this.baseUrl + speedrun.runId, speedrun)
      .pipe(tap(() => this.updateSpeedrunList()), catchError(handleError));
  }

  postSpeedrun(speedrun: Speedrun):Observable<Speedrun> {
    return this.httpClient.post<Speedrun>(this.baseUrl, speedrun)
      .pipe(tap(() => this.updateSpeedrunList()), catchError(handleError));
  }

  deleteSpeedrun(speedrun: Speedrun):Observable<Speedrun> {
    return this.httpClient.delete<Speedrun>(this.baseUrl + speedrun.runId)
      .pipe(tap(() => this.updateSpeedrunList()), catchError(handleError));
  }
}
