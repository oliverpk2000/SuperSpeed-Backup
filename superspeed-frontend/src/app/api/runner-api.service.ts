import { Injectable } from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {Runner} from "../objects/runner";
import {handleError} from "../publicFunctions";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RunnerApiService {
  baseUrl: string = "http://localhost:7000/api/superspeed/runner/";
  runners:Runner[] = []

  constructor(private httpClient: HttpClient) {
    this.updateRunnerList()
  }

  updateRunnerList(){
    this.getAllRunners().subscribe((res)=>{
      this.runners = res;
    })
  }


  //########################## api for runners #################################
  getAllRunners(): Observable<Runner[]> {
    return this.httpClient.get<Runner[]>(this.baseUrl)
      .pipe(catchError(handleError));
  }

  getrunner(id: number): Observable<Runner> {
    return this.httpClient.get<Runner>(this.baseUrl + id)
      .pipe(catchError(handleError));
  }

  updaterunner(runner: Runner): Observable<Runner> {
    return this.httpClient.put<Runner>(this.baseUrl + runner.runnerId, runner)
      .pipe(tap(() => this.updateRunnerList()), catchError(handleError));
  }

  postrunner(runner: Runner):Observable<Runner> {
    return this.httpClient.post<Runner>(this.baseUrl, runner)
      .pipe(tap(() => this.updateRunnerList()), catchError(handleError));
  }

  deleterunner(runner: Runner):Observable<Runner> {
    return this.httpClient.delete<Runner>(this.baseUrl + runner.runnerId)
      .pipe(tap(() => this.updateRunnerList()), catchError(handleError));
  }
}
