import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { DoLoginComponent } from './dologin.component';
import { LoginRoutingModule } from './login.routes';

@NgModule({
  imports: [
    CommonModule, LoginRoutingModule
  ],
  declarations: [
    LoginComponent, DoLoginComponent
  ]
})
export class LoginModule { }
