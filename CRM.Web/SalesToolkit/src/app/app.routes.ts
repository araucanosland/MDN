import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'  },
    { path: 'login', loadChildren: 'app/layout/login/login.module#LoginModule' },
    { path: 'ventas', loadChildren: 'app/layout/nifty/nifty.module#NiftyModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
