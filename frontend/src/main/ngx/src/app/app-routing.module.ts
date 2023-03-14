import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'ontimize-web-ngx';

export const routes: Routes = [
  {
    path: 'main',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];

const opt = {
  enableTracing: false // true if you want to print navigation routes
};

@NgModule({
  imports: [RouterModule.forRoot(routes, opt)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
