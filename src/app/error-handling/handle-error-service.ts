import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

export class HandleErrorService {
  constructor(private toastrService: ToastrService) {}

  // Handling HTTP Errors using Toaster
  public handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = 'Something went wrong!';
    }
    this.toastrService.error(errorMessage);
  }

}
