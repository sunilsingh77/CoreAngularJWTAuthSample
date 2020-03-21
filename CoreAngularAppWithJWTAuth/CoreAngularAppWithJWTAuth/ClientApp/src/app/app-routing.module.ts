import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: '', component: HomeComponent, pathMatch: 'full'},
    { path: 'counter', component: CounterComponent},
    { path: 'fetch-data', component: FetchDataComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: 'products', loadChildren: './products/products.module#ProductsModule' },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
