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
  totalItems: number = 0; // Initialisation de totalItems à 0

  constructor(private panierService: PanierService) {}

  add() {
    this.box.quantiteCommande++;
    this.panierService.addItem(this.box, 1); // Ajouter l'article au panier
    this.updateTotalItems(); // Mettre à jour totalItems
  }

  remove() {
    if (this.box.quantiteCommande > 0) {
      this.box.quantiteCommande--;
      this.panierService.removeOneItem(this.box); // Retirer l'article du panier
      this.updateTotalItems(); // Mettre à jour totalItems
    }
  }

  enSavoirPlus() {
    this.showDetails = !this.showDetails;
  }

  public updateTotalItems() {
    this.totalItems = this.panierService.getTotalItems(); // Mettre à jour totalItems en récupérant la valeur depuis le service de panier
    this.quantityChange.emit(this.totalItems); // Émettre l'événement quantityChange avec la nouvelle valeur de totalItems
  }

  getQte(){
   return  this.panierService.getQteBox(this.box)
  }

}
