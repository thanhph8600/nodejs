import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'detai-product', component: DetailProductComponent},
    {path: 'list-product', component: ListProductComponent},
    {path: 'login', component: LoginComponent},
    {path: '404-not-found', component: NotFoundComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user', component: UserComponent},
];

