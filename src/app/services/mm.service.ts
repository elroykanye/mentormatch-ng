import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Mentee} from "../models/entity/mentee";
import {Mentor} from "../models/entity/mentor";
import {Observable, throwError} from "rxjs";
import {MENTEE_ENDPOINT_ADD, MENTOR_ENDPOINT_ADD, MENTOR_MATCH_API} from "../models/constants/constants";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MmService {

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  public addMm(mmBody: Mentee | Mentor, role: string): Observable<any> {
    let endpoint: string = role == "mentor" ? MENTOR_ENDPOINT_ADD : MENTEE_ENDPOINT_ADD;
    return this.http.post<any>(
      endpoint,
      JSON.stringify(mmBody),
      this.httpHeader
    ).pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  processError(err: { error: { message: string; }; status: any; message: any; }): Observable<never> {
    let message = "";
    if(err.error instanceof ErrorEvent) {
      message = err.error.message
    } else {
      message = `Error Code: ${err.status}\n Message: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }
}