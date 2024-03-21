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