import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerCardSushiBoxesComponent } from './component/container-card-sushi-boxes/container-card-sushi-boxes.component';
import { CardSushiBoxComponent } from './component/card-sushi-box/card-sushi-box.component';
import { PanierComponent } from './component/panier/panier.component';
import { PolitiqueComponent } from './component/politique/politique.component';

const routes: Routes = [
   {path:"",component: ContainerCardSushiBoxesComponent},
   {path: "panier", component: PanierComponent},
   {path: "politique", component: PolitiqueComponent}
 
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
