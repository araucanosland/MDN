import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

//guardias, servicios y enrutamiento
import { AuthGuard } from './guardias/auth.guard';
import { AuthService } from './servicios/auth.service';
import { AppRoutingModule } from './app.routes';

//Componentes
import { AppComponent } from './app.component';



@NgModule({

  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	  RouterModule,
	  AppRoutingModule
  ],
  providers: [
    AuthGuard, 
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
