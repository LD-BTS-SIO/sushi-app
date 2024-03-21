import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Box } from '../../models/Aliment/Box';
import { PanierService } from '../../service/panier.service';

@Component({
  selector: 'app-card-sushi-box',
  templateUrl: './card-sushi-box.component.html',
  styleUrls: ['./card-sushi-box.component.css']
})
export class CardSushiBoxComponent {
  @Input() box: any;
  @Output() quantityChange = new EventEmitter<number>();
  pathImage = environment.apiGetImages;
  showDetails: boolean = false;

  constructor(private panierService:PanierService ) {}

  add() {
    this.box.quantiteCommande++;
    this.panierService.addItem(this.box,1); // Ajouter l'article au panier
    this.quantityChange.emit(1);
  }

  remove() {
    if (this.box.quantiteCommande > 0) {
      this.box.quantiteCommande--;
      this.panierService.removeItem(this.box); // Retirer l'article du panier
      this.quantityChange.emit(-1);
    }
  }

  enSavoirPlus() {
    this.showDetails = !this.showDetails;
  }
}
