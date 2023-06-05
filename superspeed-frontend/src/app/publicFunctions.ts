import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

/** written by Tobias Sprecher */

export function handleError(error: HttpErrorResponse):Observable<any> {
    if(error.status=== 0) {
      console.error('An erroroccurred:', error.error);
    }
    else{
      console.error(`Backend returnedcode ${error.status}, bodywas: `, error.error);
    }
    return throwError(() => new Error('Something badhappened; pleasetryagainlater.'));
}

