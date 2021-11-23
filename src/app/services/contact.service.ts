import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ContactMessage} from "../models/entity/contact.message";
import {Observable, throwError} from "rxjs";
import {SEND_MESSAGE_ENDPOINT} from "../models/constants/endpoints";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public sendContactEmail(message: ContactMessage): Observable<any> {
    return this.http.post<any>(
      SEND_MESSAGE_ENDPOINT,
      JSON.stringify(message),
      this.httpHeader
    ).pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  processError(err: { error: { message: string; }; status: any; message: any; }): Observable<never> {
    let message: string;
    if(err.error instanceof ErrorEvent) {
      message = err.error.message
    } else {
      message = `Error Code: ${err.status}\n Message: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }
}
