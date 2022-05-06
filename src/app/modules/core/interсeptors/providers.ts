import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { CatchErrorInterceptor } from './catch-error.interceptor';
import { HeadersInterceptor } from './headers.interceptor';

export const INTERCEPTOR_PROVIDERS: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchErrorInterceptor,
    multi: true,
  },
  { provide: HTTP_INTERCEPTORS, useClass: CatchErrorInterceptor, multi: true },
];
