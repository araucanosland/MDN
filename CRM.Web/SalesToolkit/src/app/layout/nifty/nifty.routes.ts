import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NiftyComponent } from './nifty.component';
import { VentasComponent } from '../../paginas/ventas/ventas.component';
import { SeguimientoComponent } from '../../paginas/seguimiento/seguimiento.component';
import { AuthGuard } from '../../guardias/auth.guard';

export const routes: Routes = [
    { path: '',
        component: NiftyComponent,
        //canActivate: [AuthGuard],
        children: [
          { path: '',   component: VentasComponent },
          { path: 'seguimiento',   component: SeguimientoComponent }
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NiftyRoutingModule {}