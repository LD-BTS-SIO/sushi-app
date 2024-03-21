import { Component } from '@angular/core';
import { Box } from './models/Aliment/Box';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  totalItems: number = 0; // Initialiser le total des items dans le panier à 0
  boxes: Box[] = [ /* Vos données de boîtes */ ];
  title: string = 'Mon application'; // Déclaration et initialisation de la propriété title

  updateTotalItems(change: number) {
    this.totalItems += change; // Mettre à jour le total des items dans le panier
  }
}
