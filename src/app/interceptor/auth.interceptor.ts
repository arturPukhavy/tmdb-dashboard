import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const apiKey = environment.apiKey;

  // Clone the request to add the new headers
  const clonedRequest = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${apiKey}`,
      'accept': 'application/json',
    }
  });

  // Pass the modified request to the next handler in the chain
  return next(clonedRequest);
};