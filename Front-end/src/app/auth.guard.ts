import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {ServiceService} from './service.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(ServiceService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // User is authenticated, allow access
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
