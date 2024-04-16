== Compte rendu final du fichier Sushi-app
=== (DARRAS Loïc BTS SIO 22)
=== lien github : https://github.com/loicD77/sushi-app

:figure-caption!:

== I) Création du composant *"card-sushi-box"* :
Pour correspondre du mieux possible aux critères demandés par le projet, j'ai créé un premier component intitulé *"card-sushi-box"* grâce à la commande :  
[source,lang]
----
ng g component component/card-sushi-box
----

Ceci nous a permis de creer quatres fichiers dans un dossier (.css, .ts, .html, .spec.ts) ayant un même nom : *"card-sushi-box"*

====
image::assets/img/quatre.png[width=500, title="Création des 4 fichiers dû à la commande", alt=""]
====


Ce composant a pour rôle de gérer la présentation d’une box.


=== a) card-sushi-box.component.html

Ce fichier contient le *modèle HTML (la vue)* associé au *composant CardSushiBoxComponent*. Il définit la structure et le contenu visuel du composant. 

[source,html]
----
<div style="margin-bottom: 2em;">
    <div class="card-sushi-box-name">{{ box.nom }}</div>
    <img class="card-img-top" src="{{ pathImage }}/{{ box.image }}" alt="{{ box.nom }}" style="width: 20em; margin-bottom: 0.5em;">
    <ul style="font-weight: normal; font-size: normal; list-style-type: none;">
        <li style="margin-top: 0.5em;">Nombre de pièces : {{ box.nbPieces }}</li>
        <li style="margin-top: 0.5em;" *ngIf="showDetails">Saveurs :</li>
        <ul *ngIf="showDetails">
            <li *ngFor="let saveur of box.saveurs">{{ saveur }}</li>
        </ul>
        <li style="margin-top: 0.5em;">Prix : {{ box.prix }}€</li>
        <li style="margin-top: 0.5em;" *ngIf="showDetails">Aliments :</li>
        <ul *ngIf="showDetails">
            <li *ngFor="let aliment of box.aliments"> {{ aliment.quantite }} x {{ aliment.nom }}</li>
        </ul>
        <li style="margin-top: 0.5em; font-size: 1.2em;">Quantité dans le panier : {{ getQte() }}</li>
    </ul>
    <!-- Bouton En savoir plus -->
    <button (click)="enSavoirPlus()" class="button-blue">En savoir plus </button>
    <!-- Boutons d'ajout et de suppression -->
    <div>
        <button (click)="add()" class="button-green">Ajouter</button>
        <button (click)="remove()" class="button-red" style="margin-left: 10px;">Supprimer</button>
    </div>
</div>
----



* Nous avons des éléments `HTML` qui composent le composant (comme les balises *<div>*, *<ul>*, *<li>*, *<button>*).
* *Bindings ({{}})*: Utilise des interpolations `({{ expression }})` pour afficher dynamiquement des données du composant, comme *box.nom*, *box.nbPieces*, etc...
* Directives Angular (**ngIf*,* *ngFor*) : Contrôle l'affichage conditionnel (*ngIf) et les boucles (*ngFor) dans le HTML en fonction des états du composant (showDetails, listes de saveurs et d'aliments).
* Gestion des événements (`(click)`) : Associe des actions aux événements HTML comme le clic sur des boutons ((click)="enSavoirPlus()").


=== b) card-sushi-box.component.css
Ce fichier contient les styles CSS spécifiques au composant CardSushiBoxComponent. Il contrôle l'apparence visuelle du composant.


[source,html]
----
/* Styles généraux */
body {
    font-family: Arial, sans-serif; /* Police de caractères par défaut */
    background-color: blue/* Couleur de fond */
}

.container {
    max-width: 1200px; /* Largeur maximale du contenu */
    margin: 0 auto; /* Centrage horizontal */
    padding: 20px; /* Espacement intérieur */
}

.card-sushi-box-name {
    background-color: black; /* Fond noir */
    color: red; /* Police rouge */
    padding: 5px 10px; /* Espacement intérieur */
    border-radius: 5px; /* Coins arrondis */
}


/* Styles pour les cartes sushi */
.card-sushi {
    background-color: #fff; /* Fond des cartes sushi */
    border-radius: 10px; /* Coins arrondis */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre */
    padding: 20px; /* Espacement intérieur */
    margin-bottom: 20px; /* Espacement entre les cartes */
}

.card-sushi img {
    width: 100%; /* Image à largeur maximale */
    border-radius: 10px; /* Coins arrondis */
    margin-bottom: 10px; /* Espacement sous l'image */
}

.card-sushi ul {
    padding: 0; /* Supprime les marges par défaut */
    list-style-type: none; /* Supprime les puces */
}

.card-sushi li {
    margin-top: 5px; /* Espacement entre les éléments de la liste */
}

.card-sushi ul {
    padding: 0; /* Supprime les marges par défaut */
    list-style-type: none; /* Supprime les puces */
}

/* Pour masquer les détails au départ */
.card-sushi ul {
    display: none;
}

/* Styles pour les boutons */
.button {
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.button-green {
    background-color: #4CAF50; /* Vert */
    color: white;
}

.button-red {
    background-color: #f44336; /* Rouge */
    color: white;
}

.button:hover {
    opacity: 0.8;
}

.button:focus {
    outline: none;
}


----



Ce fichier définit des styles généraux pour tout le document, comme *la police (font-family)*, la *couleur de fond du corps (body)*, etc... Il mets en place les  styles CSS spécifiques aux éléments HTML du composant, comme *les cartes sushi (card-sushi)*, *le nom de la boîte (card-sushi-box-name)*, *les boutons (button)*, etc.



===  c) card-sushi-box.component.spec.ts
Ce fichier est le fichier de spécification *(unit tests)* pour tester le composant CardSushiBoxComponent.

[source,html]
----
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSushiBoxComponent } from './card-sushi-box.component';

describe('CardSushiBoxComponent', () => {
  let component: CardSushiBoxComponent;
  let fixture: ComponentFixture<CardSushiBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSushiBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSushiBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

----



Ce dernier importe les dépendances nécessaires pour *les tests unitaires*, comme *ComponentFixture*, *TestBed*, etc...
Ici on utilise *Jasmine (framework de test)* pour définir les tests pour le composant, par exemple, *le test should create* vérifie si le composant est créé avec succès.
On utilise *TestBed.configureTestingModule* pour configurer le module de test avec les déclarations nécessaires *(declarations: [CardSushiBoxComponent]*).


=== d) card-sushi-box.component.ts
Ce fichier est la classe TypeScript du composant CardSushiBoxComponent.


[source,html]
----


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
----
J'utilise *le décorateur @Component pour définir le sélecteur (selector), le modèle HTML (templateUrl), et les styles CSS (styleUrls) associés au composant.*
J'ai mis en place la logique métier du composant, comme *l'ajout/suppression d'un article au panier (add(), remove())*, *le basculement de l'état pour afficher/masquer les détails (enSavoirPlus())*, *la récupération de la quantité dans le panier (getQte())*, etc.
J'ai définis les propriétés d'entrée *(@Input() box: any)* et de sortie *(@Output() quantityChange)* du composant pour interagir avec d'autres composants.

=== e) Points communs entre les différents fichiers du composant :

* *Les fichiers TypeScript (.ts) et les fichiers de test (.spec.ts)* dépendent de Angular et Jasmine pour les tests unitaires.
* J'utilise des propriétés d'entrée *(@Input())* pour recevoir des données et des événements de sortie *(@Output())* pour émettre des événements vers d'autres composants.
* J'interagis avec le service PanierService pour gérer les opérations liées au panier (ajout, suppression d'articles).

Je peux conclure que chaque fichier remplit un rôle spécifique dans le développement d'un composant Angular bien structuré, en séparant clairement les préoccupations (modèle, vue, style, tests, logique métier) pour assurer la maintenabilité, la lisibilité et la testabilité du code.

== II) Création du composant 
*"container-card-sushi-boxes "* :

Ici ce deuxième composant a pour objectif de prendre en charge la génération des objets Boxe de notre application et d'invoquer avec une directive **ngFor* l’affichage de toutes les boxes dans son
template.

J'ai utilisé la commande

[source,lang]
----
ng g component component/container-card-sushi-boxes
----


====
image::assets/img/quatreb.png[width=500, title="Création des 4 fichiers dû à la commande", alt=""]
====

=== a) Container-card-sushi-boxes.component.html
Ce fichier contient *le modèle HTML (la vue)* associé au *composant ContainerCardSushiBoxesComponent*. Voici ses caractéristiques .


[source,lang]
----
<body>
    <!-- La boucle *ngFor ne se répète pas ici -->
    <div class="box-container">
        <div class="menu-row" *ngFor="let box of boxes | keyvalue; let i = index;">
            <div class="menu-box"> <!-- Modification de la classe ici -->
                <app-card-sushi-box [box]="box.value"></app-card-sushi-box>
            </div>
            <!-- Ajoute une ligne vide après chaque groupe de 3 menus -->
            <div *ngIf="(i + 1) % 3 === 0" class="clearfix"></div>
        </div>
    </div>
</body>

----

* Ici, *j'ai définis la structure visuelle du composant*, en utilisant *des directives Angular comme *ngFor pour itérer sur une liste de boîtes (boxes)* et afficher chaque boîte dans une div avec la classe menu-box.
* J'utilise des *interpolations ({{}})* pour afficher dynamiquement des données du composant, telles que *box.value*.
Aucun événement n'est géré directement dans ce fichier HTML, mais il inclut des directives Angular pour manipuler le *DOM* en fonction des données du composant.

=== b) container-card-sushi-boxes.component.css
Ce fichier contient les styles CSS spécifiques au composant ContainerCardSushiBoxesComponent. Voici ses caractéristiques :


[source,lang]
----

body {
    background-color: blueviolet; /* Couleur de fond du corps */
}

.box-container {
    background-color: blueviolet; /* Couleur de fond du conteneur */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; /* Espacement égal entre les lignes de cartes */
    padding: 20px; /* Ajoutez un peu de marge intérieure pour l'espace autour des cartes */
}

.menu-box {
    flex-basis: calc(33.33% - 20px); /* Largeur de chaque carte sushi */
    margin-bottom: 20px; /* Espacement entre les lignes de cartes */
    padding: 20px; /* Espacement intérieur de la carte */
    background-color: white; /* Couleur de fond de la carte */
    border: 2px solid orange; /* Bordure de la carte */
    border-radius: 10px; /* Bordure arrondie */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre de la carte */
    transition: transform 0.3s ease; /* Animation de transition */
}

.menu-box:hover {
    transform: translateY(-5px); /* Animation de léger soulèvement au survol */
}

/* Pour supprimer la bordure droite du dernier élément de chaque ligne */
.menu-box:nth-child(3n) {
    margin-right: 0; /* Supprimer l'espacement à droite */
}

----
* Ce fichier définit des styles globaux pour *le corps (body) et le conteneur principal (box-container)*, notamment la couleur de fond et le mode de disposition *(display: flex)*.
* Il définit aussi les styles pour chaque boîte sushi *(menu-box)*, y compris la mise en page (flex-basis, margin-bottom), la couleur de fond, la bordure, l'ombre et les transitions d'animation.


=== c) container-card-sushi-boxes.component.spec.ts
Ce fichier est le fichier de spécification *(unit tests)* pour tester le composant ContainerCardSushiBoxesComponent. Voici ses caractéristiques :


[source,lang]
----
body {
    background-color: blueviolet; /* Couleur de fond du corps */
}

.box-container {
    background-color: blueviolet; /* Couleur de fond du conteneur */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; /* Espacement égal entre les lignes de cartes */
    padding: 20px; /* Ajoutez un peu de marge intérieure pour l'espace autour des cartes */
}

.menu-box {
    flex-basis: calc(33.33% - 20px); /* Largeur de chaque carte sushi */
    margin-bottom: 20px; /* Espacement entre les lignes de cartes */
    padding: 20px; /* Espacement intérieur de la carte */
    background-color: white; /* Couleur de fond de la carte */
    border: 2px solid orange; /* Bordure de la carte */
    border-radius: 10px; /* Bordure arrondie */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre de la carte */
    transition: transform 0.3s ease; /* Animation de transition */
}

.menu-box:hover {
    transform: translateY(-5px); /* Animation de léger soulèvement au survol */
}

/* Pour supprimer la bordure droite du dernier élément de chaque ligne */
.menu-box:nth-child(3n) {
    margin-right: 0; /* Supprimer l'espacement à droite */
}


----

* Ce fichier importe les dépendances nécessaires pour les tests unitaires, comme *ComponentFixture, TestBed, etc.*
* Il utilise aussi Jasmine (framework de test) pour définir les tests pour le composant, par exemple, le test should create vérifie si le composant est créé avec succès.
* Il utilise *TestBed.configureTestingModule* pour configurer le module de test avec les déclarations nécessaires (declarations: [ContainerCardSushiBoxesComponent]).

=== d)  container-card-sushi-boxes.component.ts
Ce fichier est la classe TypeScript du composant ContainerCardSushiBoxesComponent. Voici ses caractéristiques :

[source,lang]
----
import { Component } from '@angular/core';


import { environment } from '../../../environments/environment';
import { ApiSushiService } from '../../service/api-sush.service';
import { Box } from '../../models/Aliment/Box';
import { Aliment } from '../../models/Aliment/Aliment';
@Component({
    selector: 'app-container-card-sushi-boxes',
    templateUrl: './container-card-sushi-boxes.component.html',
    styleUrl: './container-card-sushi-boxes.component.css'
})
export class ContainerCardSushiBoxesComponent {
    boxes: Map<number, Box>;
    pathImage = environment.apiGetImages;
    constructor(private apiSushiService: ApiSushiService) {
        this.boxes = new Map;
    }
    ngOnInit(): void {
        this.getBoxes();
    }
    getBoxes(): void {
        // La méthode va récupérer une collection de boxes de l'API
        this.apiSushiService.getBoxes().subscribe((res: any) => {
            // Boucle itérant sur chaque objet de l'API pour instancier et valoriser
            // les boxes de l'application :
            for (let boxApi of res) {
                let box: Box = new Box();
                box.id = boxApi.id;
                box.nom = boxApi.nom;
                box.nbPieces = boxApi.pieces;
                box.prix = boxApi.prix.toFixed(2);
                box.image = boxApi.image;
                box.saveurs = boxApi.saveurs;
                let listeAliments: Aliment[] = [];
                for (let alimentApi of boxApi.aliments) {
                    let aliment = new Aliment(alimentApi.nom, alimentApi.quantite);
                    listeAliments.push(aliment);
                }
                box.aliments = listeAliments;
                this.boxes.set(boxApi.id, box);
            }
        });
    }
}
----
* Avec ce fichier, *j'utilise le décorateur @Component pour définir le sélecteur (selector), le modèle HTML (templateUrl), et les styles CSS (styleUrl) associés au composant.*
* Il contient la logique métier du composant, comme la récupération des données des boîtes à partir d'un service (getBoxes()), l'initialisation des données dans ngOnInit(), et la gestion des données dans la variable boxes.
* Ce fichier interagit avec le service ApiSushiService pour récupérer les données des boîtes à afficher dans le composant.


=== Points communs :
* Les fichiers TypeScript (*.ts) et les fichiers de test (*.spec.ts) dépendent de Angular et Jasmine pour les tests unitaires.
* Ils utilisent des services Angular (ApiSushiService) pour récupérer et manipuler les données à afficher dans le composant.
* Ils respectent le principe de séparation des préoccupations, où le fichier HTML définit la vue, le fichier CSS définit les styles, et le fichier TypeScript définit la logique métier du composant.
Chaque fichier contribue à la construction d'un composant Angular bien organisé, en séparant clairement les aspects de la vue, des styles et de la logique métier, ce qui favorise la maintenabilité et la réutilisabilité du code.







== III) Création du composant *"footer "* :

Ce troisième composant prend en charge l’affichage du pied de page de mon application web.

Nous avons utiliser la commande

[source,lang]
----
ng g component component/footer

----

====
image::assets/img/footer.png[width=500, title="Création des 4 fichiers dû à la commande", alt=""]
====

=== a) footer.component.html

* Le fichier HTML définit la structure visuelle et le contenu du composant Footer. Voici ce qu'il contient :

** Liens et Textes : *Utilisation d'éléments <a>* pour les liens vers la page de *"Mentions légales et RGPD"* avec un style de survol spécifique *(politique:hover)*.
** Informations de pied de page : Affichage du *nom de l'application*, de *l'auteur* et des détails liés au développement de l'application Angular.

=== b) footer.component.css
* Le fichier CSS définit les styles visuels appliqués au composant Footer. Voici ses caractéristiques :

** Couleurs et Mises en Forme : Utilisation d'une palette de couleurs contrastées avec un fond noir (background-color: black) et du texte en blanc (color: white).
** Styles spécifiques : Le style pour la section "Mentions légales et RGPD" avec une couleur et un effet de survol (politique:hover).

=== c) footer.component.spec.ts
* Le fichier de spécifications (tests unitaires) pour le composant Footer. Voici ce qu'il fait :

** Importations et Configuration : Importe les dépendances nécessaires pour les tests unitaires Angular.
** Test de Création : Comprend un test (should create) pour vérifier que le composant Footer est créé avec succès.

=== d) footer.component.ts

* Le fichier TypeScript définit la logique métier et le comportement du composant Footer. Voici ses caractéristiques :

** Définition du Composant : Utilisation du décorateur @Component pour définir le sélecteur (selector), le modèle HTML (templateUrl), et les styles CSS (styleUrl) associés au composant Footer.
** Déclarations : Définit la classe FooterComponent qui peut contenir des méthodes et des propriétés pour manipuler le comportement du composant (bien que ce soit vide dans cet exemple).




== Points Communs :
* Séparation des Préoccupations : Respecte le principe de séparation des préoccupations en définissant clairement les aspects de la vue, des styles et de la logique métier du composant.
* Utilisation de Technologies Angular : Intègre des fonctionnalités Angular telles que le routage (routerLink) pour la navigation et l'interpolation ({{}}) pour l'affichage dynamique des données.
* Style et Accessibilité : Utilise des styles CSS pour améliorer l'esthétique et l'accessibilité du composant, par exemple, en changeant la couleur et en ajoutant des effets de survol.
* 

Ce composant Footer démontre une bonne pratique de développement Angular, en fournissant une structure claire et modulaire pour gérer les éléments de pied de page d'une application web. La combinaison d'HTML, de CSS, de TypeScript et de tests unitaires montre une approche complète pour concevoir des composants robustes et bien conçus dans le cadre d'une application Angular
.

== IV) Création du composant *"header"* :

Ce composant prend en charge l’affichage de l’entête de mon application web


Nous avons utiliser la commande

[source,lang]
----
ng g component component/header

----

====
image::assets/img/header.png[width=500, title="Création des 4 fichiers dû à la commande", alt=""]
====


=== a) header.component.html
* Le fichier HTML définit la structure visuelle et le contenu du composant Header. Voici ses éléments distinctifs :

** Navigation : Utilisation de balises <nav> pour encapsuler la barre de navigation principale.
Logo et Titre : Affichage du logo et du titre de l'application (SushiApp), avec un lien vers la page d'accueil (routerLink="/" routerLinkActive="active").
** Liens de Navigation : Utilisation d'une liste <ul> avec des <li> pour les liens de navigation vers différentes pages de l'application (routerLink="", routerLink="politique").
** Affichage du Panier : Affichage dynamique du nombre d'articles dans le panier avec une icône japonaise (<img>), lié au service PanierService via totalItems.

=== b) header.component.css
* Le fichier CSS définit les styles visuels appliqués au composant Header. Voici ses points forts :

** Fond et Couleurs : Utilisation d'un arrière-plan avec une image (background-image: url("/sushi-app/assets/img/red.jpg")) et des couleurs contrastées pour les éléments de navigation.
** Mise en Forme : Utilisation de classes CSS Bootstrap pour la mise en page (d-flex, align-items-center, justify-content-center, etc.).
** Effets de Survols : Définition d'effets de survol pour les liens de navigation (nav-link:hover).

=== c) header.component.spec.ts
* Le fichier de spécifications (tests unitaires) pour le composant Header. Voici ses caractéristiques :

** Importations et Configuration : Importe les dépendances nécessaires pour les tests unitaires Angular.
** Test de Création : Vérifie que le composant Header est créé avec succès lors de l'initialisation du test.
=== d) header.component.ts
Le fichier TypeScript définit la logique métier et le comportement du composant Header. Voici ses aspects notables :

** Gestion des Données Dynamiques : Utilisation du service PanierService pour récupérer et afficher dynamiquement le nombre d'articles dans le panier (totalItems).
** Cycle de Vie du Composant : Implémentation de OnInit pour initialiser le composant et souscrire aux changements du nombre d'articles dans le panier.

=== e) Points Communs :
* Séparation des Préoccupations : Le fichier HTML définit la structure, le fichier CSS définit le style, le fichier TypeScript définit la logique métier, et le fichier de spécifications définit les tests unitaires.
* Utilisation de Frameworks et Librairies : Intégration de Bootstrap pour des styles réactifs et de jQuery pour des fonctionnalités supplémentaires (scripts externes).
* Gestion des Événements et Données : Utilisation de Angular pour la navigation (routerLink), l'interpolation ({{}}) et la liaison de données bidirectionnelle (ngModel).

Ce composant Header démontre une implémentation complète et bien structurée d'un en-tête d'application Angular, en utilisant des pratiques modernes de développement web et des fonctionnalités avancées du framework Angular pour améliorer l'expérience utilisateur. Chaque aspect du composant est soigneusement conçu pour être modulaire, réutilisable et facile à tester.


== V) Création du composant *"panier"* :

Nous avons utiliser la commande

[source,lang]
----
ng g component component/panier

----

====
image::assets/img/panier.png[width=500, title="Création des 4 fichiers dû à la commande", alt=""]
====


== VI) Création du composant *"politique"* :

Nous avons utiliser la commande

[source,lang]
----
ng g component component/politique

----

====
image::assets/img/politique.png[width=500, title="Création des 4 fichiers dû à la commande", alt=""]
====

== VII) Les "service"


Pour créer le service d’interrogation de l'API, je vais utiliser la commande suivante:

[source,lang]
----
ng g service service/apiSushi
----



====
image::assets/img/service.png[width=500, title="Extrait de code de api-sush.service.ts", alt=""]
====




N'oublions pas de parler de *app.component.html*:


[source,lang]
----
<app-header> </app-header>
<router-outlet></router-outlet>
<app-footer></app-footer>
----
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
