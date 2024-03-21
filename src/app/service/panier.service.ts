import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ligne } from '../models/Aliment/Ligne';
import { Box } from '../models/Aliment/Box';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private _totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalItems$ = this._totalItems.asObservable();

  items: Array<Ligne> = []; // Tableau pour stocker les articles dans le panier

  constructor() { 
    this.items = JSON.parse(localStorage.getItem("panier") ?? "[]");
    this.updateTotalItems(); // Mettre à jour le nombre total d'articles au démarrage
    this._totalItems.next(this.getTotalItmes());
  }

  addItem(uneBox: Box, qte: number) {
    let ligne = new Ligne(qte, uneBox);
    let estDansPanier=false
    for (const uneLigne of this.items) {
      if(uneLigne.box.id == uneBox.id){
        estDansPanier=true
        uneLigne.qte+=qte
      }
    }
    if(estDansPanier==false){
      this.items.push(ligne);
    }
 
    localStorage.setItem("panier", JSON.stringify(this.items));
    this.updateTotalItems(); // Mettre à jour le nombre total d'articles
  }
  
  removeItem(box: Box) {
    let index = this.items.findIndex(item => item.box.id === box.id);
    if (index !== -1) {
      if (this.items[index].qte === 1) {
        this.items.splice(index, 1);
      } else {
        this.items[index].qte--;
      }
      localStorage.setItem("panier", JSON.stringify(this.items));
      this.updateTotalItems(); // Mettre à jour le nombre total d'articles
    }
  }
  
  updateTotalItems() {
    this._totalItems.next(this.getTotalItmes());
  }
  
  
  // Méthode pour vider complètement le panier
  clearCart() {
    this.items = [];
    localStorage.setItem("panier", JSON.stringify(this.items));
    this._totalItems.next(0); // Émettre la mise à jour du nombre total d'articles
  }

  // Méthode pour récupérer les articles du panier
  getItems() {
    return this.items;
  }

  // Méthode pour obtenir le nombre total d'articles dans le panier
  getTotalItmes() {
    let resultat = 0;
    for (const uneLigne of this.items) {
      resultat += uneLigne.qte;
    }
    return resultat;
  }

  // Méthode pour vider le panier
  viderPanier() {
    this.items = [];
    localStorage.setItem("panier", JSON.stringify(this.items)); // Sauvegarde des données mises à jour
    this._totalItems.next(0); // Émettre la mise à jour du nombre total d'articles
  }
}
