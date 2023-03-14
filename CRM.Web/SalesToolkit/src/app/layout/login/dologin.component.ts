import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'dologin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class DoLoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public doLogin():void
  {

    console.log("doLogin");
    this.authService.login().subscribe((res:boolean)=>{ 
        this.router.navigate(['ventas']); 
    });
    
  }

}
