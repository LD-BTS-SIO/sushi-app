import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../service/panier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalItems: number = 0;

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
    this.panierService.totalItems$.subscribe(total => {
      this.totalItems = total;
    });
  }
}

 