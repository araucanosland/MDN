import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NiftyComponent } from './nifty.component';
import { VentasComponent } from '../../paginas/ventas/ventas.component';
import { SeguimientoComponent } from '../../paginas/seguimiento/seguimiento.component';
import { NiftyRoutingModule } from './nifty.routes';

@NgModule({
  imports: [
    CommonModule, NiftyRoutingModule
  ],
  declarations: [NiftyComponent, VentasComponent, SeguimientoComponent]
})
export class NiftyModule { }
