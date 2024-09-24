import { Routes } from '@angular/router';

import { HomeComponent } from "./public/pages/home/home.component";
import { AboutComponent } from "./public/pages/about/about.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { MemberManagementComponent } from "./member/pages/member-management/member-management.component";

export const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'member/members', component: MemberManagementComponent },
  { path: '', redirectTo: 'member/members', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

];
