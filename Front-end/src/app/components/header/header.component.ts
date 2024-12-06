import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private appService : ServiceService) {
    const token =  localStorage.getItem('token')
  }

  ngOnInit(): void {
  }

  logOut(){
    this.appService.doLogout()
  }


}
