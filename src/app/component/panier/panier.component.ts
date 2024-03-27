import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PanierService } from '../../service/panier.service';
import { environment } from '../../../environments/environment.development';
import { Ligne } from '../../models/Aliment/Ligne';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  private _totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalItems$ = this._totalItems.asObservable();
  pathImage = environment.apiGetImages; // Propriété pathImage

  items: Ligne[] = []; // Tableau pour stocker les articles dans le panier

  constructor(private panierService: PanierService) { 

    
  }

  ngOnInit(): void {
    this.items = this.panierService.getItems();
   
  }
  getPrix(): number {
    let resultat = 0;
    for (const uneLigne of this.items) {
      let stotal = uneLigne.box.prix * uneLigne.qte;
      resultat += stotal;
      resultat = Number(resultat.toFixed(2));
    }
    console.log(resultat);
    return resultat;
  }

  viderPanier() {
    this.panierService.viderPanier();
    this.items = [];
    // this.calculateTotalPieces(); // Supprimer cette ligne
    console.log("Panier vidé !");
  }

  getTotalPieces(): number {
    let total = 0;
    for (const uneLigne of this.items) {
      total += uneLigne.qte * uneLigne.box.nbPieces;
    }
    return total;
  }

  // Méthode pour obtenir le nombre total d'articles dans le panier
  getTotalItems() {
    let resultat = 0;
    for (const uneLigne of this.items) {
      resultat += uneLigne.qte;
    }
    return resultat;
  }

  decrementQuantity(item: Ligne) {
    if (item.qte > 1) {
      this.panierService.removeOneItem(item.box)
      // this.calculateTotalPieces(); // Supprimer cette ligne
    
    }
  }

  incrementQuantity(item: Ligne) {

    this.panierService.addItem(item.box,1)
    // this.calculateTotalPieces(); // Supprimer cette ligne
  }

  removeItem(item: Ligne) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
        this.panierService.removeItem(item.box); // Retirer tous les articles de la boîte du panier
        this.items = this.panierService.getItems();
        this.getTotalItems(); // Mettre à jour le nombre total d'articles dans le panier
      }
    }


  
}

 