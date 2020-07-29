import { Injectable, ErrorHandler } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  alertMessage: any;

  constructor(private errorHandler: ErrorHandler) { }
  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(request).pipe(retry(1),
      catchError((error: HttpErrorResponse) => {
        debugger;
        let errorMessage = '';
        if (error.statusText) {         
          alert(error.statusText);
          return;
        }
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
              var reader = new FileReader();
         
          reader.readAsText(error.error);

          reader.addEventListener('loadend', (e) => {
            debugger;
            this.alertMessage = reader.result;
            alert(JSON.parse(this.alertMessage).error);
            //console.log(text);
          });
          
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(this.alertMessage);
      })
    )
  }

  
}
