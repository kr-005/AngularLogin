import { Routes } from '@angular/router';
import { Login } from './login/login';
import{UserCreation} from './user-creation/user-creation';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // 👈 Default route
  { path: 'login', component: Login },
  { path: 'user-creation', component: UserCreation },
];
