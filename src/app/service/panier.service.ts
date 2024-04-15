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
    this._totalItems.next(this.getTotalItems());
  }

  addItem(uneBox: Box, qte: number) {
    let ligne = new Ligne(qte, uneBox);
    let estDansPanier = false
    for (const uneLigne of this.items) {
      if (uneLigne.box.id == uneBox.id) {
        estDansPanier = true
        uneLigne.qte += qte
      }
    }
    if (estDansPanier == false) {
      this.items.push(ligne);
    }

    localStorage.setItem("panier", JSON.stringify(this.items));
    this.updateTotalItems(); // Mettre à jour le nombre total d'articles
  }

  removeOneItem(uneBox: Box) {
    let laLigne: Ligne | undefined
    for (const uneLigne of this.items) {
      if (uneLigne.box.id == uneBox.id) {
        laLigne = uneLigne
        uneLigne.qte--
      }
    }
    if (laLigne && laLigne.qte < 1) {
      let position = this.items.indexOf(laLigne)
      if (position != -1) {
        this.items.splice(position, 1)
      }
    }
    this.updateTotalItems();
    localStorage.setItem("panier", JSON.stringify(this.items));
  }

  removeItem(box: Box) {
    let index = this.items.findIndex(item => item.box.id === box.id);
    if (index !== -1) {

      this.items.splice(index, 1);

      localStorage.setItem("panier", JSON.stringify(this.items));
      this.updateTotalItems(); // Mettre à jour le nombre total d'articles
    }
    localStorage.setItem("panier", JSON.stringify(this.items));
  }

  updateTotalItems() {
    this._totalItems.next(this.getTotalItems());
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
  getTotalItems() {
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

  getQteBox(uneBox: Box):Number {

    //dans une variable ligne recuperer la ligne qui corespond a cette box attention si la ligne 
    // si la ligne est presente alors resultat recupere la valeur de quantite 
    // sinon on la laisse 0

    for (const uneLigne of this.items) {
      if (uneLigne.box.id == uneBox.id) {
        return uneLigne.qte

      }
    }
    return 0
  }
}

