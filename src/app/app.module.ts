import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { CardSushiBoxComponent } from './component/card-sushi-box/card-sushi-box.component';
import { ContainerCardSushiBoxesComponent } from './component/container-card-sushi-boxes/container-card-sushi-boxes.component';
import { PanierComponent } from './component/panier/panier.component';
import { PolitiqueComponent } from './component/politique/politique.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardSushiBoxComponent,
    ContainerCardSushiBoxesComponent,
    PanierComponent,
    PolitiqueComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    PanierComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
